# Content Governance and Source Policy

This document defines the decisions and controls required before producing
Quranic Arabic lessons. Accuracy, attribution, interpretive boundaries, and the
authority to approve corrections are product prerequisites, not cleanup work.

> Status: blocking decisions are not yet approved. Prototype content must remain
> internal until the governance gate is complete.

## Governance gate

Content production may begin only after the project records and approves:

1. the canonical Quranic text source and edition;
2. the verse translation source or original-translation policy;
3. the word-by-word and vocabulary-gloss policy;
4. the transliteration and morphological-analysis standards;
5. the language, Quranic-text, morphology, and theological reviewers;
6. the interpretive scope and treatment of scholarly disagreement;
7. licences and attribution requirements for every source and asset;
8. the final approval, correction, and withdrawal process.

Each decision must name an owner, decision date, source/version, rationale, and
reconsideration trigger. Until then, sample text and translations are fixtures
for interaction testing only and must be labelled accordingly.

## Source hierarchy

The content model distinguishes four things that must not be silently merged:

- **Quranic text:** exact Arabic text from the approved source edition.
- **Verse translation:** an attributed rendering of the verse from a licensed
  source, or an explicitly governed original translation.
- **Contextual gloss:** a short explanation of what a word contributes in that
  particular occurrence.
- **Vocabulary senses:** reviewed meanings associated with the lemma across
  contexts, not a claim that every sense applies to every occurrence.

A published translation's wording does not automatically become the permanent
dictionary definition of a word. The UI must identify translations by source and
keep pedagogical glosses visibly distinct from full verse translations.

## Translation decision

Choosing a translation is a product and interpretive decision with licensing
consequences. Before selection, evaluate candidate translations for:

- permission to redistribute text offline in a mobile application;
- attribution, modification, and excerpt requirements;
- consistency with the project's intended audience and reviewer methodology;
- readability for children and adult beginners;
- treatment of key theological and polysemous terms;
- availability of stable edition and verse identifiers.

If the project writes original glosses, they require the same review and version
controls as other instructional content. A simplified gloss must never be
presented as a complete translation or tafsir.

## Reviewer roles

| Role | Responsibility | Required for |
| --- | --- | --- |
| Quranic text verifier | Confirms exact text, vocalization, surah, and verse reference | Every excerpt |
| Arabic language reviewer | Reviews lemma, contextual gloss, grammar, and transliteration | Every item |
| Morphology reviewer | Reviews roots, patterns, participles, and form explanations | Sarf content |
| Theological reviewer | Reviews divine attributes, faith concepts, and interpretive notes | Sensitive content |
| Audio reviewer | Confirms pronunciation standard and recording quality | Every published recording |
| Rights reviewer | Confirms licences, attribution, and distribution permissions | Every external source and asset |

One person may fill more than one role only when qualified and recorded. Approval
history identifies the reviewer and reviewed content version without exposing
private contact details to learners.

## Review tiers

### Tier 1 — Lexical

Relatively concrete vocabulary. Requires exact Quranic text verification,
language review, audio review, and rights review.

### Tier 2 — Context-sensitive

Polysemous words, particles, prepositions, and grammar-dependent meanings.
Requires Tier 1 checks plus explicit contextual review of each example and UI
explanation.

### Tier 3 — Theologically sensitive

Divine names and attributes, central faith concepts, eschatological terms, and
material where a short gloss may imply a disputed interpretation. Requires Tier
2 checks plus theological approval under the recorded methodology.

Review tier affects workflow depth, never textual accuracy. It is not a score of
religious importance.

## Interpretive boundaries

- Teach vocabulary, morphology, and carefully scoped context; do not represent
  the app as an independent tafsir authority.
- State when a gloss is deliberately partial.
- Present meaningful scholarly variation only through an approved policy rather
  than improvised “both sides” notes.
- Avoid presenting one English word as an exhaustive equivalent of a Quranic
  term.
- Do not derive an unfamiliar word's meaning mechanically from its root or form.
- Do not depict Allah or abstract theological concepts through literal imagery.
- Link every excerpt and explanation to its approved sources and content version.

## Content record requirements

Each publishable item records:

- stable item ID and content version;
- approved Quranic source edition and verse reference;
- exact excerpt plus integrity checksum where practical;
- lemma, vocalized form, root, pattern, and part of speech when applicable;
- contextual gloss and broader vocabulary senses;
- verse-translation source, edition, licence, and attribution;
- transliteration-standard version;
- review tier, workflow state, and approval records;
- audio and visual asset sources, licences, and versions;
- correction history and superseded versions.

## Workflow

```text
Draft
  ↓
Quranic text verification
  ↓
Language review
  ├── Morphology review when applicable
  └── Theological review when required
  ↓
Audio, visual, and rights review
  ↓
In-app rendering and accessibility QA
  ↓
Approved and versioned release
```

An item cannot skip a required stage. “Approved” applies to one exact content
version; editing reviewed text returns the affected fields to review.

## Corrections and disagreements

1. Record the report without silently overwriting published content.
2. Assess severity: cosmetic, pedagogical, textual, theological, or rights.
3. Immediately withdraw content when continued use could materially mislead or
   violate rights.
4. Route the correction through the relevant reviewers.
5. Publish a new content version while preserving stable learner-progress IDs.
6. Keep an internal audit trail and show learner-facing correction notes when
   the change affects meaning.

Reviewer disagreement pauses publication. The designated governance owner makes
no theological ruling independently; the recorded methodology defines who can
resolve or scope the disputed content.

## Pilot policy

- Five-word internal interaction fixtures may use temporary assets and must be
  visibly marked “not reviewed—not for teaching or distribution.”
- External learner pilots require verified Quranic text and the appropriate
  review tier, even when the content set is small.
- Temporary recordings may be used in a pilot when pronunciation is reviewed,
  participants are informed, and the files cannot be mistaken for release audio.
- Pilot success does not approve content for release; it validates interaction
  and pedagogy.

## Blocking decisions to record

- Quranic text source and edition
- Verse translation and licensing policy
- Original contextual-gloss policy
- Transliteration standard
- Morphology reference standard
- Reviewer body, qualifications, and interpretive methodology
- Source attribution design in the app
- Correction owner and urgent-withdrawal procedure

