import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import Search from "components/svgr/Search";
import { useThemeColors } from "hooks/useThemeColors";
import { useCustomFonts } from "hooks/useCustomFonts";

const InputArea = ({
  word,
  setWord,
  setServerResponse,
  error,
  setError,
  setLoading,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useThemeColors();
  const { font } = useCustomFonts();

  useEffect(() => {
    searchWord(word);
  }, []);

  // function to search for a word in the dictionary backend
  const searchWord = async (word) => {
    // set loading to true and error to null
    setLoading(true);
    setError(null);

    // make a request to the dictionary api in async mode
    try {
      const response = await axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .catch(function (error) {
          if (error.response.status == 404) {
            setServerResponse("404");
          }
        });

      // catch 404 error
      if (response) {
        setServerResponse(response.data);
      }
    } catch (error) {
      console.error(error);
      setError("Word not found!");
    }

    // set loading to false
    setLoading(false);
  };

  // function to handle the submit event
  const handleSubmit = () => {
    if (word.trim().length > 0) {
      searchWord(word);
    } else {
      setError("Input field cannot be empty!");
    }
  };

  return (
    <View>
      <View style={[styles.inputArea]} testID="test-input-area">
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.searchBoxBackground,
                borderColor: isFocused ? colors.highlight : colors.background,
                fontFamily: font,
              },
            ]}
            onChangeText={setWord}
            value={word}
            keyboardType="default"
            placeholder="Enter a word!"
            placeholderTextColor={colors.text}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            testID="test-input-area-box"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            cursorColor={colors.highlight}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.searchIcon} testID="test-search-button">
            <Search />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  input: {
    marginLeft: 15,
    width: "100%",
    height: 50,
    paddingLeft: 20,
    borderRadius: 15,
    fontWeight: "bold",
    flex: 1,
    borderWidth: 2,
  },
  searchIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    justifyContent: "space-between",
    right: 10,
    flexDirection: "row",
    marginTop: 15,
    paddingTop: 2,
  },
});

export default InputArea;
