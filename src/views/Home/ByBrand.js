import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  CreateStyle,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import style from 'app-views/Home/style';

const lists = [
  {source: require('app-assets/brands/realme.jpg')},
  {source: require('app-assets/brands/mi.jpg')},
  {source: require('app-assets/brands/oppo.jpg')},
  {source: require('app-assets/brands/vivo.jpg')},
  {source: require('app-assets/brands/samsung.jpg')},
];
const ByBrand = () => {
  return (
    <>
      <View style={style.sectionview}>
        <Text style={style.sectionbar}>' '</Text>
        <Text style={style.sectiontext}>By Brand</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginBottom: 10,
          height: 90,
        }}>
        {lists.map((e, index) => (
          <Subelements key={index} source={e.source} />
        ))}
      </ScrollView>
    </>
  );
};

const Subelements = ({source, text}) => {
  return (
    <View style={[{...style.boxview, width: 80, height: 60}]}>
      <TouchableOpacity>
        <Image source={source} style={style.bybrandimage} />
      </TouchableOpacity>
    </View>
  );
};

export default ByBrand;
