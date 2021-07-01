import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import styles from 'app-views/ProductDetail/style';

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

const RelatedProducts = () => {
  return (
    <View style={styles.RelatedProductsSection}>
        <Text style={{...styles.InformationTitle, textDecorationLine:'none'}}>You might also like</Text>
            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
                // marginLeft: 15,
                marginBottom: 15,
                height: 195,
                alignSelf: 'flex-start',
            }}>
            {relateProductsList.map((e, index) => (
                <RelaetedProdctsBlock
                key={index}
                text={e.text}
                source={e.source}
                price={e.price}
                grade={e.grade}
                />
            ))}
            </ScrollView>
    </View>
  );
};

const RelaetedProdctsBlock = ({source, text, price, grade}) => {
    return (
      <View
        style={styles.relatedProductContainer}>
        <TouchableOpacity>
          <Image source={source} style={styles.relatedProductsImage} />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 5, 
            marginTop: 5,
          }}>
            <Text style={styles.gradeText}>{grade}</Text>
            <Text style={styles.relatedProductsTitle}>
                {text}
            </Text>
            <Text
                style={[{...styles.relatedProductsTitle,color: 'red',marginBottom:7}]}>
                {price}
            </Text>
        </View>
      </View>
    );
};

export default RelatedProducts;