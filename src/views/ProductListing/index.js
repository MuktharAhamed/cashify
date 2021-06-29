import {NavSplashScreen,NavProductDetailPage, NavProductListingPage} from 'app-constants/Navigations';
import Icon from "react-native-vector-icons/MaterialIcons";
import React from 'react';
import { FlatList, PixelRatio , View, TouchableOpacity, Image, Text,Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Catergories from 'app-views/Home/Categories';
import ByPrice from 'app-views/Home/ByPrice';
import ByGrade from 'app-views/Home/ByGrade';
import ByBrand from 'app-views/Home/ByBrand';
import TodaysDeals from 'app-views/Home/TodaysDeals';
import styles from 'app-views/ProductListing/style';
import style from 'app-views/Home/style';
import { black } from 'react-native-paper/lib/typescript/styles/colors';


const screenWidth = Dimensions.get('window').width
const productList = [
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
    {
      id : 3,
      text: 'Mi Note 10 Pro 8 GB/128 GB',
      grade: 'Grade C',
      source: require('app-assets/mob/mobile2.png'),
      price: '₹29,320',
    },
    {
      id : 4,
      text: 'Realme X 128 GB',
      grade: 'Grade D',
      source: require('app-assets/mob/mobile1.jpg'),
      price: '₹6,110',
    },
    {
      id : 5,
      text: 'Redmi Note 9Pro 8 GB/128 GB',
      grade: 'Grade C',
      source: require('app-assets/mob/mobile2.png'),
      price: '₹9,320',
    },
    {
      id :6,
      text: 'Redmi Note 10 Pro 128 GB',
      grade: 'Grade D',
      source: require('app-assets/mob/mobile1.jpg'),
      price: '₹16,110',
    },
    {
      id : 7,
      text: 'Mi Note 10 Pro 8 GB/128 GB',
      grade: 'Grade C',
      source: require('app-assets/mob/mobile2.png'),
      price: '₹29,320',
    },
    {
      id : 8,
      text: 'Realme X 128 GB',
      grade: 'Grade D',
      source: require('app-assets/mob/mobile1.jpg'),
      price: '₹6,110',
    },
    {
      id : 9,
      text: 'Redmi Note 9Pro 8 GB/128 GB',
      grade: 'Grade C',
      source: require('app-assets/mob/mobile2.png'),
      price: '₹9,320',
    },
    {
      id :10,
      text: 'Redmi Note 10 Pro 128 GB',
      grade: 'Grade D',
      source: require('app-assets/mob/mobile1.jpg'),
      price: '₹16,110',
    },
    {
      id : 11,
      text: 'Mi Note 10 Pro 8 GB/128 GB',
      grade: 'Grade C',
      source: require('app-assets/mob/mobile2.png'),
      price: '₹29,320',
    },
];
const ProductListing = ({navigation}) => {

  return (
      <View style={styles.ProductListingContainer}>
        <View style = {{borderTopWidth : 0.5, paddingTop : 6, paddingBottom : 4, flexDirection : 'row', margin : 5}}>
            <Text style={{marginHorizontal :1 ,fontWeight :'bold',color : 'black'}}> Filters : </Text>
            <Text style={{...styles.selectedFilter,paddingHorizontal : 10}}>Grade A</Text>
            <Text style={{marginHorizontal :1 ,paddingHorizontal : 10}}>Grade B</Text>
            <Text style={{marginHorizontal :1 ,paddingHorizontal : 10}}>Apple</Text>
            <Text style={{marginHorizontal :1 ,paddingHorizontal : 10}}>Samsung</Text>
            <Text style={{marginHorizontal :1,paddingHorizontal : 10}}>Redmi</Text>
        </View>
        <FlatList
            data={productList}
            keyExtractor={item => item.id}     //has to be unique   
            renderItem={ProductBlock} //method to render the data in the way you want using styling u need
            horizontal={false}
            numColumns={2}
          />
      </View>
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
const ProductBlock = ({item,index}) => {
  console.log("text");
  console.log(item.text);
    return (
      
      <View style={styles.productsContainer}>
        <View style={{
              flex : 1,
              flexDirection : 'row',
              marginVertical : 10,
            }}>
        <View style={{flex: 5,marginLeft: 5, 
              alignItems :'center',
              justifyContent : 'center',
              }}>
        <TouchableOpacity>
          <Image source={item.source} style={styles.productsImage} />
        </TouchableOpacity>
        </View>
        <View style={{flex: 1,paddingHorizontal : 5}}>
          <Icon name={'favorite-border'} size={30} color={'#D3D3D3'} />
        </View>
      </View>
          <View
            style={{
              marginLeft: 5, 
              marginTop: 5,
              flex: 1,
            }}>
              <View>
              <Text style={{...styles.productsTitle, height : 45}}>
                  {item.text}
              </Text>
              <Text style={styles.gradeText}>{item.grade}</Text>
              <Text
                  style={[{...styles.productsTitle,color: '#F08080'}]}>
                  {item.price}
              </Text>
              </View>
              <View style={{marginVertical : 15}}>
              <TouchableOpacity underlay style={{alignItems :'center',
              justifyContent : 'center', marginBottom :5}} >
                  <Text color='#1877F2' style={styles.addToCartButton}>Add to Cart</Text>
              </TouchableOpacity>
              </View>
          </View>
        </View>
    );
};

export default ProductListing;
