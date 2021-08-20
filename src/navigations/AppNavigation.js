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
  NavFavorites,
  NavBulkListing,
  NavBulkDetail,
  NavShippingAddress,
  NavCheckoutPage,
} from 'app-constants/Navigations';
// import Home from 'app-views/Home/Home';
import SplashScreen from 'app-views/SplashScreen';
import ForgotPassword from 'app-views/ForgotPassword';
import ProductDetail from 'app-views/ProductDetail';
import ProductListing from 'app-views/ProductListing';
import Favorites from 'app-views/Favorites';
import BulkListing from 'app-views/BulkListing';
import BulkDetails from 'app-views/BulkDetail';
import {Provider} from 'react-redux';
//import Cart from 'app-views/Cart';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Cart from 'app-views/Cart/MyCheckList';
import ShippingAddressUpdate from 'app-views/Cart/shippingAddress';
// import ShippingAddressUpdate from 'app-views/Cart/shippingAddress';

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

import {PersistGate} from 'redux-persist/integration/react';

// import store
import store, {persistor} from '../store';

import {useNavigation} from '@react-navigation/native';
// import Stacknavigations from '../navigations/stacknavigation';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  CreateStyle,
  StyleSheet,
} from 'react-native';
import Stacknavigations from './stacknavigation';
const Stack = createStackNavigator();

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from 'react-native-vector-icons/Feather';

export const RootNavRef = React.createRef();

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
const AppNavigation = () => {
  const scheme = useColorScheme();
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
  // const nre = createStackNavigator({
  //   NavLogin: {
  //     screen: Login,
  //     navigationOptions: {headerShown: false},
  //   },
  //   NavSignup: {
  //     screen: Login,
  //     navigationOptions: {headerShown: false},
  //   },
  // });
  const getInitialPage = () => {
    const customerAccessToken = store.getState().customer.customerAccessToken;
    const expiresAt = store.getState().customer.expiresAt;
    var curentDate = new Date();
    console.log('customerAccessToken', customerAccessToken);
    if (customerAccessToken) {
      const diffTime = Math.abs(expiresAt - curentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // console.log(diffDays);
      if (diffDays >= 0) return NavLogin;
      else return NavHome;
    } else return NavLogin;
  };

  const Homescreen1 = () => {
    return (
      <View style={{flex: 1}}>
        <Text>hello</Text>
      </View>
    );
  };

  return (
    <AppearanceProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer ref={RootNavRef}>
            {/* <Drawer.Navigator
              screenOptions={{
                header: props => <CustomNavigationBar {...props} />,
                gestureEnabled: false,
                swipeEnabled: false,
              }}
              drawerContent={props => <CustomDrawerContent {...props} />}
            >
              <Drawer.Screen
                name={NavLogin}
                component={Login}
                options={{title: 'Super Sales'}}
              />
              <Drawer.Screen
                name={NavSignup}
                component={Signup}
                options={{title: 'Super Sales'}}
              />
              <Drawer.Screen
                name="Home-drawer"
                component={Stacknavigations}
                options={{drawerLabel: 'Home'}}
              />
            </Drawer.Navigator> */}

            {/* {Stacknavigations()} */}
            <Stack.Navigator
              initialRouteName={NavHome}
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name={NavLogin}
                component={Login}
                // options={{title: 'Super Sales'}}
              />
              <Stack.Screen
                name={NavSignup}
                component={Signup}
                // options={{title: 'Super Sales'}}
              />
              <Stack.Screen
                name={NavForgotPassword}
                component={ForgotPassword}
              />
              <Stack.Screen
                name={'Drawer'}
                component={DrawerScreens}
                options={{title: 'Super Sales'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </AppearanceProvider>
  );
};

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList
        {...props}
        onPress={() => {
          props?.navigation.navigate(NavHome);
        }}
      /> */}
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginTop: 50,
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{fontWeight: 'bold', fontSize: 20}}>SUPER SALES</Text>
      </View>
      <DrawerItem
        icon={({focused, color, size}) => (
          <Home color={color} size={size} name="home" />
        )}
        label="Home"
        onPress={() => {
          props?.navigation.navigate(NavHome);
        }}
      />
      <DrawerItem
        label="Favorites"
        onPress={() => {
          props?.navigation.navigate(NavFavorites);
        }}
      />
      <DrawerItem
        label="Orders"
        onPress={() => {
          props?.navigation.navigate(NavFavorites);
        }}
      />
      <DrawerItem
        label="Bulk Mobile"
        onPress={() => {
          props?.navigation.navigate(NavFavorites);
        }}
      />
      <DrawerItem
        label="My Account"
        onPress={() => {
          props?.navigation.navigate(NavFavorites);
        }}
      />
      <DrawerItem
        label="Log Out"
        onPress={() => {
          props?.navigation.navigate(NavFavorites);
        }}
      />
    </DrawerContentScrollView>
  );
};

function DrawerScreens({navigation}) {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
        gestureEnabled: false,
        swipeEnabled: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home-drawer"
        component={Stacknavigations}
        options={{drawerLabel: 'Home'}}
      />
    </Drawer.Navigator>
  );
}
function CustomNavigationBar({navigation, previous, options}) {
  console.log(navigation, 'navigation');
  const navigate = useNavigation();
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
      {!previous ? (
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      ) : null}
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="SUPER SALES" />
      {!previous ? <Appbar.Action icon="bell-ring-outline" /> : null}
      {!previous ? (
        <Appbar.Action
          icon="cart-outline"
          onPress={() => {
            navigate.navigate(NavCartPage);
          }}
        />
      ) : null}
      {previous ? (
        <Appbar.Action
          icon="cart-outline"
          onPress={() => {
            navigate.navigate(NavCartPage);
          }}
        />
      ) : null}
    </Appbar.Header>
  );
}

export default AppNavigation;
