import React, { useEffect } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';

import {
  ApolloClient,
  InMemoryCache,
  gql,
  makeVar
} from '@apollo/client';

import { useTheme } from '@react-navigation/native';
import style from 'app-views/Cart/style';
import ToggleIncrementButton from '../../components/ToggleIncrementButton'
import { useState } from 'react/cjs/react.development';
// import gql from 'graphql-tag';
export default CartList = ({ item, index }) => {
    const [Quantity, setQuantity] = useState(0)
   return (
 
     <View style={style.productsContainer}>
       <View
         style={{
           flex: 1,
           flexDirection: 'column',
         }}>
         <View
           style={{
             flex: 1,
             alignItems: 'flex-start',
             justifyContent: 'center',
           }}>
           <Text style={{ ...style.productsTitle, fontSize: 14 }}>{"You Have 19:18 minues to complete your order!"}</Text>
         </View>
         <View
           style={{
             flex: 1,
             flexDirection: 'row',
 
           }}
         >
           <View
             style={{
               flexDirection: 'column',
               flex: 1,
               padding: 2,
               // height:100,
               justifyContent: "space-around"
             }}>
             <Text style={{ ...style.productsTitle }}>{item.text}</Text>
             <View
               style={{
                 flexDirection: 'row',
               }}>
               <Text style={{ ...style.gradeText }}>{item.grade}</Text>
               <Text style={{ ...style.productsTitle, ...style.ProductDescription, flex: 4 }}>{"NA/ More Than 11 Months / None Available"}</Text>
             </View>
 
           </View>
           <View
             style={{
               width: "30%"
             }}>
             <Image source={item.source} style={style.productsImage} />
           </View>
         </View>
         <View
           style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }}>
           <View>
             <Text style={[{ ...style.productsTitle, color: '#F08080' }]}>
               {item.price}
             </Text>
           </View>
           <View>
             <ToggleIncrementButton 
              value={Quantity} setValue={(e) => { setQuantity(e) }} 
             />
           </View>
         </View>
 
       </View>
 
     </View>
   );
 };
 