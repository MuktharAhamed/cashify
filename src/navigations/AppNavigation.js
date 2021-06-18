import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavHome,
  NavSplashScreen,
  NavProductDetailPage,
} from 'app-constants/Navigations';
import Home from 'app-views/Home/Home';
import SplashScreen from 'app-views/SplashScreen';
import ProductDetailPage from 'app-views/ProductDetailPage';
import {Appbar} from 'react-native-paper';
import {
  AppearanceProvider,
  // useColorScheme,
  Appearance,
} from 'react-native-appearance';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
const Stack = createStackNavigator();

export const RootNavRef = React.createRef();

const AppNavigation = () => {
  const scheme = useColorScheme();
  console.log('scheme', scheme, Appearance.getColorScheme());
  const MyDarkTheme = {
    dark: true,
    colors: {
      primary: '#9933FF',
      background: '#000023',
      card: '#000028',
      text: '#bf3b3b',
      border: '#000028',
      notification: '#9933FF',
    },
  };
  return (
    <AppearanceProvider>
      <NavigationContainer
        ref={RootNavRef}
        theme={scheme === 'dark' ? MyDarkTheme : DefaultTheme}>
        {/* <Stack.Navigator initialRouteName={NavHome}> */}
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: props => <CustomNavigationBar {...props} />,
          }}>
          <Stack.Screen name={NavHome} component={Home} />
          <Stack.Screen name={NavSplashScreen} component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
    // <NavigationContainer ref={RootNavRef}>
    //   {/* <Stack.Navigator initialRouteName={NavHome}> */}
    //   <Stack.Navigator
    //     initialRouteName="Home"
    //     screenOptions={{
    //       header: props => <CustomNavigationBar {...props} />,
    //     }}>
    //     <Stack.Screen name={NavHome} component={Home} />
    //     <Stack.Screen name={NavSplashScreen} component={SplashScreen} />
    //     <Stack.Screen name={NavProductDetailPage} component={ProductDetailPage} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

function CustomNavigationBar({navigation, previous}) {
  return (
    <Appbar.Header
      style={{
        backgroundColor: 'white',
        // borderWidth: 0,
        // shadowColor: 'white',
        // borderBottomColor: 'transparent',
        // borderTopColor: 'transparent',
        // borderTopWidth: 0, //works
        // borderBottomWidth: 0, //works
        elevation: 0,
      }}>
      {!previous ? <Appbar.Action icon="menu" /> : null}
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="SUPER SALES " />
      {!previous ? <Appbar.Action icon="bell-ring-outline" /> : null}
      {!previous ? <Appbar.Action icon="cart-outline" /> : null}
      {previous ? <Appbar.Action icon="camera-enhance" /> : null}
    </Appbar.Header>
  );
}

export default AppNavigation;
