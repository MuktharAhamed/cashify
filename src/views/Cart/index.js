import {NavSplashScreen,NavProductDetailPage, NavProductListingPage} from 'app-constants/Navigations';
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import { TextInput, ScrollView , View, TouchableOpacity, Image, Text,Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Catergories from 'app-views/Home/Categories';
import ByPrice from 'app-views/Home/ByPrice';
import ByGrade from 'app-views/Home/ByGrade';
import ByBrand from 'app-views/Home/ByBrand';
import TodaysDeals from 'app-views/Home/TodaysDeals';
import styles from 'app-views/Cart/style';
import style from 'app-views/Home/style';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import CartFooter from './cartFooter';

const screenWidth = Dimensions.get('window').width
const cartLineItems = [
    {
      id : 0,
      text: 'Realme X 128 GB',
      grade: 'Grade D',
      source: require('app-assets/mob/mobile1.jpg'),
      price: '₹6,110',
    },
    {
      id : 1,
      text: 'Redmi Note 9Pro 8 GB/128 GB',
      grade: 'Grade C',
      source: require('app-assets/mob/mobile2.png'),
      price: '₹9,320',
    },
    {
      id :2 ,
      text: 'Redmi Note 10 Pro 128 GB',
      grade: 'Grade D',
      source: require('app-assets/mob/mobile1.jpg'),
      price: '₹16,110',
    },      
];
// const [qtyValue, setQtyInputText] = useState([]);
// const increaseQtyHandler = () =>{
    
//     setQtyInputText(prevState =>{
//       var qty = parseInt(prevState);
//       qty +=1;
//      return  qty.toString()
//     });
//   }

// const quantityTextHandler = (e) => {
// setQtyInputText(e.replace(/[^0-9]/g, ''));
// }

// const decreaseQtyHandler = () =>{
// setQtyInputText(prevState =>{
//     var qty = parseInt(prevState);
//     qty -=1;
//     return  qty.toString()
// });
// }

const Cart = ({navigation}) => {

  return (
      <>
      <ScrollView style={{backgroundColor : "#F4F4F4"}}>
      <View style={styles.ProductListingContainer}>
        {
            cartLineItems.map((e,index)=> (
                <CartItem key={index} lineItem={e} />
            ))
        }
        <View style={styles.CartContainer}>
            <View style={styles.CouponSection}>
            <View style={{            
            flexDirection: "row",
            alignItems: "center"
        }}>
                   <Text><MaterialCommunityIcons style={styles.qtyInputIcons} name ="brightness-percent" size={25}/></Text>
                    <Text>Add Coupon code</Text>
            </View>
            </View>
            <View>
                <Text style={styles.ApplyCouponText}>Apply</Text>
            </View>
        </View>
        <View style={styles.CartTotalContainer}>
            <View style={{flex : 6,flexDirection : 'row',padding : 5}}>
                <Text style={styles.boldText}>Price Details</Text>
            </View>
            <View style={styles.totalBlock}>
                <View style={styles.totalTextBlock}>
                    <Text>price(22 items)</Text>
                </View>
                <View style={styles.totalPriceBlock}>
                    <Text>₹8,3200</Text>
                </View>
            </View>
            <View style={styles.totalBlock}>
                <View style={styles.totalTextBlock}>
                    <Text>Coupon Applied</Text>
                </View>
                <View style={styles.totalPriceBlock}>
                    <Text>₹8,320</Text>
                </View>
            </View>
            <View style={{...styles.totalBlock, borderTopWidth: 1,
        borderColor : '#F4F4F4',
        borderRadius : 1}}>
                <View style={styles.totalTextBlock}> 
                    <Text style={styles.boldText}>Total Amount</Text>
                </View>
                <View style={styles.totalPriceBlock}>
                    <Text style={styles.boldText}>₹8,3200</Text>
                </View>
            </View>
            {/* <View style={{...styles.CouponSection,margin:10}}>
                <Text style={styles.boldText}>Price Details</Text>
                <Text>price(22 items)</Text>
                <Text>Coupon Applied</Text>
                <Text style={styles.boldText}>Total Amount</Text>
            </View>
            <View style={{...styles.CouponSection,margin:10}}>
                <Text></Text>
                <Text>₹8,3200</Text>
                <Text>₹8,320</Text>
                <Text style={styles.boldText}>₹8,3200</Text>
            </View> */}
        </View>
        </View>
        <View style={styles.RefunPolicyContainer}>
            <Text style={styles.RefundText}>
                <Text>By clicking "Check Out" you agree to our </Text>
                <Text style={styles.RefundLink}>Refund {"&"} Return Policy</Text>
            </Text>
        </View>
      </ScrollView>
      <CartFooter />
     </>
      // <View style={styles.ProductsSection}>
      //         <ScrollView
      //         style={{
      //             marginBottom: 15,
      //             height: 195,
      //             alignSelf: 'flex-start',
      //         }}>
      //         {productList.map((e, index) => (
      //             <ProductBlock
      //             key={index}
      //             text={e.text}
      //             source={e.source}
      //             price={e.price}
      //             grade={e.grade}
      //             />
      //         ))}
      //         </ScrollView>
      // </View>
  );
};
const CartItem = ({lineItem}) => {
//   console.log("text");
//   console.log(item.text);
    return (
        <View style={styles.LineItemContainer}>
            <View style={styles.LineItemSection}>
                <View style={styles.LineItemInformation}>
                    <Text style={styles.productsTitle}>{lineItem.text}</Text>
                    <Text style={styles.gradeText}>{lineItem.grade}</Text>
                    <Text style={[{...styles.productsTitle,color: '#F08080'}]}>{lineItem.price}</Text>
                </View>
                <View style={styles.LineItemImage}>
                    <View>
                        <TouchableOpacity>
                            <Image  style={styles.productsImage} source={lineItem.source}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.InputContainer}>
                        <TouchableOpacity >
                        <Icon style={styles.qtyInputIcons} name ="remove" size={20}/>
                        </TouchableOpacity>
                        <TextInput 
                        underlineColorAndroid="transparent" 
                        keyboardType={'numeric'} 
                        style={{...styles.qtyInput}} 
                        // onChangeText={quantityTextHandler}
                        value = {'1'}
                        />
                        <TouchableOpacity >
                        <Icon style={styles.qtyInputIcons} name="add" size={20}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.RemoveSection}>
                <Text style={styles.RemoveText}>Remove</Text>
            </View>
        </View>
    );
};

export default Cart;
