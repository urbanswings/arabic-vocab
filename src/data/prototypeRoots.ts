export type RootWord = {
  arabic: string;
  transliteration: string;
  meaning: string;
};

export type RootFamily = {
  id: string;
  letters: [string, string, string];
  rootLabel: string;
  meaning: string;
  words: RootWord[];
};

// Interaction fixtures only. These entries require the review workflow in
// docs/CONTENT_GOVERNANCE.md before they can become teaching content.
export const prototypeRoots: RootFamily[] = [
  {
    id: "amn",
    letters: ["أ", "م", "ن"],
    rootLabel: "أ م ن",
    meaning: "This root carries senses of safety, security, trust, and faith.",
    words: [
      { arabic: "آمَنَ", transliteration: "āmana", meaning: "he believed" },
      { arabic: "إِيمَان", transliteration: "īmān", meaning: "faith" },
      { arabic: "مُؤْمِن", transliteration: "muʾmin", meaning: "believer" },
      { arabic: "أَمَانَة", transliteration: "amānah", meaning: "trust" }
    ]
  },
  {
    id: "ktb",
    letters: ["ك", "ت", "ب"],
    rootLabel: "ك ت ب",
    meaning: "This root carries senses connected with writing and inscription.",
    words: [
      { arabic: "كَتَبَ", transliteration: "kataba", meaning: "he wrote" },
      { arabic: "كِتَاب", transliteration: "kitāb", meaning: "book" },
      { arabic: "مَكْتُوب", transliteration: "maktūb", meaning: "written" },
      { arabic: "كَاتِب", transliteration: "kātib", meaning: "writer" }
    ]
  },
  {
    id: "rhm",
    letters: ["ر", "ح", "م"],
    rootLabel: "ر ح م",
    meaning: "This root carries senses connected with mercy and compassion.",
    words: [
      { arabic: "رَحْمَة", transliteration: "raḥmah", meaning: "mercy" },
      { arabic: "رَحِيم", transliteration: "raḥīm", meaning: "merciful" },
      { arabic: "أَرْحَام", transliteration: "arḥām", meaning: "kinship ties" },
      { arabic: "رَحِمَ", transliteration: "raḥima", meaning: "he showed mercy" }
    ]
  }
];
