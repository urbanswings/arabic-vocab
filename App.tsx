import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";

import {
  getVerseText,
  getPrototypeRootMeaning,
  rootFamilies,
  RootFamily,
  RootWord
} from "./src/data/rootFamilies";

const HORIZONTAL_GUTTER = 20;

function RootLetters({ root }: { root: RootFamily }) {
  const compact = root.letters.length > 3;

  return (
    <View
      accessibilityLabel={`Arabic root ${root.rootLabel}`}
      style={[styles.lettersRow, compact && styles.lettersRowCompact]}
    >
      {root.letters.map((letter, index) => (
        <View
          key={`${root.id}-${index}`}
          style={[styles.letterCircle, compact && styles.letterCircleCompact]}
        >
          <Text style={[styles.letter, compact && styles.letterCompact]}>
            {letter}
          </Text>
        </View>
      ))}
    </View>
  );
}

function WordCard({
  compact,
  word,
  onPress
}: {
  compact: boolean;
  word: RootWord;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityLabel={`${word.arabic}, ${word.transliteration}, ${word.translation}`}
      accessibilityHint="Opens the Quran verse containing this word"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.wordCard,
        compact && styles.wordCardCompact,
        pressed && styles.wordCardPressed
      ]}
    >
      <Text style={[styles.wordArabic, compact && styles.wordArabicCompact]}>
        {word.arabic}
      </Text>
      <Text style={styles.wordTransliteration}>{word.transliteration}</Text>
      <View style={styles.wordDivider} />
      <Text numberOfLines={3} style={styles.wordMeaning}>
        {word.translation}
      </Text>
    </Pressable>
  );
}

function HighlightedVerse({
  verseText,
  selectedArabic
}: {
  verseText: string;
  selectedArabic: string;
}) {
  const parts = verseText.split(selectedArabic);

  return (
    <Text
      accessibilityLabel={verseText}
      selectable
      style={styles.verseText}
    >
      {parts.map((part, index) => (
        <Text key={`${index}-${part}`}>
          {part}
          {index < parts.length - 1 ? (
            <Text style={styles.highlightedVerseWord}>{selectedArabic}</Text>
          ) : null}
        </Text>
      ))}
    </Text>
  );
}

export default function App() {
  const { height, width } = useWindowDimensions();
  const rootListRef = useRef<FlatList<RootFamily>>(null);
  const [activeRootIndex, setActiveRootIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<RootWord | null>(null);
  const pageWidth = Math.max(1, width - HORIZONTAL_GUTTER * 2);
  const activeRoot = rootFamilies[activeRootIndex] ?? rootFamilies[0]!;
  const wordsPerColumn = height >= 820 ? 2 : 1;
  const wordColumns = useMemo(() => {
    const columns: RootWord[][] = [];

    for (let index = 0; index < activeRoot.words.length; index += wordsPerColumn) {
      columns.push(activeRoot.words.slice(index, index + wordsPerColumn));
    }

    return columns;
  }, [activeRoot, wordsPerColumn]);
  const selectedVerseText = selectedWord
    ? getVerseText(selectedWord.sourceId)
    : undefined;
  const [selectedSurah, selectedAyah] = selectedWord?.sourceId.split(":") ?? [];

  const rootLayout = useCallback(
    (_: ArrayLike<RootFamily> | null | undefined, index: number) => ({
      index,
      length: pageWidth,
      offset: pageWidth * index
    }),
    [pageWidth]
  );

  const onRootScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(
        event.nativeEvent.contentOffset.x / pageWidth
      );
      const boundedIndex = Math.max(
        0,
        Math.min(nextIndex, rootFamilies.length - 1)
      );
      setActiveRootIndex((currentIndex) =>
        currentIndex === boundedIndex ? currentIndex : boundedIndex
      );
    },
    [pageWidth]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>ROOT EXPLORER</Text>
            <Text style={styles.title}>Discover word families</Text>
          </View>
          <View style={styles.lessonBadge}>
            <Text style={styles.lessonBadgeText}>
              {activeRootIndex + 1} / {rootFamilies.length}
            </Text>
          </View>
        </View>

        <View style={styles.rootSection}>
          <Text style={styles.sectionLabel}>Swipe to explore a root</Text>
          <FlatList
            ref={rootListRef}
            data={rootFamilies}
            horizontal
            pagingEnabled
            bounces={false}
            decelerationRate="fast"
            getItemLayout={rootLayout}
            keyExtractor={(root) => root.id}
            onScroll={onRootScroll}
            renderItem={({ item }) => (
              <View style={[styles.rootPage, { width: pageWidth }]}>
                <RootLetters root={item} />
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            windowSize={3}
          />
          <View
            accessibilityLabel={`Root ${activeRootIndex + 1} of ${rootFamilies.length}`}
            style={styles.pagePosition}
          >
            <View style={styles.pageDot} />
            <View style={[styles.pageDot, styles.pageDotActive]} />
            <View style={styles.pageDot} />
          </View>
        </View>

        <View style={styles.meaningSection}>
          <Text style={styles.meaningLabel}>ROOT MEANING</Text>
          <Text accessibilityLiveRegion="polite" style={styles.meaningText}>
            {getPrototypeRootMeaning(activeRoot.rootLabel)}
          </Text>
          <Text style={styles.prototypeNotice}>
            Prototype content · contextual translations · review pending
          </Text>
        </View>

        <View style={styles.familySection}>
          <View style={styles.familyHeader}>
            <View>
              <Text style={[styles.sectionLabel, styles.familySectionLabel]}>
                Words in this family
              </Text>
              <Text style={styles.familyCount}>
                {activeRoot.words.length} examples
              </Text>
            </View>
            <Text style={styles.swipeHint}>Swipe to see more →</Text>
          </View>
          <FlatList
            data={wordColumns}
            horizontal
            key={`${activeRoot.id}-${wordsPerColumn}`}
            keyExtractor={(column) =>
              `${activeRoot.id}-${column.map((word) => word.arabic).join("-")}`
            }
            renderItem={({ item: column }) => (
              <View style={styles.wordColumn}>
                {column.map((word) => (
                  <WordCard
                    compact={wordsPerColumn === 2}
                    key={`${word.arabic}-${word.sourceId}`}
                    onPress={() => setSelectedWord(word)}
                    word={word}
                  />
                ))}
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.wordList}
            ItemSeparatorComponent={() => <View style={styles.wordGap} />}
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        onRequestClose={() => setSelectedWord(null)}
        statusBarTranslucent
        transparent
        visible={selectedWord !== null}
      >
        <View style={styles.modalBackdrop}>
          <View
            accessibilityViewIsModal
            style={styles.modalCard}
          >
            <Text style={styles.modalEyebrow}>QURANIC CONTEXT</Text>
            <Text style={styles.modalTitle}>
              Surah {selectedSurah} · Ayah {selectedAyah}
            </Text>

            {selectedWord ? (
              <View style={styles.selectedWordRow}>
                <Text style={styles.selectedWordArabic}>{selectedWord.arabic}</Text>
                <Text numberOfLines={2} style={styles.selectedWordMeaning}>
                  {selectedWord.translation}
                </Text>
              </View>
            ) : null}

            <ScrollView
              contentContainerStyle={styles.verseScrollContent}
              style={styles.verseScroll}
            >
              {selectedVerseText && selectedWord ? (
                <HighlightedVerse
                  selectedArabic={selectedWord.arabic}
                  verseText={selectedVerseText}
                />
              ) : (
                <Text style={styles.verseText}>Verse text is unavailable.</Text>
              )}
            </ScrollView>

            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedWord(null)}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.closeButtonPressed
              ]}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F3EA"
  },
  screen: {
    flex: 1,
    paddingTop: 14
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: HORIZONTAL_GUTTER,
    paddingBottom: 18
  },
  eyebrow: {
    color: "#7B6A52",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.8,
    marginBottom: 5
  },
  title: {
    color: "#24241F",
    fontSize: 23,
    fontWeight: "700",
    letterSpacing: -0.4
  },
  lessonBadge: {
    alignItems: "center",
    backgroundColor: "#E6DDCA",
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 36,
    paddingHorizontal: 13
  },
  lessonBadgeText: {
    color: "#62543F",
    fontSize: 13,
    fontWeight: "700"
  },
  rootSection: {
    marginHorizontal: HORIZONTAL_GUTTER,
    backgroundColor: "#E9E2D4",
    borderRadius: 28,
    paddingTop: 18,
    overflow: "hidden"
  },
  sectionLabel: {
    color: "#615744",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.25,
    paddingHorizontal: 20
  },
  rootPage: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 24
  },
  lettersRow: {
    flexDirection: "row-reverse",
    gap: 14
  },
  lettersRowCompact: {
    gap: 8
  },
  letterCircle: {
    alignItems: "center",
    backgroundColor: "#FFFDF8",
    borderColor: "rgba(104, 86, 57, 0.08)",
    borderRadius: 38,
    borderWidth: 1,
    height: 76,
    justifyContent: "center",
    shadowColor: "#604E34",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    width: 76
  },
  letterCircleCompact: {
    borderRadius: 25,
    height: 50,
    width: 50
  },
  letter: {
    color: "#25231F",
    fontSize: 39,
    lineHeight: 54,
    textAlign: "center",
    writingDirection: "rtl"
  },
  letterCompact: {
    fontSize: 27,
    lineHeight: 38
  },
  pagePosition: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    paddingBottom: 16
  },
  pageDot: {
    backgroundColor: "#C4B9A5",
    borderRadius: 3,
    height: 6,
    width: 6
  },
  pageDotActive: {
    backgroundColor: "#2F7565",
    width: 22
  },
  meaningSection: {
    alignItems: "center",
    minHeight: 175,
    justifyContent: "center",
    paddingHorizontal: 34,
    paddingVertical: 22
  },
  meaningLabel: {
    color: "#A07642",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginBottom: 10
  },
  meaningText: {
    color: "#292822",
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 31,
    maxWidth: 410,
    textAlign: "center"
  },
  prototypeNotice: {
    color: "#968B78",
    fontSize: 11,
    marginTop: 10
  },
  familySection: {
    backgroundColor: "#2D675B",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flex: 1,
    minHeight: 250,
    paddingTop: 20
  },
  familyHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14
  },
  familyCount: {
    color: "#C9DED8",
    fontSize: 12,
    marginTop: 4,
    paddingHorizontal: 20
  },
  familySectionLabel: {
    color: "#F8F3E9"
  },
  swipeHint: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 14,
    color: "#F6F0E5",
    fontSize: 11,
    fontWeight: "700",
    marginRight: 20,
    overflow: "hidden",
    paddingHorizontal: 11,
    paddingVertical: 7,
    textTransform: "none"
  },
  wordList: {
    paddingBottom: 26,
    paddingHorizontal: 20
  },
  wordGap: {
    width: 12
  },
  wordColumn: {
    gap: 12
  },
  wordCard: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFFDF8",
    borderRadius: 24,
    justifyContent: "center",
    minHeight: 176,
    paddingHorizontal: 18,
    paddingVertical: 17,
    shadowColor: "#193B34",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 15,
    width: 150
  },
  wordCardCompact: {
    minHeight: 142,
    paddingHorizontal: 14,
    paddingVertical: 11
  },
  wordCardPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }]
  },
  wordArabic: {
    color: "#24241F",
    fontSize: 34,
    lineHeight: 48,
    textAlign: "center",
    writingDirection: "rtl"
  },
  wordArabicCompact: {
    fontSize: 29,
    lineHeight: 40
  },
  wordTransliteration: {
    color: "#756B59",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 2
  },
  wordDivider: {
    backgroundColor: "#E7DFD1",
    height: 1,
    marginVertical: 10,
    width: 42
  },
  wordMeaning: {
    color: "#4F493E",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center"
  },
  modalBackdrop: {
    alignItems: "center",
    backgroundColor: "rgba(24, 29, 26, 0.68)",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 48
  },
  modalCard: {
    backgroundColor: "#FFFDF8",
    borderRadius: 28,
    maxHeight: "82%",
    maxWidth: 520,
    padding: 24,
    shadowColor: "#111814",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 24,
    width: "100%"
  },
  modalEyebrow: {
    color: "#A07642",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.6,
    textAlign: "center"
  },
  modalTitle: {
    color: "#292822",
    fontSize: 21,
    fontWeight: "700",
    marginTop: 7,
    textAlign: "center"
  },
  selectedWordRow: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#E9E2D4",
    borderRadius: 18,
    marginTop: 18,
    maxWidth: "100%",
    paddingHorizontal: 18,
    paddingVertical: 10
  },
  selectedWordArabic: {
    color: "#24241F",
    fontSize: 26,
    lineHeight: 36,
    textAlign: "center",
    writingDirection: "rtl"
  },
  selectedWordMeaning: {
    color: "#625947",
    fontSize: 12,
    marginTop: 2,
    textAlign: "center"
  },
  verseScroll: {
    marginVertical: 20
  },
  verseScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 4
  },
  verseText: {
    color: "#272720",
    fontSize: 25,
    lineHeight: 45,
    textAlign: "right",
    writingDirection: "rtl"
  },
  highlightedVerseWord: {
    backgroundColor: "#E7C77D",
    color: "#173F36",
    fontWeight: "700"
  },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#2D675B",
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 24
  },
  closeButtonPressed: {
    backgroundColor: "#245348"
  },
  closeButtonText: {
    color: "#FFFDF8",
    fontSize: 15,
    fontWeight: "700"
  }
});
