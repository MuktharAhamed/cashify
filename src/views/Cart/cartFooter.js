import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Button} from 'react-native-paper';
import styles from 'app-views/Cart/style';

const CartFooter = () => {
    return(
        <View style={styles.StaticFooterContainer}>
            <View style={styles.StaticFooter}>
                <View style={{flex : 3}}>
                {/* <TouchableOpacity underlay style={{flex : 3}}> */}
                {/* <Button color='#1877F2' style={styles.addToCartButton}>₹8,3200</Button> */}
                    <Text style={styles.addToCartButton}>₹8,3200</Text>
                    </View>
                {/* </TouchableOpacity> */}
                <TouchableOpacity style={{flex : 3}}>
                <Button color='#ffff' style={styles.buyButton}>Checkout</Button>
                </TouchableOpacity>
            </View>
      </View>
    )
}
export default CartFooter;