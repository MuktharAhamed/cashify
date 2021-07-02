import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  CreateStyle,
  StyleSheet,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartList from './CartList'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  createHttpLink,
  makeVar
} from '@apollo/client';

import { useTheme } from '@react-navigation/native';
import style from 'app-views/Cart/style';
import ToggleIncrementButton from '../../components/ToggleIncrementButton'
import { useState } from 'react/cjs/react.development';
// import gql from 'graphql-tag';

const query = gql`
  query query {
    shop {
      name
      description
      products(first: 20) {
        edges {
          node {
            id
            title
            metafield(
              key: "related_products"
              namespace: "Products_metafields"
            ) {
              namespace
              value
            }
          }
        }
      }
    }
  }
`;

const productList = [
  {
    id: 0,
    text: 'Realme X 128 GB',
    grade: 'Grade D',
    source: require('app-assets/mob/mobile1.jpg'),
    price: '₹6,110',
  },
  {
    id: 1,
    text: 'Redmi Note 9Pro 8 GB/128 GB',
    grade: 'Grade C',
    source: require('app-assets/mob/mobile2.png'),
    price: '₹9,320',
  }];


const Cart = () => {

  return (
    <>
      <View style={{ backgroundColor: "#f8f6f6" }}>
        <FlatList
          data={productList}
          keyExtractor={item => item.id} //has to be unique
          renderItem={({ item, index }) =>
          <CartList item={item}
              index={index}
          />} //method to render the data in the way you want using styling u need
          horizontal={false}
        />
      </View>
    </>
  );
};

export default Cart;