import {useNavigation} from '@react-navigation/core';
import {NavHome} from 'app-constants/Navigations';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // check if the user is logged in
    // if logged in then navigate to home
    // navigation.navigate(NavHome);
    // else to login page
    // navigation.navigate(NavLogin);
  }, []);

  return (
    <>
      <Text>SplashScreen</Text>
    </>
  );
};

export default SplashScreen;
