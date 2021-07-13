import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavHome,
  NavSplashScreen,
  NavProductDetailPage,

  NavLogin,
  NavSignup,
  NavCartPage,
  NavForgotPassword,
  NavProductListingPage,

} from 'app-constants/Navigations';
import Home from 'app-views/Home/Home';
import SplashScreen from 'app-views/SplashScreen';
import ForgotPassword from 'app-views/ForgotPassword';
import ProductDetail from 'app-views/ProductDetail';
import ProductListing from 'app-views/ProductListing';

import {Provider} from 'react-redux';
import Cart from 'app-views/Cart';

import ProductDetailPage from 'app-views/ProductDetailPage';
import {Appbar} from 'react-native-paper';
import {
  AppearanceProvider,
  // useColorScheme,
  Appearance,
} from 'react-native-appearance';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
// import {useColorScheme} from 'react-native';
import Login from 'app-views/Login/Login';
import Signup from 'app-views/Signup/Signup';
import {PersistGate} from 'redux-persist/integration/react';

// import store
import store, {persistor} from '../store';

const Stack = createStackNavigator();

export const RootNavRef = React.createRef();

const AppNavigation = () => {
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

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer ref={RootNavRef}>
            {/* <Stack.Navigator initialRouteName={NavHome}> */}
            <Stack.Navigator
              initialRouteName={NavProductDetailPage}
              screenOptions={{
                  header: props => <CustomNavigationBar {...props} />,
              }}
            >
              
          

         
          <Stack.Screen
            name={NavProductListingPage}
            component={ProductListing}
          />
              <Stack.Screen name={NavSplashScreen} component={SplashScreen} />
              <Stack.Screen name={NavLogin} component={Login} />
              <Stack.Screen name={NavSignup} component={Signup} />
              <Stack.Screen
                name={NavForgotPassword}
                component={ForgotPassword}
              />
              <Stack.Screen name={NavHome} component={Home} />
              <Stack.Screen
                name={NavProductDetailPage}
                component={ProductDetail}
              />
              <Stack.Screen name={NavCartPage} component={Cart} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>

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
      }}
    >
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
