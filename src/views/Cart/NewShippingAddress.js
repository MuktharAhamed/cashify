import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    NavCheckoutPage
} from 'app-constants/Navigations';
import {
    ScrollView,
    View,
    TouchableOpacity,
    Image,
    Text,
    CreateStyle,
    StyleSheet,
    FlatList,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartList from './CartList'
import {
    GraphqlAdminApi,
    GraphqlStoreFrontApi,

} from 'app-constants/GraphqlConstants';
import { } from "./";
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

import { useTheme } from '@react-navigation/native';
import style from 'app-views/Cart/style';
import ToggleIncrementButton from '../../components/ToggleIncrementButton'
// import { useState } from 'react/cjs/react.development';
import { color } from 'react-native-reanimated';
// import gql from 'graphql-tag';

import { Button, TextInput } from 'react-native-paper';


const NewShippingAddressUpdate = ({ navigation, route, scene }) => {


    const [address, setaddress] = useState({
        address1: "",
        address2: "",
        city: "",
        company: "",
        country: "",
        firstName: "",
        lastName: "",
        phone: "",
        province: "",
        zip: ""
    })
    // const [DefaultAddress, setDefaultAddress] = useState(null)

    const navigation1 = useNavigation();

    return (
        <>
            <View>
                <TextInput
                    label="Address 1"
                    value={address.address1}
                    onChangeText={text => setDefaultAddress(text)}
                    numberOfLines={1}
                />
                <TextInput
                    label="Address 2"
                    value={address.address2}
                    onChangeText={text => setDefaultAddress(text)}
                    numberOfLines={1}
                />
                <TextInput
                    label="City"
                    value={address.city}
                    onChangeText={text => setDefaultAddress(text)}
                    numberOfLines={1}
                />
                <TextInput
                    label="Company"
                    value={address.company}
                    onChangeText={text => setDefaultAddress(text)}
                    numberOfLines={1}
                />
                <TextInput
                    label="Country"
                    value={address.country}
                    onChangeText={text => setDefaultAddress(text)}
                    numberOfLines={1}
                />
                <TextInput
                    label="first Name"
                    value={address.firstName}
                    onChangeText={text => setDefaultAddress(text)}
                    numberOfLines={1}
                />
                <TextInput
                    label="last Name"
                    value={address.lastName}
                    onChangeText={text => setDefaultAddress(text)}
                    numberOfLines={1}
                />
                <TextInput
                    label="phone"
                    value={address.phone}
                    onChangeText={text => setDefaultAddress(text)}
                    numberOfLines={1}
                />
                <TextInput
                    label="zip"
                    value={address.zip}
                    onChangeText={text => setDefaultAddress(text)}
                    numberOfLines={1}
                />
                <Button mode="contained" onPress={() => {
                    route.params.setaddressArr((e) => [...e, { ...address, id: "NEW_ADDRESS" }])
                    route.params.setDefaultAddress(NEW_ADDRESS)
                    navigation.goBack()
                }}>
                    Add
                </Button>
            </View>
        </>
    );
};

export default NewShippingAddressUpdate;