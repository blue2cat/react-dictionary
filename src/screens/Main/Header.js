import React, { useState } from "react";
import { StyleSheet, Switch } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { View } from "components/themed";
import { useCustomTheme } from "hooks/useCustomTheme";
import { useThemeColors } from "hooks/useThemeColors";
import { useCustomFonts } from "hooks/useCustomFonts";
import HalfMoon from "components/svgr/HalfMoon";
import Logo from "components/svgr/Logo";

const Header = ({ user, addUser, style, ...rest }) => {
  // Contexts
  const { theme, setTheme } = useCustomTheme();
  const { colors } = useThemeColors();
  const { font, setFont, fontList } = useCustomFonts();

  // Handle font change when dropdown is selected
  const handleFontChange = (font) => {
    setFont(font);
  };

  // Data for the font dropdown
  const data = fontList.map((font) => {
    return { label: font, value: font };
  });

  return (
    <View style={[styles.header, style]} {...rest} testID="test-header">
      <Logo />
      <View style={styles.rightContainer}>
        <Dropdown
          mode="auto"
          style={[styles.dropdown, { backgroundColor: colors.background }]}
          itemTextStyle={{ color: colors.text }}
          iconColor={colors.highlight}
          activeColor={colors.background}
          selectedTextStyle={{ color: colors.text }}
          containerStyle={[
            {
              backgroundColor: colors.background,
              color: colors.text,
              shadowColor: colors.themeHighlight,
            },
            styles.container,
          ]}
          fontFamily={font}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={font}
          value={font}
          onChange={(item) => {
            handleFontChange(item.value);
          }}
          testID="test-font-dropdown"
        />
        <View style={styles.verticalLine}></View>
        <View style={styles.themeBox}>
          <Switch
            value={theme === "dark"}
            onValueChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={styles.switch}
            thumbColor={"white"}
            trackColor={{ true: colors.highlight, false: "gray" }}
            testID="test-theme-switch"
          />
          <HalfMoon color={colors.moon} />
        </View>
      </View>
    </View>
  );
};

// Local spacing styles
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    marginRight: 15,
  },
  logo: {
    width: 100,
    height: 100,
  },
  verticalLine: {
    height: 35,
    width: 1,
    backgroundColor: "gray",
    marginLeft: 10,
    marginRight: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    borderRadius: 8,
    borderWidth: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 13,
    elevation: 5,
  },
  dropdown: {
    height: 50,
    width: 180,
    marginRight: 10,
    padding: 35,
  },
});

export default Header;
