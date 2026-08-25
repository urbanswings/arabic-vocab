# Tutorial Content and Experience Design

This document defines the initial teaching experience for Arabic Vocabulary. It
describes what learners study, how a lesson behaves, how activities progress,
and how the playful and standard presentation modes share the same educational
foundation.

> Status: product-design proposal. All published Arabic, transliteration,
> translations, illustrations, and pronunciation audio require expert review.

## Experience goals

The tutorial should help a new learner recognize, understand, hear, and recall
useful Modern Standard Arabic words. It should not attempt to teach the whole
language at once.

A successful first session lets the learner:

- understand how to navigate without reading lengthy instructions;
- learn five concrete words in three to five minutes;
- hear every word as often as needed;
- answer using pictures, text, and listening cues;
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

Content is organized from concrete, visible concepts toward words that require
more context. Early topics favor objects and actions that are easy to illustrate
and distinguish.

- Introduce no more than five new words in a short lesson.
- Reuse known words in later topics rather than teaching every item once.
- Avoid visually or phonetically confusing items in the same first exposure.
- Introduce grammatical information only when it helps vocabulary use.
- Teach the vocalized Arabic form first and treat transliteration as a removable
  support, not the target skill.
- Label Modern Standard Arabic and any future dialect content explicitly.
- Prefer useful frequency and everyday relevance over exhaustive categories.

## Initial topic map

The first content pack should contain roughly 40–50 reviewed words. The lists
below describe scope, not final translations or publication-ready language data.

| Order | Topic | Learning purpose | Suggested scope |
| --- | --- | --- | --- |
| 1 | Greetings | Produce an immediate useful interaction | hello, welcome, goodbye, yes, no |
| 2 | Colours | Practice visual recognition with clear choices | red, blue, green, yellow, black, white |
| 3 | Animals | Connect memorable illustrations to concrete nouns | cat, dog, bird, fish, horse, rabbit |
| 4 | Food and drink | Build useful daily vocabulary | water, bread, milk, apple, banana, rice |
| 5 | Family | Introduce familiar people and gender naturally | mother, father, brother, sister, family |
| 6 | Home | Recognize common surroundings | house, door, window, chair, table, bed |
| 7 | Numbers 1–10 | Add listening and sequence practice | one through ten |
| 8 | Everyday actions | Move from objects to simple verbs | eat, drink, go, come, read, write |

Topics can contain multiple five-word lessons. A learner does not need to finish
an entire topic before reviewing due words from another topic.

## Content unit

Each vocabulary item needs enough information to support teaching, review, and
future correction:

- stable ID and topic membership;
- Arabic lemma and beginner-friendly vocalized form;
- translation and reviewed transliteration;
- native-speaker pronunciation audio;
- clear illustration or photograph with recorded usage rights;
- part of speech and relevant grammatical gender;
- plural or contextual note when useful;
- Modern Standard Arabic or explicit dialect label;
- content version and review status.

Images should communicate the intended meaning without relying on stereotypes,
embedded text, or culturally ambiguous gestures. Recordings should have
consistent volume, pacing, pronunciation standard, and background noise.

## Tutorial structure

The tutorial uses a repeating four-stage learning loop:

```text
Discover → Recognize → Recall → Review
    ▲                            │
    └────────────────────────────┘
```

### 1. Discover

Introduce one word at a time with Arabic, an image, and pronunciation. The
learner may replay audio. The meaning and optional transliteration are visible,
so this stage is exposure rather than assessment.

### 2. Recognize

Ask the learner to identify a recently introduced word while strong cues remain.
Examples include selecting the correct image after seeing Arabic or selecting
Arabic after seeing an image.

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
Start recommended topic
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
can be changed later from settings.

## Returning-session flow

The home screen offers one primary recommendation and a small set of secondary
choices:

1. **Continue learning** when the current topic has unfinished lessons.
2. **Review due words** when useful review material is available.
3. **Explore topics** to choose another subject.
4. **View progress** to see learned and developing words.

The app should not manufacture urgency through lost streaks, countdowns, lives,
or expiring rewards.

## Lesson flow

A standard five-word lesson follows this sequence:

1. Show the lesson goal and approximate length.
2. Introduce words one by one through `VocabularyCard`.
3. Run two or three recognition questions after the first few words.
4. Introduce the remaining words.
5. Run a mixed practice round containing image, text, and audio prompts.
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
- **Adaptive:** visible during discovery, then gradually removed as recognition
  improves.

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
| Topics | Browse available and upcoming content | Open a topic |
| Topic detail | Show lesson sequence and progress | Start or resume lesson |
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
- Diacritics must remain clear at supported sizes and must not be clipped.
- Every touch target is at least 44×44 points and has a screen-reader label.
- Colour is never the only way to show state or correctness.
- Motion is brief, interruptible, and replaceable with an instant transition.
- Decorative audio never competes with pronunciation playback.
- Feedback layouts avoid shifting answer controls while the learner is tapping.

## Content production workflow

Every release item passes through these states:

```text
Draft → Language review → Asset review → In-app QA → Approved
```

The checks include:

- Arabic spelling, diacritics, meaning, and register;
- transliteration consistency;
- native-speaker audio pronunciation and quality;
- image clarity, cultural appropriateness, and licence record;
- correct topic and distractor pairing;
- rendering on small and large devices;
- accessibility labels and reading order.

Corrections update the content version while preserving the stable item ID so
learner progress is not discarded.

## MVP content and design acceptance

The tutorial MVP is ready for user testing when:

- at least 40 words across 6–8 topics have completed language and asset review;
- every word has working offline audio and an approved visual;
- one complete topic supports discovery, picture choice, word choice, matching,
  listening, and scheduled review;
- playful and standard presentation modes complete the same lesson successfully;
- transliteration can be visible, hidden, or adaptive;
- reduced-motion and screen-reader flows preserve all learning information;
- learners can pause, resume, make mistakes, and finish without assistance;
- review state and preferences survive an app restart.

## Open product decisions

1. Which learner group should be recruited first for usability testing?
2. Is English the only interface and translation language at launch?
3. Which language-review standard will govern vocalization and transliteration?
4. What illustration style can work for both presentation modes?
5. Will audio be commissioned before prototyping or recorded temporarily for
   internal validation?
6. How much learner control should adaptive transliteration expose?
7. Which simple spaced-review intervals should the prototype use?

## Explicitly deferred

- Accounts, cross-device sync, and cloud profiles
- Leaderboards, public sharing, lives, and competitive streaks
- Remote content management and downloadable packs
- Speech recognition or pronunciation scoring
- Arabic handwriting and letter tracing
- Dialect lessons mixed into Modern Standard Arabic content
- Parent or teacher dashboards
