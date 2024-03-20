import React from "react";
import { View } from "react-native";
import { StyleSheet, FlatList } from "react-native";
import { useThemeColors } from "hooks/useThemeColors";
import { Text } from "components/themed";

const WordDef = (word) => {
  if (!word) return null;
  const { colors } = useThemeColors();

  const parsedWord = word["word"][0];

  return (
    <View>
      {parsedWord.meanings.map((meaning, index) => (
        <View key={index}>
          <View style={styles.partOfSpeechLine}>
            <Text style={[styles.type, { color: colors.text }]} testID="test-part-of-speech">
              {meaning.partOfSpeech}
            </Text>
            <Text style={styles.horizontalLine}></Text>
          </View>
          <Text style={[styles.meaning, { color: colors.gray }]}>Meaning</Text>
          {meaning.definitions.map((definition, index) => (
            <View key={index}>
            <View key={index} style={styles.bulletpointContainer}>
              <Text style={[styles.bulletpoint, { color: colors.highlight }]}>
                {"\u2B24"}
              </Text>
              <Text
                lineHeight={1200}
                style={[styles.definition, { color: colors.text }]}
                testID="test-definition"
              >
                {definition.definition}
              </Text>
            </View>
            <View>{definition.example && (
              <Text style={[styles.example, { color: colors.gray }]}>
                "{definition.example}"
              </Text>
            )}
            </View>
            </View>
          ))}

          {meaning.synonyms && meaning.synonyms.length > 0 && (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={[styles.meaning, { color: colors.gray }]}>
                Synonyms{" "}
              </Text>
              {meaning.synonyms.map((synonym, index) => (
                <Text
                  key={index}
                  style={[styles.synonyms, { color: colors.highlight }]}
                  testID="test-synonyms"
                >
                  {synonym}
                  {index === meaning.synonyms.length - 1 ? "" : ", "}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}

      <View style={styles.fullHorizontalLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  type: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    fontStyle: "italic",
  },
  bulletpointContainer: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  bulletpoint: {
    fontSize: 5,
    marginRight: 5,
    marginTop: 0,
    top: 0,
  },
  definition: {
    fontSize: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  meaning: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  horizontalLine: {
    backgroundColor: "gray",
    width: "85%",
    height: 1,
    marginLeft: 10,
    marginTop: 5,
  },
  fullHorizontalLine: {
    backgroundColor: "gray",
    width: "100%",
    height: 1,
    marginTop: 15,
  },
  partOfSpeechLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  synonyms: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 10,
  },
  example: {
    fontSize: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
});

export default WordDef;
