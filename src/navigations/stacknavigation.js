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
import Home from 'app-views/Home/Home';
import SplashScreen from 'app-views/SplashScreen';
import ForgotPassword from 'app-views/ForgotPassword';
import ProductDetail from 'app-views/ProductDetail';
import ProductListing from 'app-views/ProductListing';
import Favorites from 'app-views/Favorites';
import BulkListing from 'app-views/BulkListing';
import BulkDetails from 'app-views/BulkDetail';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from 'app-views/Login/Login';
import Signup from 'app-views/Signup/Signup';
import Cart from 'app-views/Cart/MyCheckList';
import ShippingAddressUpdate from 'app-views/Cart/shippingAddress';
import {useNavigation} from '@react-navigation/native';
const Stack = createStackNavigator();
import {Appbar} from 'react-native-paper';

const Stacknavigations = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavHome}
      screenOptions={{
        headerShown: false,
        // header: props => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name={NavHome}
        component={Home}
        options={{title: NavHome}}
      />
      <Stack.Screen
        name={NavSplashScreen}
        component={SplashScreen}
        options={{title: NavSplashScreen}}
      />
      <Stack.Screen
        name={NavProductDetailPage}
        component={ProductDetail}
        options={{title: NavProductDetailPage}}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name={NavLogin}
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={NavSignup}
        component={Signup}
      /> */}
      {/* <Stack.Screen
        options={{headerShown: false}}
        name={NavForgotPassword}
        component={ForgotPassword}
      /> */}
      <Stack.Screen
        name={NavProductListingPage}
        component={ProductListing}
        options={{title: 'Super Sales'}}
      />
      <Stack.Screen
        name={NavCartPage}
        component={Cart}
        options={{title: 'My Cart'}}
      />
      <Stack.Screen
        name={NavFavorites}
        component={Favorites}
        options={{title: NavFavorites}}
      />
      <Stack.Screen name={NavBulkListing} component={BulkListing} />
      <Stack.Screen name={NavBulkDetail} component={BulkDetails} />

      <Stack.Screen
        name={NavShippingAddress}
        component={ShippingAddressUpdate}
        options={{title: 'My Cart'}}
      />
      <Stack.Screen
        name={NavCheckoutPage}
        component={ShippingAddressUpdate}
        options={{title: 'My Cart'}}
      />
      {/* </> */}
      {/* // </Stack.Navigator> */}
    </Stack.Navigator>
  );
};

// function CustomNavigationBar({navigation, previous, options}) {
//   // console.log('cprops', props);
//   // console.log('previous', previous);
//   // console.log('scene', scene);

//   const navigate = useNavigation();
//   return (
//     <Appbar.Header
//       style={{
//         backgroundColor: 'white',
//         // borderWidth: 0,
//         // shadowColor: 'white',
//         // borderBottomColor: 'transparent',
//         // borderTopColor: 'transparent',
//         // borderTopWidth: 0, //works
//         // borderBottomWidth: 0, //works
//         elevation: 0,
//       }}
//     >
//       {!previous ? <Appbar.Action icon="menu" /> : null}
//       {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
//       <Appbar.Content title={options.title} />
//       {!previous ? <Appbar.Action icon="bell-ring-outline" /> : null}
//       {!previous ? (
//         <Appbar.Action
//           icon="cart-outline"
//           onPress={() => {
//             navigate.navigate(NavCartPage);
//           }}
//         />
//       ) : null}
//       {previous ? (
//         <Appbar.Action
//           icon="cart-outline"
//           onPress={() => {
//             navigate.navigate(NavCartPage);
//           }}
//         />
//       ) : null}
//     </Appbar.Header>
//   );
// }
export default Stacknavigations;
