import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    NavCheckoutPage,
    NavNewShippingAddress
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
import { connect } from 'react-redux';


import { useTheme } from '@react-navigation/native';
import style from 'app-views/Cart/style';
import ToggleIncrementButton from '../../components/ToggleIncrementButton'
// import { useState } from 'react/cjs/react.development';
import { color } from 'react-native-reanimated';
// import gql from 'graphql-tag';
import { Button } from 'react-native-paper';



const UpdateShippingAddress = ({ checkout, customer, }) => {
    const { error, loading, data: customerAddress } = useQuery(CustomerAddress, {
        context: GraphqlStoreFrontApi,
        variables: { input: customer.customerAccessToken }
    })
    const [updateShipping, { Shippingloading, ShippingData }] = useMutation(ShippingAddressUpdate)

    const [LineItems, setLineItems] = useState([])
    const [DefaultAddress, setDefaultAddress] = useState("")

    useEffect(() => {
        if (!loading && customerAddress) {
            if (customerAddress?.data?.customer?.addresses)
                setLineItems(customerAddress?.data?.customer?.addresses)
            if (customerAddress?.data?.customer?.defaultAddress)
                setDefaultAddress(customerAddress?.data?.customer?.defaultAddress)
        }
    }, [customerAddress, loading])

    const cnfmClick = () => {
        let address = LineItems.find((e) => e.id === DefaultAddress)
        let shippingAddress = {
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            company: address.company,
            country: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            province: address.province,
            zip: address.zip
        }
        updateShipping({
            variables: {
                shippingAddress,
                checkoutId: checkout.CheckoutId
            }
            , context: GraphqlStoreFrontApi
        })
        if (!loading)
            navigation.navigate(NavCheckoutPage)
    }

    const navigation = useNavigation();

    return (
        <>
            <Animatable.View
                style={styles.footer}
                animation="fadeInUpBig"
                duration={600}
            >
                <View style={{ backgroundColor: "#f8f6f9", flexDirection: "column" }}>
                    <Button
                        mode="contained"
                        onPress={() =>
                            navigation.navigate(NavNewShippingAddress, { setaddressArr: (e) => setLineItems(e), lineAddress: LineItems, setDefaultAddress: (e) => setDefaultAddress(e) })
                        }>
                        Add New
                    </Button>
                    <FlatList
                        data={LineItems}
                        keyExtractor={item => item.id} //has to be unique
                        renderItem={({ item, index }) =>
                            <TouchableHighlight>
                                <View>
                                    <RadioButton
                                        value="first"
                                        status={DefaultAddress === item.id ? 'checked' : 'unchecked'}
                                        onPress={() => setDefaultAddress(item.id)}
                                    />
                                    <Text numberOfLines={2}>{item.address1}</Text>
                                </View>
                            </TouchableHighlight>} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        renderEmptyListComponent={<Text>No data</Text>}
                    />
                </View>
                <Button mode="contained" onPress={() => { cnfmClick() }}>
                    Confirm shipping address
                </Button>
            </Animatable.View>
        </>
    );
};
function mapStateToProps(state) {
    return {
        checkout: state.checkout,
        customer: state.customer,
    };
}
export default ShippingAddressUpdatePage = connect(
    mapStateToProps,
)(UpdateShippingAddress);

