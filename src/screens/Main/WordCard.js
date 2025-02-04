import { View, StyleSheet } from "react-native";
import { useThemeColors } from "hooks/useThemeColors";
import { ViewContrast, Text, TextBold } from "components/themed";
import WordPhonics from "./WordPhonics";
import WordDef from "./WordDef";
import Sources from "./Sources";

const WordCard = ({ word, error, loading }) => {
  const { colors } = useThemeColors();

  // If the word is loading, show a loading message
  if (loading)
    return (
      <ViewContrast
        style={[
          styles.card,
          { color: colors.text, backgroundColor: colors.background },
        ]}
      >
        <Text>Loading...</Text>
      </ViewContrast>
    );

  // If the word is not found, show a 404 message
  if (word == "404") {
    return (
      <ViewContrast
        style={[
          styles.card,
          { color: colors.text, backgroundColor: colors.background },
        ]}
        testID="test-404-card"
      >
        <TextBold style={{ fontSize: 40 }}>☹️</TextBold>

        <TextBold
          style={[{ fontSize: 15, marginTop: 10 }, { color: colors.text }]}
        >
          No Definitions Found
        </TextBold>

        <Text style={[{ fontSize: 10, marginTop: 10 }, { color: colors.gray }]}>
          Sorry pal, we couldn't find any definitions for the word you're
          looking for. You can try the search again at a later time or head over
          to the dictionary website to find the word.
        </Text>
      </ViewContrast>
    );
  }

  // If there is an error, show the error message
  if (error)
    return (
      <ViewContrast
        style={[
          styles.card,
          { color: "red", backgroundColor: colors.background },
        ]}
        testID="test-error-card"
      >
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </ViewContrast>
    );

  if (!word) return null;

  return (
    <ViewContrast
      style={[
        styles.card,
        { color: colors.text, backgroundColor: colors.background },
      ]}
      testID="test-word-card"
    >
      <View style={[styles.cardHeader, { color: colors.text }]}>
        <WordPhonics word={word} />
      </View>

      <WordDef
        word={word}
        style={[styles.cardHeader, { color: colors.text }]}
      />
      <Sources
        word={word}
        style={[styles.cardHeader, { color: colors.text }]}
      />
    </ViewContrast>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  cardHeader: {
    flexDirection: "row",
  },
});

export default WordCard;
