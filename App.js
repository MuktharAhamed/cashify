import React from 'react';
import AppNavigation from 'app-navigations/AppNavigation';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const App = () => {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  );
};
export const styles = StyleSheet.create({
  // ...DefaultTheme,
  // myOwnProperty: true,
  // dark: false,
  // roundness: 2,
  Button: {
    width: 12,
  },
});
export default App;
