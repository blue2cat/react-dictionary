import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useThemeColors } from 'hooks/useThemeColors';
import { useCustomTheme } from 'hooks/useCustomTheme';
import { useCustomFonts } from 'hooks/useCustomFonts';
import { useFonts } from 'expo-font';
import Main from '../screens/Main/index';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootNavigation = () => {
  // state for the theme and fonts
  const { colors } = useThemeColors();
  const { theme } = useCustomTheme();
  const { fonts } = useCustomFonts();

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: 'transparent',
    },
  };

  const [isLoaded] = useFonts({
    "Sans Serif": require("../../assets/fonts/lora/Lora-VariableFont_wght.ttf"),
    "Serif": require("../../assets/fonts/inter/Inter-VariableFont_slnt,wght.ttf"),
    "Mono": require("../../assets/fonts/inconsolata/Inconsolata-VariableFont_wdth,wght.ttf"),
  });

  // wait for the theme and fonts to load before hiding the splash screen
  useEffect(() => {
    const fetchSetting = async () => {
      if (!theme.loading && isLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    fetchSetting();
  }, [theme.loading, isLoaded]);

  // if the theme or fonts are still loading, don't render anything
  if (theme.loading || !isLoaded) return null;

  return (
    <NavigationContainer theme={navigationTheme} fonts={fonts}>
      <Main style={{ fontFamily: 'inconsolata-bold' }} />
    </NavigationContainer>
  );
};

export default RootNavigation;
