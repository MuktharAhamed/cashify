import React, { useEffect } from 'react';
import { GraphqlAdminApi , GraphqlStoreFrontApi} from 'app-constants/GraphqlConstants'
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

} from "@apollo/client";


import { useTheme } from '@react-navigation/native';
import style from 'app-views/Home/style';
// import gql from 'graphql-tag';

const query = gql`
query getCustomer {
  customers(query: "lastName:No_G$t", first: 1) {
    edges {
      node {
        email
      }
    }
  }
}`;

const lists = [
  { source: require('app-assets/brands/realme.jpg') },
  { source: require('app-assets/brands/mi.jpg') },
  { source: require('app-assets/brands/oppo.jpg') },
  { source: require('app-assets/brands/vivo.jpg') },
  { source: require('app-assets/brands/samsung.jpg') },
];
const ByBrand = () => {

  const { loading, error, data } = useQuery(query,{
    context: GraphqlAdminApi
  });

  console.log("loading", loading);
  if (error) 
  {
    console.log("error.message", error);
  }
  console.log("data", data)


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
        }}>
        {lists.map((e, index) => (
          <Subelements key={index} source={e.source} />
        ))}
      </ScrollView>
    </>
  );
};

const Subelements = ({ source, text }) => {
  return (
    <View style={[{ ...style.boxview, width: 80, height: 60 }]}>
      <TouchableOpacity>
        <Image source={source} style={style.bybrandimage} />
      </TouchableOpacity>
    </View>
  );
};

export default ByBrand;
