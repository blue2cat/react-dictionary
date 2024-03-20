import React from 'react';
import { View, StyleSheet} from 'react-native';
import { A } from '@expo/html-elements';
import { useThemeColors } from 'hooks/useThemeColors';
import { useCustomFonts } from 'hooks/useCustomFonts';
import { Text } from 'components/themed';
import NewLink from 'components/svgr/NewLink';

const Sources = ({word}) => {
  const { colors } = useThemeColors();
  const { font } = useCustomFonts();
  
  parsedWord = word[0];

  if (!parsedWord) return null;

  return (
    <View>
      <Text style={[styles.sourcesText, { color: colors.gray }]}>Source</Text>
      {parsedWord.sourceUrls.map((source, index) => (
        <View key={index}>
          <View style={{flex: 1, flexDirection: 'row'}}><A href={source} style={[styles.source, { color: colors.text, fontFamily: font }]}>{source}</A><NewLink style={{marginBottom: 1}}/></View>
        </View>
      ))}
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  sourcesText: {
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  source: {
    textDecorationLine: 'underline',
    marginRight: 5,
  },
});

export default Sources;
