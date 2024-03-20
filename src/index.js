import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'context/Theme';
import { FontProvider } from 'context/Fonts';
import RootNavigation from 'navigation/RootNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FontProvider>
          <RootNavigation />
        </FontProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
