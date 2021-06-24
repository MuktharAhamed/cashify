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
  {
    text: 'Realme X 128 GB',
    grade: 'Grade D',
    source: require('app-assets/mob/mobile1.jpg'),
    price: '₹6,110',
  },
  {
    text: 'Realme X 8 GB/128 GB',
    grade: 'Grade C',
    source: require('app-assets/mob/mobile2.png'),
    price: '₹9,320',
  },
];
const TodaysDeals = () => {
  return (
    <>
      <View style={style.sectionview}>
        <Text style={style.sectionbar}>' '</Text>
        <Text style={style.sectiontext}>Today's Deals</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          // marginLeft: 15,
          marginBottom: 15,
          height: 180,
          alignSelf: 'flex-start',
        }}>
        {lists.map((e, index) => (
          <Subelements
            key={index}
            text={e.text}
            source={e.source}
            price={e.price}
            grade={e.grade}
          />
        ))}
      </ScrollView>
    </>
  );
};

const Subelements = ({source, text, price, grade}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {...style.boxview, height: 170, width: 130, alignItems: 'flex-start'},
      ]}>
      <TouchableOpacity>
        <Image source={source} style={style.todaysimage} />
      </TouchableOpacity>
      <View
        style={{
          marginLeft: 5,
          marginTop: 5,
        }}>
        <Text style={style.todaystext}>{grade}</Text>
        <Text style={[{...style.categoriestext, textAlign: 'left'}]}>
          {text}
        </Text>
        <Text
          style={[{...style.categoriestext, textAlign: 'left', color: 'red'}]}>
          {price}
        </Text>
      </View>
    </View>
  );
};

export default TodaysDeals;
