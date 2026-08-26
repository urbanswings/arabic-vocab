# Local Data and Learning-State Architecture

This document defines how offline content, learner evidence, review state, and
preferences persist in the MVP. The app is local-first: it requires no account
or backend, and progress does not silently imply cloud backup.

> Status: proposed engineering design. Field names and migrations will be
> finalized during the interaction prototype.

## Data guarantees

| Event | Expected result |
| --- | --- |
| Close or restart the app | Progress and preferences remain |
| Install an application update | Progress remains after schema migration |
| Clear application data | Progress is deleted |
| Remove and reinstall the app | Progress is generally deleted |
| Change devices | Progress does not transfer in the MVP |

The UI states these limits during onboarding and in Settings. A future account,
sync service, or backup feature must not change the local repository contract
used by learning features.

## Storage responsibilities

```text
Bundled, versioned content packs
             │
             ▼
      Content repository
             │
             ├──────────► Lesson and activity queries
             │
Learner actions
      │
      ▼
Attempt event log ──► Review projector ──► Current review state
      │                                          │
      └────────────────┬─────────────────────────┘
                       ▼
                 Local SQLite
```

- Bundled JSON or database assets contain approved, immutable content versions.
- SQLite stores learner-owned state, active-session checkpoints, and installed
  content metadata.
- Repository interfaces prevent screens and widgets from accessing SQLite
  directly.
- The plain TypeScript learning engine evaluates answers and calculates review
  transitions without depending on React Native.

## Reference ingestion boundary

Files in [Vocabulary Reference Sources](../references/README.md) are development
inputs, not mobile runtime assets. They feed a separate, reproducible candidate
pipeline:

```text
Raw source adapter → source-shaped record → normalized candidate
                  → discrepancy report → reviewed content draft
```

- Raw files are immutable inputs identified by hash.
- Each source has its own adapter; no shared parser assumes equivalent schemas.
- Original forms, counts, ranks, coordinates, and part-of-speech labels are
  preserved alongside normalized proposals.
- Normalization records its algorithm version and never overwrites source data.
- Cross-source disagreements become explicit conflicts for review.
- Only approved content-pack output can be bundled into the mobile app.

Large PDFs and workbooks must not increase the production app download size.
Generated candidate tables and discrepancy reports belong to development tooling
and are reproducible rather than hand-edited sources of truth.

The current Root Explorer prototype is generated from
`references/Cleaned_Root_letters.xlsx` by
`scripts/build_root_families.py`. It normalizes root-label whitespace and
deduplicates exact Arabic forms within each root while preserving source order
and transliteration. This narrow transformation is reproducible, but it does not
approve the workbook's root methodology or turn surface forms into reviewed
lemmas.

## Main records

### Content metadata

```ts
type ContentPack = {
  id: string;
  version: number;
  schemaVersion: number;
  sourcePolicyVersion: string;
  publishedAt: string;
  checksum: string;
};
```

Vocabulary, verse occurrences, translations, audio, review approvals, and rights
metadata follow the requirements in
[Content Governance and Source Policy](CONTENT_GOVERNANCE.md). Content records
retain stable IDs across corrected versions.

### Attempt evidence

```ts
type AttemptEvent = {
  id: string;
  learnerProfileId: "local-default";
  vocabularyItemId: string;
  contentVersion: number;
  lessonSessionId: string;
  occurredAt: string;
  activityType: string;
  promptType: "arabic" | "audio" | "meaning" | "image" | "context";
  result: "correct" | "incorrect" | "retry";
  hintsUsed: string[];
  transliterationVisible: boolean;
  transliterationRequested: boolean;
  responseDurationMs?: number;
};
```

Attempt events provide an auditable explanation for current learning state.
Decorative taps, audio replays, and navigation actions are not wrong answers.
Response duration may assist usability analysis but does not determine ability in
the initial scheduler.

### Review state

```ts
type ReviewState = {
  vocabularyItemId: string;
  status: "new" | "learning" | "developing" | "familiar" | "due";
  strength: number;
  nextReviewAt: string;
  lastReviewedAt?: string;
  unhintedRecognitionCount: number;
  unhintedRecallCount: number;
  adaptiveTransliterationHidden: boolean;
  attempts: number;
  correctAttempts: number;
  algorithmVersion: number;
};
```

Review state is a projection of attempt evidence. Keeping the algorithm version
allows future scheduler changes without pretending old and new calculations are
identical.

### Session checkpoint

```ts
type LessonCheckpoint = {
  sessionId: string;
  lessonId: string;
  contentPackVersion: number;
  stage: "discover" | "recognize" | "recall" | "review" | "summary";
  completedStepIds: string[];
  pendingItemIds: string[];
  savedAt: string;
};
```

Checkpoints are written at stable lesson boundaries, not during an animation.
When content changes incompatibly, the app keeps completed attempt evidence and
restarts only the affected in-progress lesson safely.

### Preferences

```ts
type LearnerPreferences = {
  presentationMode: "playful" | "standard";
  transliteration: "visible" | "hidden" | "adaptive";
  reducedMotion: boolean;
  soundEffectsEnabled: boolean;
  pronunciationAudioEnabled: boolean;
};
```

Pronunciation audio and decorative sound use separate controls. Device-level
reduced-motion preferences provide the default, which the app does not override
silently.

## Adaptive transliteration state

The pilot uses a configurable deterministic rule:

```text
Discovery: visible
      ↓
2 correct unhinted recognition prompts
      ↓
Hide for recall
   ┌──┴───────────────┐
Correct            Incorrect or requested
   │                    │
Keep hidden        Restore next exposure
```

The projector uses prompt type, hint evidence, and transliteration visibility.
A global Visible or Hidden preference overrides the adaptive display decision
without deleting accumulated learning evidence.

## Transactions and consistency

For each assessed response, one local transaction should:

1. append the attempt event;
2. update the projected review state;
3. advance the session checkpoint.

If the transaction fails, the UI does not claim the answer was saved. Retrying
uses the same event ID to prevent duplicate evidence. Content is read-only during
a lesson and identified by the exact pack version used to generate the prompt.

## Schema and content migrations

- Every database schema change has a forward migration and an automated test.
- Application startup backs up or transactionally migrates local state before
  opening a lesson.
- Content-pack updates verify schema version and checksum before activation.
- Corrected content preserves stable vocabulary IDs whenever the learning
  concept remains the same.
- A meaningfully different lemma or concept receives a new ID rather than
  inheriting unrelated progress.
- Removed or withdrawn content keeps historical attempt records but is excluded
  from future lessons and review queues.

## Privacy and deletion

The MVP stores no account identity. Learning evidence remains on the device and
is not transmitted by default. Settings provides:

- a clear explanation of local-only storage;
- a destructive “Delete all learning progress” action with confirmation;
- deletion of attempts, review state, checkpoints, and preferences as specified;
- no claim that uninstall recovery or cross-device restoration is available.

Analytics, if later introduced, requires a separate privacy design and must not
upload Quran-learning history merely because the local schema contains it.

## Backup and synchronization evolution

The preferred progression is:

1. local-only MVP;
2. optional encrypted export/import, if validated;
3. optional account-based synchronization behind repository interfaces.

Synchronization will require conflict rules for attempts, preferences, content
versions, and withdrawn content. It is not implemented by copying the current
SQLite file between devices.

## Verification requirements

- Progress and preferences survive normal restart and application update tests.
- An interrupted answer transaction cannot create duplicate evidence.
- Adaptive transliteration produces the documented state transitions.
- Content corrections preserve valid progress and exclude withdrawn content.
- Lesson resume begins at a stable boundary.
- Clearing progress removes all learner-owned records.
- The local-only disclosure matches actual platform behavior.
