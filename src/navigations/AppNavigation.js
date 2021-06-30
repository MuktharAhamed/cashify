import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavHome,
  NavSplashScreen,
  NavProductDetailPage,
  NavLogin,
  NavSignup,
  NavProductListingPage
} from 'app-constants/Navigations';
import Home from 'app-views/Home/Home';
import SplashScreen from 'app-views/SplashScreen';
import ProductDetail from 'app-views/ProductDetail';
import ProductListing from 'app-views/ProductListing';
import Cart from 'app-views/Cart'
import ProductDetailPage from 'app-views/ProductDetailPage';
import {Appbar} from 'react-native-paper';
import {
  AppearanceProvider,
  // useColorScheme,
  Appearance,
} from 'react-native-appearance';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import Login from 'app-views/Login/Login';
import Signup from 'app-views/Signup/Signup';

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
        >
        {/* <Stack.Navigator initialRouteName={NavHome}> */}
        <Stack.Navigator
          initialRouteName={NavHome}
          screenOptions={{
            header: props => <CustomNavigationBar {...props} />,
          }}>
          <Stack.Screen name={NavHome} component={Home} />
          <Stack.Screen name={NavSplashScreen} component={SplashScreen} />
          {/* <Stack.Screen
            name={NavProductDetailPage}
            component={ProductDetailPage}
          /> */}
          <Stack.Screen name={NavLogin} component={Login} />
          <Stack.Screen name={NavSignup} component={Signup} />
          <Stack.Screen name={NavProductDetailPage} component={ProductDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
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
      {previous ? <Appbar.Action icon="cart-outline" /> : null}
    </Appbar.Header>
  );
}

export default AppNavigation;
