import React from 'react';
import {ScrollView, View, TouchableOpacity, Image, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import style from 'app-views/Home/style';

const lists = [
  {text: 'Bulk mobiles', source: require('app-assets/solids/solid1.jpg')},
  {text: 'Single Mobile', source: require('app-assets/solids/solid2.jpg')},
  {text: 'Featured Mobiles', source: require('app-assets/solids/solid3.jpg')},
  {text: 'Spare Parts', source: require('app-assets/solids/solid5.jpg')},
  {text: 'Accessories', source: require('app-assets/solids/solid6.jpg')},
];
const Catergories = () => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{marginBottom: 15}}>
      {lists.map((e, index) => (
        <Subelements key={index} text={e.text} source={e.source} />
      ))}
    </ScrollView>
  );
};

const Subelements = ({source, text}) => {
  const {colors} = useTheme();
  return (
    <View style={{marginRight: 15}}>
      <TouchableOpacity>
        <Image source={source} style={style.categoriesImage} />
      </TouchableOpacity>
      <Text style={style.categoriestext}>{text}</Text>
    </View>
  );
};

export default Catergories;
