import React from 'react';
import AppNavigation from 'app-navigations/AppNavigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
  from
} from "@apollo/client";
import { typography } from 'app-utils/typography'

typography();
const httpLink = createHttpLink();

// const middlewareLink = setContext(() => ({
//   headers: {
//     'X-Shopify-Storefront-Access-Token': '2997ceea6da1a55b696ff76e19e287ba'
//   }
// }))

// const dynamicUri (uri) => {
//   return uri;
// }
const authMiddleware = new ApolloLink((operation, forward) => {
  const customHeaders = operation.getContext().hasOwnProperty("headers") ? operation.getContext().headers : {};
  const dynamicUri = operation.getContext().hasOwnProperty("uri") ? operation.getContext().uri : {};
  console.log(dynamicUri);
          console.log("dynamicUri");
  console.log("customHeaders");
  console.log(customHeaders);
  operation.setContext({
    uri : dynamicUri,
    headers: {
      ...customHeaders,
      // 'X-Shopify-Access-Token': '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',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      // "Content-Type": "application/json",
      //  Accept: 'application/json',
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <AppNavigation />
      </PaperProvider>
    </ApolloProvider>
  );
};
export const styles = StyleSheet.create({
  // ...DefaultTheme,
  // myOwnProperty: true,
  // dark: false,
  // roundness: 2,
  Button: {
    width: 12,
  },
});
export default App;
