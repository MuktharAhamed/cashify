import React, { useEffect, useState } from 'react';
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
import { color } from 'react-native-reanimated';
import { ShippingAddress } from "./shippingAddress";
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


// const productList = ProductsData?.data?.shop?.products?.edges



const Cart = (props) => {
  const { error, loading, data: LastCheckout } = useQuery(lastIncompleteCheckout, {
    context: GraphqlStoreFrontApi,
    variables: { input: props.customer.customerAccessToken }
  })
  const [LineItems, setLineItems] = useState({})
  const navigation = useNavigation();
  const [updateItem, setupdateItem] = useState([])
  const [deleteItem, setdeleteItem] = useState([])

  useEffect(() => {
    if (!loading && LastCheckout) {
      if (LastCheckout?.data?.customer?.lastIncompleteCheckout)
        setLineItems(LastCheckout?.data?.customer?.lastIncompleteCheckout.lineItems)
    }
  }, [LastCheckout, loading])

  return (
    <>

      <View style={{ backgroundColor: "#f8f6f6", flexDirection: "column" }}>
        <FlatList
          data={LineItems}
          keyExtractor={item => item.id} //has to be unique
          renderItem={({ item, index }) =>
            <CartList item={item}
              index={index}
              CheckoutId={LastCheckout?.data?.customer?.lastIncompleteCheckout.id}
              lineItemsUpdate={updateItem}
              lineItemDelete={deleteItem}
              setupdateItem={(e) => { setupdateItem(e) }}
              setdeleteItem={(e) => { setdeleteItem(e) }}

            />} //method to render the data in the way you want using styling u need
          horizontal={false}
          renderEmptyListComponent={<Text>No data</Text>}

        />
        <View style={{ ...style.productsContainer, flexDirection: "row", justifyContent: "space-between", height: 55 }}>
          <View style={{ flexDirection: "row", }}>
            <Icon name={'card-giftcard'} size={28} color={'green'} style={{ paddingLeft: 10, alignSelf: "center" }} />
            <Text style={{ fontSize: 18, paddingLeft: 10, alignSelf: "center" }}>Add Coupen Code</Text>
          </View>
          <TouchableOpacity style={{ height: 55, top: 5 }}>
            <Text style={{ fontSize: 16, paddingRight: 20, alignSelf: "center", color: "green" }}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.StaticFooterContainer}>
          <View style={styles.StaticFooter}>
            <View style={{ flex: 3 }}>
              <Text style={styles.addToCartButton}>₹8,3200</Text>
            </View>
            <TouchableOpacity style={{ flex: 3 }}>
              <Button color='#ffff' style={styles.buyButton}>checkout</Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Cart;