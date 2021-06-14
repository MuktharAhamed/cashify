import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavHome, NavSplashScreen} from 'app-constants/Navigations';
import Home from 'app-views/Home/Home';
import SplashScreen from 'app-views/SplashScreen';
import {Appbar} from 'react-native-paper';
// import {
//   menu,
//   camera,
//   // mdiMagnify,
//   wordpress,
// } from 'react-native-vector-icons/FontAwesome';
// import {mdiMagnify} from '@mdi/js';
const Stack = createStackNavigator();

export const RootNavRef = React.createRef();

const AppNavigation = () => {
  return (
    <NavigationContainer ref={RootNavRef}>
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
  );
};

function CustomNavigationBar({navigation, previous}) {
  return (
    <Appbar.Header>
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
