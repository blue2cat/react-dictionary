import { Text as DefaultText } from 'react-native';
import { useThemeColors } from 'hooks/useThemeColors';
import { useCustomFonts } from 'hooks/useCustomFonts';

const Text = ({ style, ...rest }) => {
  const { colors } = useThemeColors();
  const { font } = useCustomFonts();

  return (
    <DefaultText
      style={[
        { color: colors.text, fontSize: 16, fontFamily: font},
        style,
      ]}
      {...rest}
    />
  );
};

const TextBold = ({ style, ...rest }) => {
  const { colors } = useThemeColors();
  const { font } = useCustomFonts();
  return (
    <DefaultText
      style={[
        { color: colors.text, fontSize: 16 },
        style,
      ]}
      {...rest}
    />
  );
};

export { Text, TextBold };
export default Text;
