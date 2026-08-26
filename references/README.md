# Vocabulary Reference Sources

This directory contains research inputs for generating the eventual Quranic
vocabulary candidate list. These files are not approved app content and are not
the canonical source for Quranic text, translation, morphology, or theology.

## Inventory

| File | Format and scope | Intended use | Current caveats |
| --- | --- | --- | --- |
| `Cleaned_Root_letters.xlsx` | 77,431 occurrence rows with verse ID, Arabic form, transliteration, and `Root_Letters` | Current Root Explorer source; generates root groups and unique Arabic forms | Root labels are source classifications, include non-triliteral groups, and require provenance and methodology verification |
| `QuranRootLetters.xlsx` | 77,431 occurrence rows with verse ID, Arabic form, contextual translation, transliteration, and letter-name columns | Supplies the contextual translation displayed on Root Explorer word cards | `ID` identifies a verse and is not unique per word; translations are occurrence-specific and must not be treated as universal definitions |
| `quran_v2.json` | 114 surahs containing 6,236 verses keyed as `surah-ayah` | Supplies the complete Arabic verse shown when a Root Explorer word card is tapped | Provenance, licence, Quranic text edition, and vocalization policy must be verified before release |
| `mostFrequent_5000_quranWords.csv` | 5,000 ranked surface forms with occurrence counts | Candidate discovery and frequency comparison | Provenance, tokenization rules, licence, and edition are not recorded in the file |
| `Quran-All-Words.xlsx` | 5,159 populated rows with word, frequency, part of speech, and cumulative percentage | Frequency and part-of-speech comparison | Notes attribute the data to the Quranic Arabic Corpus; redistribution terms and exact processing method still require verification |
| `quranRoots.json` | 1,922 records with a name/root label, count, and occurrence references | Root-family candidate discovery | Provenance and licence are not recorded; the occurrence coordinate format must be documented and verified before use |
| `80_percent.pdf` | 46-page scanned book, *80% of Qur'anic Words: Classified word lists for easy memorisation*, compiled by Dr Abdulazeez Abdulraheem | Human-readable topic grouping and comparison | Scanned text is not machine-readable by default; publication and redistribution rights must be established |

## Integrity snapshot

The hashes below identify the exact files first added to this repository:

```text
064c734b80cfb831bf1996c21423d4e709272b526978c0cac04ab704bc1a98b5  Cleaned_Root_letters.xlsx
a1a1c835715832c54819cdffd5bccafb1e49d149216c6635b10497f632db35d5  QuranRootLetters.xlsx
e226105ef527ee1e178627b091493503fb54c266ea6db42bcb61066c0f0806a9  quran_v2.json
9f543489c43cf747fc22542613e3d6f7d6d5406ac2d109c863eb9f9df45e88bd  80_percent.pdf
a5da310ebcaf972d9d1bf501b3f183344c3d929698cbb1e32fa1800547742744  Quran-All-Words.xlsx
61842ad247ee8b7fac756f7f46228a6e348711e8f623b935d2c977cb90c9d3de  mostFrequent_5000_quranWords.csv
d1875a9205269e3d5c54b5a2af5309a764adf9c42ff254d2d63d73dc764d02c1  quranRoots.json
```

If a file changes intentionally, update its provenance record and integrity
snapshot in the same change. A changed hash is not evidence that the new file is
more authoritative.

## Known reconciliation issue

The sources do not use an obviously identical definition of a “word.” For
example, the CSV reports `مِنْ` 1,673 times while the workbook reports a
normalized `من` 3,226 times. Differences may arise from tokenization,
orthographic normalization, attached clitics, vocalization, lemmas versus
surface forms, or corpus edition.

Frequency values must therefore retain their source and counting method. The app
must not merge counts, choose the largest number, or present cross-source ranks
as equivalent until the methods are documented and reconciled.

## Candidate-generation pipeline

```text
Raw reference files (immutable inputs)
                 ↓
Source-specific adapters and provenance
                 ↓
Normalized comparison records
                 ↓
Discrepancy report and manual resolution
                 ↓
Curriculum candidate list
                 ↓
Quranic text, language, morphology, theology, and rights review
                 ↓
Approved, versioned app content pack
```

Raw reference files remain separate from generated data. Source-specific fields
and original spellings are preserved so every normalization decision can be
audited.

### Current Root Explorer generation

Run `npm run generate:roots` from the repository root. The generator:

1. reads `ID`, `Root_Letters`, `ARABIC`, and `Transliteration` from the cleaned
   workbook;
2. matches `QuranRootLetters.xlsx` by `ID` plus occurrence position within that
   ID, then verifies `ARABIC` and `Transliteration` before accepting a
   translation;
3. normalizes whitespace in `Root_Letters` without changing the letters;
4. groups rows by that normalized root label;
5. deduplicates exact `ARABIC` values within each group in first-occurrence
   order;
6. preserves the transliteration, contextual translation, and verse ID from the
   first retained occurrence;
7. converts each retained verse ID from `surah:ayah` to the JSON source's
   `surah-ayah` key and fails if any required verse is missing;
8. writes `src/data/rootFamilies.generated.json` and a compact
   `src/data/verses.generated.json` containing only referenced verses.

The current snapshot produces 1,799 root groups, 17,623 unique root–word pairs,
and 5,117 referenced verses. Diacritic or clitic variants remain separate
because the source strings are not linguistically collapsed. The generated
files are interaction datasets, not reviewed curriculum content.

Both workbooks contain 6,236 distinct verse IDs, and those IDs repeat up to 128
times. Joining on `ID` alone would incorrectly assign the first word's
translation to every word in a verse. The occurrence-aware join validates all
77,431 aligned rows and fails generation on a missing, reordered, or mismatched
record.

The same exact Arabic form can have different contextual translations. The
prototype displays the translation from the first retained occurrence and keeps
its verse ID for traceability. This is a deterministic display rule, not a claim
that the translation is a complete lexical definition.

### Current screen usage

The implemented Root Explorer uses only these reference inputs:

- `Cleaned_Root_letters.xlsx` supplies the root grouping, Arabic card text,
  transliteration, ordering, and retained `ID` for the first occurrence of each
  exact Arabic form;
- `QuranRootLetters.xlsx` supplies that occurrence's contextual English
  translation after row-alignment validation;
- `quran_v2.json` supplies `versetext` after converting a retained workbook ID
  such as `13:13` to a JSON key such as `13-13`.

At runtime, the screen uses generated JSON rather than parsing the workbooks or
raw Quran file. It swipes through generated root groups, lays the words out in
one or two rows according to screen height, and opens the matched verse when a
word is selected. The selected Arabic string is highlighted inline when it
appears exactly in `versetext`. Orthographic differences between sources must
remain visible for later reconciliation; the app must not silently rewrite the
Quranic text to force a match.

`mostFrequent_5000_quranWords.csv`, `Quran-All-Words.xlsx`, `quranRoots.json`,
and `80_percent.pdf` do not currently drive this screen. They remain candidate
research sources for later reviewed curriculum work.

## Proposed normalized candidate record

```ts
type VocabularyCandidate = {
  candidateId: string;
  sourceId: string;
  sourceRecordId: string;
  sourceForm: string;
  normalizedForm?: string;
  proposedLemma?: string;
  proposedRoot?: string;
  sourceFrequency?: number;
  sourceRank?: number;
  sourcePartOfSpeech?: string;
  sourceOccurrences?: string[];
  normalizationMethodVersion?: string;
  reconciliationStatus: "unreviewed" | "matched" | "conflict" | "excluded";
  notes?: string;
};
```

Candidate records deliberately use `proposed` fields. A frequency list cannot
approve a lemma, root, meaning, verse occurrence, or lesson explanation.

## Source-admission checklist

Before a reference can influence a release curriculum, record:

- creator or publisher;
- original download or publication location;
- source edition and version/date;
- licence and redistribution permission;
- corpus and Quranic text edition;
- definition of word, lemma, root, and occurrence;
- tokenization and orthographic-normalization rules;
- known corrections or limitations;
- local file hash and ingestion-adapter version.

If provenance or licensing remains unknown, the source may inform internal
research only. Its text, tables, or derived content must not be shipped merely
because the file exists in this repository.

## Selection principles

Frequency is one input, not the curriculum by itself. Candidate selection also
considers:

- usefulness for Quran comprehension;
- contextual and theological review complexity;
- suitability for short beginner lessons;
- ability to teach the word honestly without a misleading single gloss;
- coverage across nouns, actions, prepositions, and particles;
- recurrence across sufficiently varied verse contexts;
- relationship to already learned vocabulary and future sarf lessons.

Final selection follows [Content Governance and Source
Policy](../docs/CONTENT_GOVERNANCE.md) and the staged pilot in [Tutorial Content
and Experience Design](../docs/TUTORIAL_DESIGN.md).
