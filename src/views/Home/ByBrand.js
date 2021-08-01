import React, {useEffect} from 'react';

import {
  GraphqlAdminApi,
  GraphqlStoreFrontApi,
} from 'app-constants/GraphqlConstants';

import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  CreateStyle,
  StyleSheet,
} from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  createHttpLink,
} from '@apollo/client';
import {NavProductListingPage} from 'app-constants/Navigations';
import style from 'app-views/Home/style';
import {useNavigation} from '@react-navigation/native';
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

const lists = [
  {source: require('app-assets/brands/realme.jpg'), text: 'realme'},
  {source: require('app-assets/brands/mi.jpg'), text: 'mi'},
  {source: require('app-assets/brands/oppo.jpg'), text: 'oppo'},
  {source: require('app-assets/brands/vivo.jpg'), text: 'vivo'},
  {source: require('app-assets/brands/samsung.jpg'), text: 'samsung'},
  {source: require('app-assets/brands/samsung.jpg'), text: 'apple'},
];
const ByBrand = () => {
  const {loading, error, data} = useQuery(query, {
    context: GraphqlStoreFrontApi,
  });

  console.log('loading', loading);
  if (error) {
    console.log('error.message', error);
  }
  // console.log('data', data);

  return (
    <>
      <View style={style.sectionview}>
        <Text style={style.sectionbar}>' '</Text>
        <Text style={style.sectiontext}>By Brand</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginBottom: 10,
          height: 90,
        }}
      >
        {lists.map((e, index) => (
          <Subelements key={index} source={e.source} text={e.text} />
        ))}
      </ScrollView>
    </>
  );
};

const Subelements = ({source, text}) => {
  const navigation = useNavigation();
  const navtoProductListing = text => {
    navigation.navigate(NavProductListingPage, {
      text,
      from: 'Brand',
    });
  };
  return (
    <View style={[{...style.boxview, width: 80, height: 60}]}>
      <TouchableOpacity onPress={() => navtoProductListing(text)}>
        <Image source={source} style={style.bybrandimage} />
      </TouchableOpacity>
    </View>
  );
};

export default ByBrand;
