import { SafeAreaView, StatusBar } from 'components/themed';

// Root layout component
const Main = ({children}) => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
          {children}
      </SafeAreaView>
    </>
  );
};

export default Main;
