import generatedRootData from "./rootFamilies.generated.json";

export type RootWord = {
  arabic: string;
  transliteration: string;
};

export type RootFamily = {
  id: string;
  letters: string[];
  rootLabel: string;
  words: RootWord[];
};

type GeneratedRootData = {
  source: string;
  sourceRows: number;
  rootCount: number;
  uniqueRootWordPairs: number;
  families: RootFamily[];
};

const rootData = generatedRootData as GeneratedRootData;

export const rootFamilies = rootData.families;
export const rootDataSummary = {
  source: rootData.source,
  sourceRows: rootData.sourceRows,
  rootCount: rootData.rootCount,
  uniqueRootWordPairs: rootData.uniqueRootWordPairs
};

const prototypeMeanings: Record<string, string> = {
  "ا م ن": "This root carries senses of safety, security, trust, and faith.",
  "ك ت ب": "This root carries senses connected with writing and inscription.",
  "ر ح م": "This root carries senses connected with mercy and compassion."
};

export function getPrototypeRootMeaning(rootLabel: string): string {
  return (
    prototypeMeanings[rootLabel] ??
    "The meaning for this root is awaiting language and content review."
  );
}
