import React from 'react';
import AppNavigation from 'app-navigations/AppNavigation';
import {Provider as PaperProvider} from 'react-native-paper';
const App = () => {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  );
};

export default App;
