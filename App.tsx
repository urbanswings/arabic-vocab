import { StatusBar } from "expo-status-bar";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";

import {
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

function WordCard({ word }: { word: RootWord }) {
  return (
    <View
      accessibilityLabel={`${word.arabic}, ${word.transliteration}, ${word.translation}`}
      style={styles.wordCard}
    >
      <Text style={styles.wordArabic}>{word.arabic}</Text>
      <Text style={styles.wordTransliteration}>{word.transliteration}</Text>
      <View style={styles.wordDivider} />
      <Text numberOfLines={3} style={styles.wordMeaning}>
        {word.translation}
      </Text>
    </View>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const rootListRef = useRef<FlatList<RootFamily>>(null);
  const [activeRootIndex, setActiveRootIndex] = useState(0);
  const pageWidth = Math.max(1, width - HORIZONTAL_GUTTER * 2);
  const activeRoot = rootFamilies[activeRootIndex] ?? rootFamilies[0]!;

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
            <Text style={styles.swipeHint}>Swipe</Text>
          </View>
          <FlatList
            data={activeRoot.words}
            horizontal
            key={activeRoot.id}
            keyExtractor={(word) => `${activeRoot.id}-${word.arabic}`}
            renderItem={({ item }) => <WordCard word={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.wordList}
            ItemSeparatorComponent={() => <View style={styles.wordGap} />}
          />
        </View>
      </View>
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
    textTransform: "uppercase"
  },
  wordList: {
    paddingBottom: 26,
    paddingHorizontal: 20
  },
  wordGap: {
    width: 12
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
  wordArabic: {
    color: "#24241F",
    fontSize: 34,
    lineHeight: 48,
    textAlign: "center",
    writingDirection: "rtl"
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
  }
});
