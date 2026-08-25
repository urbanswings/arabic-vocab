# Tutorial Content and Experience Design

This document defines the initial teaching experience for Arabic Vocabulary. It
describes what learners study, how a lesson behaves, how activities progress,
and how the playful and standard presentation modes share the same educational
foundation.

> Status: product-design proposal. All published Quranic text, Arabic,
> transliteration, translations, explanations, illustrations, and pronunciation
> audio require qualified language and theological review.

## Experience goals

The tutorial should help a new learner recognize, understand, hear, and recall
high-frequency Quranic Arabic vocabulary. It should build a practical bridge to
reading verses while making clear that a short gloss cannot capture every
meaning of a word in every context. It should not attempt to teach the whole
language, grammar, or tafsir at once.

A successful first session lets the learner:

- understand how to navigate without reading lengthy instructions;
- learn up to five high-frequency words in three to five minutes;
- hear every word as often as needed;
- answer using text, phrase context, pictures where appropriate, and listening
  cues;
- make mistakes without losing progress or feeling punished;
- leave knowing what to learn or review next.

## Audience and presentation

The learning sequence is shared by children and adults. Presentation mode is a
preference rather than an age or ability label.

| Element | Playful mode | Standard mode |
| --- | --- | --- |
| Visual style | Friendly illustrations, brighter accents, rounded surfaces | Calm palette, spacious layout, restrained decoration |
| Motion | Expressive but brief reactions | Subtle fades, scales, and transitions |
| Feedback | Optional character reaction and friendly sound | Concise visual and haptic confirmation |
| Controls | Larger controls and more visual labels | Compact controls that still meet accessibility targets |
| Learning content | Shared | Shared |
| Difficulty and scoring | Shared | Shared |

The learner can change presentation mode at any time without resetting progress.
Reduced-motion, sound, and transliteration controls remain independent settings.

## Curriculum principles

Content is organized from frequent, recognizable Quranic vocabulary toward
words and structures that require more context. Concrete nouns can use images;
theological concepts, particles, and morphology require phrases and guided
explanations rather than forced visual metaphors.

- Introduce no more than five new words in a short lesson.
- Reuse known words in later topics rather than teaching every item once.
- Avoid visually or phonetically confusing items in the same first exposure.
- Introduce grammatical information only when it helps vocabulary use.
- Teach the vocalized Arabic form first and treat transliteration as a removable
  support, not the target skill.
- Teach particles through short phrases because a single English gloss rarely
  explains their full function.
- Teach roots as relationships between attested words, not as a mechanical way
  to guess meanings.
- Cite the surah and verse for every excerpt and preserve the exact Quranic text.
- Prefer Quranic frequency and usefulness for comprehension over exhaustive
  categories.

## Curriculum tracks

The curriculum has two connected tracks. **Quranic Vocabulary** is the primary
beginner path. **Sarf Explorer** becomes available after the learner has enough
known words to recognize useful word-family relationships.

```text
Vocabulary recognition
        ↓
Words inside Quranic phrases
        ↓
Root and pattern discovery
        ↓
Guided verse analysis
```

### Track 1 — High-frequency Quranic vocabulary

The first content pack should contain roughly 40–50 reviewed words. The examples
below define scope only; they are not publication-ready translations or
theological explanations.

| Order | Unit | Learning purpose | Example scope |
| --- | --- | --- | --- |
| 1 | Foundational concepts | Recognize central terms without reducing them to one universal gloss | `رَبّ` (rabb), `دِين` (dīn), `إِيمَان` (īmān), `تَقْوَى` (taqwā) |
| 2 | Creation and the world | Build recognition with concrete and recurring nouns | `أَرْض` (arḍ), `سَمَاء` (samāʾ), water, sun, night |
| 3 | People and the inner self | Connect recurring human concepts | `قَلْب` (qalb), soul/self, people, believer |
| 4 | Revelation and knowledge | Recognize terms surrounding scripture and knowledge | `كِتَاب` (kitāb), verse/sign, knowledge, messenger |
| 5 | High-frequency actions | Recognize common verbal ideas before formal morphology | say, know, believe, do, create |
| 6 | Prepositions and connections | Read structural relationships inside short phrases | `مِنْ` (min), in, to, upon, with |
| 7 | Core particles | Notice emphasis, condition, time, and negation in context | `إِنَّ` (inna), `إِذَا` (idhā), `لَا` (lā) |
| 8 | Names and attributes in context | Recognize selected recurring attributes with careful theological review | `العَلِيم` (al-ʿAlīm) and other approved examples |

Important distinctions must be preserved in the lessons:

- `دِين` can carry senses including religion, judgment, recompense, or way of
  life depending on context.
- `السَّمَاء` is singular, while `السَّمَاوَات` is plural.
- `عَالِم` describes one who knows or is learned; `العَلِيم` is taught carefully
  when it occurs as a divine name.
- `لَا`, `مِنْ`, `إِنَّ`, and `إِذَا` cannot be mastered through one-to-one
  English substitutions. Their lesson examples must demonstrate their function.

Units can contain multiple lessons of up to five new words. A learner does not
need to finish an entire unit before reviewing due words from another unit.

### Track 2 — Roots and patterns (sarf)

This companion track introduces morphology after learners recognize a useful
base vocabulary. It uses standard terms consistently:

- **Mujarrad** (`مُجَرَّد`): the basic, unaugmented root pattern;
- **Mazīd** (`مَزِيد`): forms with additional letters;
- **Ism al-fāʿil** (`اِسْمُ الفَاعِل`): the active participle;
- **Ism al-mafʿūl** (`اِسْمُ المَفْعُول`): the passive participle.

The progression is:

1. Identify a three-letter root inside already known words.
2. Explore an attested word family, such as `ك-ت-ب`, in Quranic context.
3. Distinguish root letters from added letters visually.
4. Recognize active and passive participles in selected examples.
5. Compare a small number of derived verb forms.
6. Apply the skill in a guided verse analysis.

Patterns express tendencies, not guaranteed definitions. For example, Form X
(`اِسْتَفْعَلَ`) often conveys seeking or requesting, but the app must never tell
learners to derive an unfamiliar word's meaning mechanically. Attested usage,
syntax, and verse context govern the explanation.

## Content unit

Each vocabulary item needs enough information to support teaching, review, and
future correction:

- stable ID and topic membership;
- Arabic lemma and beginner-friendly vocalized form;
- translation and reviewed transliteration;
- native-speaker pronunciation audio;
- a verse occurrence with surah and verse reference;
- a reviewed contextual gloss and an optional short usage note;
- a clear illustration with recorded usage rights when the meaning is concrete;
- part of speech and relevant grammatical gender;
- root and morphological pattern when reviewed and pedagogically useful;
- plural, grammatical, or theological note when useful;
- content version and review status.

Abstract or theological concepts must not be represented by misleading literal
images. Where an image is inappropriate, typography, phrase context, and neutral
visual structure take its place. Recordings should have consistent volume,
pacing, pronunciation standard, and background noise.

## Tutorial structure

The tutorial uses a repeating four-stage learning loop:

```text
Discover → Recognize → Recall → Review
    ▲                            │
    └────────────────────────────┘
```

### 1. Discover

Introduce one word at a time with Arabic, pronunciation, a contextual gloss, and
an image when appropriate. The learner may replay audio and open the cited verse.
Meaning and optional transliteration are visible, so this stage is exposure
rather than assessment.

### 2. Recognize

Ask the learner to identify a recently introduced word while strong cues remain.
Examples include selecting a meaning after seeing Arabic, selecting Arabic from
a concrete image, or identifying a highlighted word inside a short phrase.

### 3. Recall

Remove one cue and ask the learner to retrieve the answer. Examples include
listening without text or recognizing Arabic without transliteration.

### 4. Review

Bring words back after time has passed. The review scheduler varies the prompt
and prioritizes words with weaker evidence of recall.

## First-session flow

```text
Welcome
   ↓
Choose presentation mode
   ↓
Choose transliteration preference
   ↓
Preview audio and motion controls
   ↓
Start recommended unit
   ↓
Learn five words
   ↓
Complete mixed practice
   ↓
See session summary
   ↓
Return home with a clear next action
```

Onboarding should take less than one minute. It should not require an account,
age, name, notifications, or analytics consent to begin learning. Preferences
can be changed later from settings. Before the first lesson, the app states:

> Your learning progress is stored only on this device. It will not transfer if
> the app is removed, its data is cleared, or you change devices.

The same notice remains available in Settings near progress-management actions.

## Returning-session flow

The home screen offers one primary recommendation and a small set of secondary
choices:

1. **Continue learning** when the current unit has unfinished lessons.
2. **Review due words** when useful review material is available.
3. **Explore curriculum** to choose another unit or unlocked track.
4. **View progress** to see learned and developing words.

The app should not manufacture urgency through lost streaks, countdowns, lives,
or expiring rewards.

## Lesson flow

A standard five-word lesson follows this sequence:

1. Show the lesson goal and approximate length.
2. Introduce words one by one through `VocabularyCard`.
3. Run two or three recognition questions after the first few words.
4. Introduce the remaining words.
5. Run a mixed practice round containing phrase, text, audio, and appropriate
   image prompts.
6. Revisit missed words with an easier cue before retrying recall.
7. End with a concise summary and the next recommended action.

The learner can pause or exit without losing completed answers. Returning should
resume at a sensible boundary rather than in the middle of an animation.

## Activity catalogue

### Vocabulary card

- Purpose: first exposure and audio–meaning association.
- Input: tap audio, reveal a note, continue.
- Assessment: none.
- Motion: short entrance and press feedback; no mandatory 3D flip.

### Picture choice

- Purpose: recognize a word through a concrete visual meaning.
- Prompt forms: Arabic text or audio.
- Input: select one large image.
- Feedback: identify the result through text, icon, colour, and optional motion.

### Word choice

- Purpose: recognize Arabic script from an image, translation, or audio cue.
- Input: select one Arabic option.
- Constraint: distractors must be fair and already introduced when possible.

### Match pairs

- Purpose: reinforce several associations in one round.
- Input: tap one item and then its match; dragging is an optional enhancement.
- Constraint: keep the initial board small and avoid relying on spatial memory
  as the only evidence of vocabulary knowledge.

### Listening choice

- Purpose: connect spoken Arabic to meaning or written Arabic.
- Input: replay audio and select an answer.
- Constraint: no replay penalty and no requirement to use headphones.

### Quick review

- Purpose: retrieve previously learned words with minimal setup.
- Input: a short mixed queue using the activities above.
- Constraint: prioritize useful evidence of recall over a long quiz score.

### Word spotlight

- Purpose: recognize a learned word in an authentic Quranic excerpt.
- Input: locate or identify the highlighted word, then inspect its contextual
  gloss.
- Constraint: cite the surah and verse and never alter the excerpt for the game.

### Phrase builder

- Purpose: notice relationships among known words in a short phrase.
- Input: arrange provided word tiles or match them to a word-by-word gloss.
- Constraint: do not present the activity as a substitute for Arabic syntax.

### Particle contrast

- Purpose: observe what a particle contributes in two carefully selected
  contexts.
- Input: compare highlighted phrases and choose the appropriate explanation.
- Constraint: avoid claiming a particle always has one English equivalent.

### Root explorer

- Purpose: see related, attested words branching from a shared root.
- Input: select a word to reveal its pattern, meaning, and verse occurrence.
- Constraint: distinguish a helpful relationship from a guaranteed definition.

### Pattern highlighter

- Purpose: distinguish root letters from added letters.
- Input: inspect or select colour-coded letters in an attested word.
- Constraint: colour must be paired with labels or shapes for accessibility.

### Word-family match

- Purpose: connect known words that share a reviewed root.
- Input: match forms to meanings or grammatical roles.
- Constraint: never imply that related forms have identical meanings.

### Context choice

- Purpose: select the appropriate gloss for a word in a particular verse.
- Input: compare reviewed meanings and choose using the displayed context.
- Constraint: explanations require language and theological review.

Arabic letter tracing is outside the vocabulary MVP. It requires a separate,
expert-reviewed handwriting design for connected letter shapes and stroke paths.

## Answer and feedback behavior

Correct answers should receive immediate confirmation and then move forward
without unnecessary delay. Incorrect answers should preserve dignity and reveal
just enough information to help.

```text
Answer selected
      ↓
Evaluate learning outcome
   ┌──┴─────────────┐
Correct          Incorrect
   │                 │
Confirm          Show correct association
   │                 │
Continue         Retry later with stronger cue
   └────────┬────────┘
            ↓
       Save evidence
```

Rules:

- Never use ridicule, harsh sounds, red-only feedback, or lost lives.
- Do not count pronunciation replay or hint use as a wrong answer.
- Avoid immediately repeating an identical failed prompt from memory alone.
- Record the prompt type and help used so review strength is evidence-based.
- Allow feedback to finish early when the learner taps Continue.

## Hint and transliteration strategy

Transliteration has three modes:

- **Visible:** shown during discovery and eligible practice prompts.
- **Hidden:** omitted unless the learner explicitly requests a hint.
- **Adaptive:** follows the deterministic progression below.

For the pilot, adaptive transliteration behaves as follows:

1. Show it during discovery.
2. Keep it visible during initial recognition.
3. After two correct, unhinted recognition answers on separate prompts, hide it
   by default for that vocabulary item.
4. Present a recall prompt without transliteration.
5. Keep it hidden after a correct, unhinted recall.
6. Restore it for the next exposure after an incorrect answer or explicit
   transliteration request.
7. Always respect a learner's global Visible or Hidden override.

The thresholds are configuration, not hard-coded UI behavior. Every attempt
records whether transliteration was visible or requested so the scheduler does
not treat supported recognition as equivalent to unsupported recall.

Hints should follow a gentle ladder:

1. replay pronunciation;
2. restore transliteration if enabled;
3. reduce the number of choices;
4. reveal the correct association;
5. retry later in the lesson with a stronger cue.

## Progress and review

Progress should communicate learning status rather than a single competitive
score. Each word can appear as:

- **New:** not yet introduced;
- **Learning:** introduced but recall is not yet reliable;
- **Developing:** recalled successfully with recent evidence;
- **Familiar:** recalled across multiple spaced reviews;
- **Due:** ready for another useful review.

The scheduler should consider answer correctness, prompt type, hint use, and time
since the previous review. The first prototype can use simple deterministic
intervals; a more sophisticated scheduling algorithm should be introduced only
after the event data and behavior are well tested.

## Navigation and screen responsibilities

| Screen | Primary job | Primary action |
| --- | --- | --- |
| Welcome | Explain the value in one sentence | Begin |
| Preferences | Select presentation, transliteration, sound, and motion | Save and continue |
| Home | Recommend the next useful session | Continue or review |
| Curriculum | Browse available units and learning tracks | Open a unit |
| Unit detail | Show lesson sequence and progress | Start or resume lesson |
| Lesson | Host discovery and practice activities | Answer or continue |
| Session summary | Reflect what changed and what is next | Finish or review misses |
| Progress | Inspect words by learning status | Start targeted review |
| Settings | Change preferences and manage local data | Save |

Navigation must preserve state if the app is interrupted. Learners should always
have an obvious way to pause, exit, replay audio, and recover from an error.

## Visual and interaction design

- Arabic is the visual focus; translations and transliteration are supporting
  information.
- Arabic and Latin text can have different direction within the same screen;
  direction is applied at the component level rather than mirroring everything.
- Quranic excerpts display in a typeface and layout verified for textual
  accuracy; educational highlighting must not obscure letters or diacritics.
- Diacritics must remain clear at supported sizes and must not be clipped.
- Every touch target is at least 44×44 points and has a screen-reader label.
- Colour is never the only way to show state or correctness.
- Motion is brief, interruptible, and replaceable with an instant transition.
- Decorative audio never competes with pronunciation playback.
- Feedback layouts avoid shifting answer controls while the learner is tapping.

## Content production workflow

### Content governance gate

Content production cannot begin until the policies in
[Content Governance and Source Policy](CONTENT_GOVERNANCE.md) are approved. The
gate establishes the Quranic text source, translation and gloss policy,
transliteration standard, reviewer authority, theological scope, licensing, and
correction process.

Review depth is risk-based:

- **Lexical:** relatively concrete vocabulary still receives Quranic text and
  language verification.
- **Context-sensitive:** polysemous words, particles, and grammatical structures
  require contextual language review.
- **Theologically sensitive:** divine attributes and central faith concepts
  require explicit theological approval in addition to language review.

No sensitive explanation is published on the assumption that reviewer or source
decisions can be resolved later.

Every release item passes through these states:

```text
Draft → Quranic text verification → Language and theology review
      → Asset review → In-app QA → Approved
```

The checks include:

- Arabic spelling, diacritics, meaning, and register;
- exact Quranic text plus correct surah and verse reference;
- contextual gloss and theological framing;
- transliteration consistency;
- native-speaker audio pronunciation and quality;
- image clarity, cultural appropriateness, and licence record;
- correct topic and distractor pairing;
- rendering on small and large devices;
- accessibility labels and reading order.

Corrections update the content version while preserving the stable item ID so
learner progress is not discarded.

## Validation stages

Interaction and content-authority risks are validated separately.

### Internal interaction prototype

- Use five internal-only sample words.
- Validate Arabic rendering, audio latency, reduced motion, navigation, and
  lesson resume behavior.
- Temporary audio and placeholder visuals are acceptable when clearly marked and
  never distributed as approved learning content.

### Learner pilot

- Use 15–20 reviewed words in one coherent unit.
- Validate Discover → Recognize → Recall → Review with representative learners.
- Test the deterministic adaptive-transliteration behavior.
- Require verified Quranic text and suitable review for anything shown to
  external participants.
- Treat interaction findings as permission to refine the lesson before scaling
  content production.

### MVP release

The tutorial MVP is ready for release when:

- at least 40 high-frequency words across 6–8 units have completed Quranic text,
  language, theological, and asset review;
- every word has working offline audio, a verified verse occurrence, and an
  approved visual treatment;
- one complete unit supports discovery, word choice, word spotlight, listening,
  context practice, and scheduled review;
- playful and standard presentation modes complete the same lesson successfully;
- transliteration can be visible, hidden, or adaptive;
- reduced-motion and screen-reader flows preserve all learning information;
- learners can pause, resume, make mistakes, and finish without assistance;
- review state and preferences survive an app restart.

The local-only progress notice must be visible during onboarding and in Settings.
The behavior for restart, update, data clearing, reinstall, and device changes
must match [Local Data and Learning-State Architecture](DATA_ARCHITECTURE.md).

## Open product decisions

1. Which learner group should be recruited first for usability testing?
2. Is English the only interface and translation language at launch?
3. What visual style can support both presentation modes without depicting
   abstract theological concepts literally?
4. Will audio be commissioned before prototyping or recorded temporarily for
   internal validation?
5. Which simple spaced-review intervals should the prototype use?

## Explicitly deferred

- Accounts, cross-device sync, and cloud profiles
- Leaderboards, public sharing, lives, and competitive streaks
- Remote content management and downloadable packs
- Speech recognition or pronunciation scoring
- Arabic handwriting and letter tracing
- Advanced syntax, full grammatical parsing, and independent tafsir instruction
- Dialect lessons mixed into Quranic Arabic content
- Parent or teacher dashboards
