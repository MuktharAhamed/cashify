import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import style from 'app-views/Home/style';

const lists = [
  {
    text: 'Higher than ₹20,000',
    source: require('app-assets/solids/solid1.jpg'),
  },
  {
    text: '₹15,000 than ₹20,000',
    source: require('app-assets/solids/solid2.jpg'),
  },
  {
    text: '₹10,001 than ₹15,000',
    source: require('app-assets/solids/solid3.jpg'),
  },
  {
    text: '₹8,001 than ₹10,000',
    source: require('app-assets/solids/solid5.jpg'),
  },
  {text: '₹6,001 than ₹8,000', source: require('app-assets/solids/solid6.jpg')},
  {text: '₹4,001 than ₹6,000', source: require('app-assets/solids/solid6.jpg')},
  {text: '₹2,001 than ₹4,000', source: require('app-assets/solids/solid6.jpg')},
  {text: 'Less than ₹8,000', source: require('app-assets/solids/solid6.jpg')},
];
const ByPrice = () => {
  return (
    <>
      <View style={style.sectionview}>
        <Text style={style.sectionbar}>' '</Text>
        <Text style={style.sectiontext}>By Price</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginBottom: 15}}>
        {lists.map((e, index) => (
          <Subelements key={index} text={e.text} source={e.source} />
        ))}
      </ScrollView>
    </>
  );
};

const Subelements = ({source, text}) => {
  return (
    <View
      style={{
        marginRight: 20,
      }}>
      <TouchableOpacity>
        <ImageBackground source={source} style={style.imagebackground}>
          <Text style={[{...style.categoriestext, color: 'white'}]}>
            {text}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default ByPrice;
