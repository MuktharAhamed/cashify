import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';

import {
  ApolloClient,
  InMemoryCache,
  gql,
  makeVar,
  useMutation
} from '@apollo/client';
import { checkoutLineItemsRemove, checkoutLineItemsUpdate } from "../../checkOut";

import { useTheme } from '@react-navigation/native';
import style from 'app-views/Cart/style';
import ToggleIncrementButton from '../../components/ToggleIncrementButton'
import { GraphqlStoreFrontApi } from 'app-constants/GraphqlConstants';
import { ActivityIndicator, Colors } from 'react-native-paper';
// import gql from 'graphql-tag';
export default CartList = ({ item, index, CheckoutId }) => {
  const [Quantity, setQuantity] = useState(0)
  const [removeLineItem, { removeloading, removedata }] = useMutation(checkoutLineItemsRemove)
  const [updateLineItem, { updateloading, updateData }] = useMutation(checkoutLineItemsUpdate)

  useEffect(() => {
    if (quantity != 0)
      if (Quantity != item.quantity) {
        setupdateItem([...item, { id: item.id, quantity: Quantity, variantId: item.variant.id, }])
        updateLineItem({ variables: { checkoutId: CheckoutId, lineItems: [{ id: item.id, quantity: Quantity, variantId: item.variant.id, }] }, context: GraphqlStoreFrontApi })
      }
  }, [Quantity])


  const deleteLineItem = () => {
    removeLineItem({ variables: { lineItemIds: item.id, checkoutId: CheckoutId }, context: GraphqlStoreFrontApi })
  }
  // const MyComponent = () => (

  // );

  return (

    <View style={{ ...style.productsContainer, position: "absolute" }}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', }}>
          <Text style={{ ...style.productsTitle, fontSize: 14 }}>{"You Have 19:18 minues to complete your order!"}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', }}>
          <View style={{ flexDirection: 'column', flex: 1, padding: 2, justifyContent: "space-around" }}>
            <Text style={{ ...style.productsTitle }}>{item.title}</Text>
            <View style={{ flexDirection: 'row', }}>
              <Text style={{ ...style.gradeText }}>{item.grade}</Text>
              <Text style={{ ...style.productsTitle, ...style.ProductDescription, flex: 4 }}>{"NA/ More Than 11 Months / None Available"}</Text>
            </View>
          </View>
          <View style={{ width: "30%" }}>
            <Image source={item.source} style={style.productsImage} />
          </View>
        </View>
        <View style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={[{ ...style.productsTitle, color: '#F08080' }]}>
              {item.price}
            </Text>
          </View>
          <View>
            <ToggleIncrementButton incrementLevel={item.quantityAvailable} decrementLevel={0} value={Quantity} setValue={(e) => { setQuantity(e) }} />
          </View>
        </View>
        <View>
          <TouchableHighlight onPress={() => deleteLineItem()}>Remove</TouchableHighlight>
        </View>
      </View>
      <View style={updateloading || removeloading ? style.viewActivityIndicator : style.hideActivityIndicator}>
        <ActivityIndicator animating={true} color={Colors.grey900} />
      </View>
    </View >
  );
};
