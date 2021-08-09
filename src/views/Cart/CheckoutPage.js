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
  GraphqlAdminApi,
  GraphqlStoreFrontApi,

} from 'app-constants/GraphqlConstants';
import { useNavigation } from '@react-navigation/native';
import { CustomerAddress, ShippingAddressUpdate, lastIncompleteCheckout, checkoutLineItemsRemove, checkoutLineItemsUpdate, TokenizedPayV3 } from "../../checkOut";
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
import {
  NavShippingAddress
} from 'app-constants/Navigations';

import { useTheme } from '@react-navigation/native';
import style from 'app-views/Cart/style';
import ToggleIncrementButton from '../../components/ToggleIncrementButton'
import { useState } from 'react/cjs/react.development';
import { color } from 'react-native-reanimated';
import { ShippingAddress } from "./shippingAddress";

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
const CheckoutPage = (props) => {
  const { error, loading, data: LastCheckout } = useQuery(lastIncompleteCheckout, {
    context: GraphqlStoreFrontApi,
    variables: { input: props.customer.customerAccessToken }
  })
  const [LineItems, setLineItems] = useState({})
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading && LastCheckout) {
      if (LastCheckout?.data?.customer?.lastIncompleteCheckout)
        setLineItems(LastCheckout?.data?.customer?.lastIncompleteCheckout)
    }
  }, [LastCheckout, loading])

  return (
    <>
      <View style={{ backgroundColor: "#f8f6f6", flexDirection: "column" }}>
        <View style={{ backgroundColor: "#f8f6f6", flexDirection: "column" }}>
          <View style={{ padding: 5 }} >
            <Text>
              Price Details
            </Text>
          </View>
          <View style={{ backgroundColor: "#f8f6f6", flexDirection: "column" }}>
            <View style={{ backgroundColor: "#f8f6f6", flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
              <Text>price</Text>
              <Text>amount</Text>
            </View>
            <View style={{ backgroundColor: "#f8f6f6", flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
              <Text>TCS@</Text>
              <Text>amount</Text>
            </View>
          </View>
          <View style={{ backgroundColor: "#f8f6f6", flexDirection: "row", justifyContent: "space-between", padding: 5 }}>
            <Text>
              Amount To Be Paid
            </Text>
          </View>
        </View>
        <FlatList
          data={LineItems}
          keyExtractor={item => item.id} //has to be unique
          renderItem={({ item, index }) =>
            <CartList item={item}
              index={index}
            />} //method to render the data  in the way you want using styling u need
          horizontal={false}
          renderEmptyListComponent={<Text>No data</Text>}
        />
        <View style={styles.StaticFooterContainer}>
          <View style={styles.StaticFooter}>
            <View style={{ flex: 3 }}>
              {/* <TouchableOpacity underlay style={{flex : 3}}> */}
              {/* <Button color='#1877F2' style={styles.addToCartButton}>₹8,3200</Button> */}
              <Text style={styles.addToCartButton}>₹8,3200</Text>
            </View>
            {/* </TouchableOpacity> */}
            <TouchableOpacity style={{ flex: 3 }}>
              <Button color='#ffff' style={styles.buyButton}>Pay Now</Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default CheckoutPage;