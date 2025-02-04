import { StatusBar as DefaultStatusBar } from 'react-native';
import { useCustomTheme } from 'hooks/useCustomTheme';

// StatusBar component that uses the custom theme hook
export const StatusBar = ({ ...rest }) => {

  // Define the theme and colors from the custom theme hook
  const { theme, colors } = useCustomTheme();
  const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <DefaultStatusBar
      barStyle={barStyle}
      backgroundColor={colors.background}
      {...rest}
    />
  );
};
