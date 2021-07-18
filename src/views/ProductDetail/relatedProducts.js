import React from 'react';
import {ScrollView, View, TouchableOpacity, Image, Text} from 'react-native';
import styles from 'app-views/ProductDetail/style';
import {NavProductDetailPage} from 'app-constants/Navigations';
import {useNavigation} from '@react-navigation/native';

const relateProductsList = [
  {
    text: 'Realme X 128 GB',
    grade: 'Grade D',
    source: require('app-assets/mob/mobile1.jpg'),
    price: '₹6,110',
  },
  {
    text: 'Redmi Note 9Pro 8 GB/128 GB',
    grade: 'Grade C',
    source: require('app-assets/mob/mobile2.png'),
    price: '₹9,320',
  },
];

const RelatedProducts = props => {
  const navigation = useNavigation();
  const navigationHandler = (productId, variantId) => {
    console.log('navigationHandler');
    navigation.push(NavProductDetailPage, {
      ProductId: productId,
      VariantId: variantId,
    });
  };
  return (
    <View style={styles.RelatedProductsSection}>
      <Text style={{...styles.InformationTitle, textDecorationLine: 'none'}}>
        You might also like
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={
          {
            // marginLeft: 15,
            // marginBottom: 15,
            // width: '100%',
            // height: 260,
            // flex: 1,
            // flexDirection: 'column',
            // height: '100%',
            // alignSelf: 'flex-start',
          }
        }
      >
        {props.products.map((e, index) => (
          <RelaetedProdctsBlock
            key={index}
            text={[e.title, ' ', e.ram, ' / ', e.size].join('')}
            source={e.ImageUrl}
            price={'₹ ' + e.price}
            grade={'Grade ' + e.grade}
            productId={e.productId}
            variantId={e.variantId}
            navigator={navigationHandler}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const RelaetedProdctsBlock = ({
  source,
  text,
  price,
  grade,
  productId,
  variantId,
  navigator,
}) => {
  return (
    <View style={styles.relatedProductContainer}>
      <TouchableOpacity
        onPress={() => {
          navigator(productId, variantId);
        }}
      >
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {source != '' && (
            <Image
              source={{
                uri: source,
              }}
              style={styles.relatedProductsImage}
            />
          )}
          {source == '' && (
            <Image
              source={require('app-assets/no-image.jpg')}
              style={styles.relatedProductsImage}
            />
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginLeft: 5,
          marginTop: 5,
          // flex: 2,
          // flexDirection: 'row',
        }}
      >
        <Text style={styles.gradeText}>{grade}</Text>
        <Text style={styles.relatedProductsTitle}>{text}</Text>
        <Text
          style={[
            {...styles.relatedProductsTitle, color: '#B22222', marginBottom: 7},
          ]}
        >
          {price}
        </Text>
      </View>
    </View>
  );
};

export default RelatedProducts;
