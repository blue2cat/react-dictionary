import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "components/themed";
import { Audio } from "expo-av";
import { useThemeColors } from "hooks/useThemeColors";
import { useEffect } from "react";
import PlayButton from "../../components/svgr/PlayButton";

const WordPhonics = ({ word }) => {
  // state to store the sound object
  const { colors } = useThemeColors();
  const [sound, setSound] = useState();

  // get the audio uri if it exists
  const getAudioUri = (word) => {
    return word[0].phonetics.find((phonetic) => phonetic.audio)?.audio || null;
  };

  // function to play the sound
  async function playSound() {
    const uri = getAudioUri(word);

    const { sound } = await Audio.Sound.createAsync({ uri: uri });
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.word, { color: colors.text }]}>
          {word[0].word}
        </Text>
        <Text
          style={[styles.wordPronunciation, { color: colors.highlight }]}
          testID="test-phonetic-section"
        >
          {word[0].phonetic}
        </Text>
      </View>
      <View>
        {getAudioUri(word) ? (
          <TouchableOpacity
            style={styles.audioButton}
            onPress={playSound}
            testID="test-audio-button"
          >
            <PlayButton style={styles.playButton} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  word: {
    fontSize: 40,
    fontWeight: "bold",
  },
  audioButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  wordPronunciation: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default WordPhonics;
