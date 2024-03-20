import { View as DefaultView } from "react-native";
import { SafeAreaView as DefaultSafeAreaView } from "react-native-safe-area-context";
import { useCustomTheme } from "hooks/useCustomTheme";
import { useCustomFonts } from "hooks/useCustomFonts";

export const ViewPlain = ({ ...rest }) => {
  return <DefaultView {...rest} />;
};

export const View = ({ style, ...rest }) => {
  const { colors } = useCustomTheme();
  const { font } = useCustomFonts();

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background, fontFamily: font }, style]}
      {...rest}
    />
  );
};

export const ViewContrast = ({ style, ...rest }) => {
  const { colors } = useCustomTheme();
  const { font } = useCustomFonts();
  return (
    <DefaultView
      style={[
        { backgroundColor: colors.backgroundSecondary, fontFamily: font },
        style,
      ]}
      {...rest}
    />
  );
};

export const SafeAreaView = ({ style, ...rest }) => {
  const { colors } = useCustomTheme();
  const { font } = useCustomFonts();
  return (
    <DefaultSafeAreaView
      style={[{ backgroundColor: colors.background, fontFamily: font }, style]}
      {...rest}
    />
  );
};
