# Arabic Vocabulary

A playful mobile tutorial for learning Arabic vocabulary through short lessons,
clear audio, visual prompts, and simple animated activities. The app is intended
to be welcoming to both children and adults, with interaction that supports
learning instead of distracting from it.

> Status: early product and architecture design. No application code has been
> generated yet.

## Product vision

Arabic Vocabulary helps beginners build a useful everyday vocabulary in small,
repeatable sessions. A learner sees an illustration, reads the Arabic word and
its transliteration, hears a native pronunciation, and practices recalling it
through touch-friendly activities.

The first version should feel:

- simple enough to use without instructions;
- playful without feeling exclusively childish;
- respectful of Arabic script and right-to-left layout;
- useful offline after the initial installation;
- encouraging, with no punishment for mistakes.

## Who it is for

- Children learning with a parent or independently
- Adult beginners learning Modern Standard Arabic
- Heritage learners strengthening reading and vocabulary

The initial content will use Modern Standard Arabic. Dialects can be added later
as explicitly labelled content packs so pronunciations and meanings are never
mixed silently.

## First release (MVP)

The MVP is deliberately small:

1. Choose a topic such as animals, food, family, colours, or the home.
2. Learn a short set of words using illustrated cards and pronunciation audio.
3. Practice with three activities:
   - tap the matching picture;
   - match a word to a picture;
   - listen and choose the word you heard.
4. See immediate animated feedback after each answer.
5. Review words that are due for practice.
6. Track progress locally on the device.

Accounts, social features, leaderboards, and a full content-management system
are intentionally outside the first release.

## Learning principles

- **Short sessions:** lessons should take roughly 3–5 minutes.
- **Active recall:** ask the learner to remember before showing the answer.
- **Spaced review:** bring back weaker words more often over time.
- **Multiple cues:** combine Arabic text, optional transliteration, imagery, and
  audio, then gradually remove hints.
- **Gentle feedback:** celebrate success and explain errors without using
  negative sounds, lost lives, or stressful timers.
- **Accessible motion:** animation should be brief, meaningful, and disabled or
  reduced when the device requests reduced motion.

## Proposed technology

| Area | Initial choice | Why |
| --- | --- | --- |
| Mobile framework | Expo + React Native | One TypeScript codebase for iOS and Android, with straightforward device testing |
| Navigation | Expo Router | File-based, typed navigation with deep-link support |
| Animation | React Native Reanimated | Smooth interaction and feedback animations on the UI thread |
| Local state | Zustand | Small, explicit state stores without heavy boilerplate |
| On-device data | SQLite via Expo | Durable progress, review history, and offline content metadata |
| Content validation | Zod | Validates vocabulary packs before they reach a lesson |
| Testing | Vitest/Jest + React Native Testing Library | Fast unit and component tests |
| End-to-end testing | Maestro | Readable mobile flows that can cover the critical learning journey |

These are proposed defaults. A short prototype should validate Arabic rendering,
audio latency, and animation performance before the choices are locked in.

## Architecture

The app will begin as a **local-first modular monolith**. That means one mobile
application, split into clear feature modules, with no backend required for the
MVP. This keeps development and offline use simple while preserving boundaries
that allow cloud sync or a content service to be introduced later.

```text
Screens and animated widgets
            │
            ▼
Feature modules (learn, practice, review, progress)
            │
            ▼
Learning engine and application services
            │
            ▼
Repository interfaces
       ┌────┴────┐
       ▼         ▼
 Local SQLite   Bundled content and audio
```

### Suggested project structure

```text
app/                       # Routes and screen composition
src/
  components/              # Shared presentation components
  features/
    learn/                  # Vocabulary card lesson
    practice/               # Matching and listening activities
    review/                 # Spaced-review session
    progress/               # Topic completion
  domain/
    vocabulary/             # Word and topic models
    learning/               # Scheduling, scoring, and session rules
  data/
    content/                # Content-pack loader and validation
    repositories/           # Local repository implementations
    database/               # SQLite schema and migrations
  services/                 # Audio, preferences, analytics abstractions
  stores/                   # Small UI/session state stores
  theme/                    # Colour, type, spacing, motion tokens
  i18n/                     # UI translations and RTL helpers
assets/
  content/                  # Versioned vocabulary JSON
  images/
  audio/
tests/
```

### Key boundaries

- Screens compose features but do not contain learning or persistence rules.
- The learning engine uses plain TypeScript and has no React Native dependency,
  making scheduling and scoring easy to test.
- Features read and write through repository interfaces rather than accessing
  SQLite directly.
- Vocabulary is stored in versioned content packs, separate from application
  code and learner progress.
- Audio playback, analytics, and future sync live behind interfaces so platform
  or service changes do not spread through the UI.

## Core data model

```ts
type VocabularyItem = {
  id: string;
  topicId: string;
  arabic: string;
  transliteration: string;
  translations: Record<string, string>;
  imageAsset: string;
  audioAsset: string;
  tags: string[];
};

type ReviewState = {
  vocabularyItemId: string;
  strength: number;
  nextReviewAt: string;
  lastReviewedAt?: string;
  attempts: number;
  correctAttempts: number;
};
```

Content identity should remain stable across releases. Learner history references
the vocabulary item ID, so text, audio, and images can be corrected without
losing progress.

## Interactive widget guidelines

Widgets should be small reusable learning interactions rather than miniature
games. Initial widgets include:

- `VocabularyCard`: tap to hear pronunciation; swipe or press to continue.
- `PictureChoice`: bounce or glow on a correct selection; gently reset on error.
- `MatchPairs`: connect or flip matching Arabic words and illustrations.
- `ListeningChoice`: replay audio and choose from large, readable answers.
- `ProgressPath`: show session progress without encouraging rushed answers.

Each widget should support right-to-left text, screen readers, large text, a
reduced-motion mode, and alternatives to colour-only feedback. Touch targets
should be at least 44×44 points.

## Content format and quality

Every content pack should be validated during development and include:

- a stable ID and topic;
- fully vocalized Arabic where appropriate for beginners;
- reviewed transliteration and translation;
- an image with usage rights recorded;
- pronunciation audio from a qualified native speaker;
- optional notes for gender, plural form, or usage context.

Arabic content should be reviewed by a language expert. Text-to-speech may be
useful during prototyping, but should not silently replace reviewed human audio
in published lessons.

## Privacy and child safety

The MVP stores learning progress on the device and collects no personal data by
default. If analytics are introduced, they should be minimal, documented, and
designed with child privacy requirements in mind. External links, purchases,
account creation, and data sharing require an adult-facing gate when the product
is presented to children.

## Delivery phases

### Phase 1 — Interaction prototype

- Confirm Arabic fonts, diacritics, RTL layout, and device accessibility.
- Build one five-word lesson with one animated practice widget.
- Test pronunciation playback and reduced-motion behaviour.

### Phase 2 — MVP

- Add topic selection, the three practice activities, local progress, and review
  scheduling.
- Ship a small reviewed content set with complete images and audio.
- Add unit, component, and critical end-to-end tests.

### Phase 3 — Product validation

- Observe child and adult learners completing sessions.
- Measure lesson completion, repeated errors, and voluntary review—without
  collecting unnecessary personal information.
- Refine difficulty, hint timing, and content based on evidence.

### Later, if validated

- Parent/teacher profiles and progress summaries
- Downloadable topic or dialect packs
- Optional cross-device sync
- A content authoring and review workflow
- Speech practice, only after pronunciation evaluation is proven reliable

## Early decisions to make

Before implementation, the product needs answers to these questions:

1. What age range is the primary design target?
2. Is the teaching language English only for the first release?
3. Should transliteration be always visible, optional, or gradually removed?
4. Which 30–50 words and topics form the first reviewed curriculum?
5. Will launch content use commissioned illustrations and recorded audio?
6. Is the first launch intended for both iOS and Android?

## Definition of done for the first prototype

- A learner can complete a five-word lesson on an iOS and Android device.
- Arabic displays correctly at all supported text sizes and directions.
- Every word has an image and replayable pronunciation.
- At least one practice widget provides accessible animated feedback.
- Progress survives an app restart.
- The lesson works without a network connection.
- Core learning rules have automated tests.

## Contributing

The project is currently in discovery. Until coding conventions are added, keep
changes small, document product assumptions, and include tests for learning or
progress rules. Do not add unreviewed vocabulary to release content.

## License

To be decided before public distribution. Asset and audio licences must be
tracked separately from the application source licence.
