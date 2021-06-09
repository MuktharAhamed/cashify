import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavHome} from 'app-constants/Navigations';
// import Home from 'app-views/Home/Home';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name={NavHome} component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
