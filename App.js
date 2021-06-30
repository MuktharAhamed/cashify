import React from 'react';
import AppNavigation from 'app-navigations/AppNavigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  ApolloLink,
  createHttpLink,
  from
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { typography } from 'app-utils/typography'

typography();
const httpLink = createHttpLink({ uri: 'https://dvnikhilraj.myshopify.com/api/graphql' })

// const middlewareLink = setContext(() => ({
//   headers: {
//     'X-Shopify-Storefront-Access-Token': '2997ceea6da1a55b696ff76e19e287ba'
//   }
// }))
const authMiddleware = new ApolloLink((operation, forward) => {
  const customHeaders = operation.getContext().hasOwnProperty("headers") ? operation.getContext().headers : {};
  console.log("customHeaders");
  console.log(customHeaders);
  operation.setContext({
    headers: {
      ...customHeaders
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
