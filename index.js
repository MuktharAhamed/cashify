/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';

// Registering Message backaground listener handler
messaging().setBackgroundMessageHandler(message => {
  // just registering the handler for background messages
});

AppRegistry.registerComponent(appName, () => App);
