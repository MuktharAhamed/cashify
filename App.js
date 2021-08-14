import React from 'react';
import AppNavigation from 'app-navigations/AppNavigation';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {StyleSheet, Text} from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
  from,
} from '@apollo/client';
import {typography} from 'app-utils/typography';
import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react/cjs/react.development';

typography();
const httpLink = createHttpLink();

const authMiddleware = new ApolloLink((operation, forward) => {
  const customHeaders = operation.getContext().hasOwnProperty('headers')
    ? operation.getContext().headers
    : {};
  const dynamicUri = operation.getContext().hasOwnProperty('uri')
    ? operation.getContext().uri
    : {};
  operation.setContext({
    uri: dynamicUri,
    headers: {
      ...customHeaders,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  });
  return forward(operation);
});
const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

const App = () => {
  // const [message, setMessage] = useState(null);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
      // remoteMessage && setMessage(remoteMessage);
    });

    const unsubscribe = messaging().onMessage(remoteMessage => {});

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // remoteMessage && setMessage(remoteMessage);
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });

    return unsubscribe;
  }, []);
  useEffect(() => {
    // messaging()
    //   .getToken()
    //   .then(token => {
    //     console.log('Device Token', token);
    //   });
    messaging()
      .subscribeToTopic('general')
      .then(() => {
        console.log('subscribed to general topic');
      });

    messaging().unsubscribeFromTopic('general');
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <PaperProvider>
          <AppNavigation />
        </PaperProvider>
      </ApolloProvider>
      {/* In app notfication UI */}
      {/* {Boolean(message) && <Text>{message.title}</Text>} */}
    </>
  );
};
export const styles = StyleSheet.create({
  // ...DefaultTheme,
  //  myOwnProperty: true,
  //  dark: false,
  // roundness: 2,
  Button: {
    width: 12,
  },
});
export default App;
