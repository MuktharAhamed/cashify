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
const lists = [
  {text: 'Bulk mobiles', source: require('app-assets/mobilebunch.jpg')},
  {text: 'Single Mobile', source: require('app-assets/singlemobile.jpg')},
  {text: 'Featured Mobiles', source: require('app-assets/mobilebunch.jpg')},
  {text: 'Spare Parts', source: require('app-assets/mobilebunch.jpg')},
  {text: 'Accessories', source: require('app-assets/mobilebunch.jpg')},
];
const Catergories = () => {
  return (
    <ScrollView horizontal={true}>
      {lists.map((e, index) => (
        <Subelements key={index} text={e.text} source={e.source} />
      ))}
    </ScrollView>
  );
};

const Subelements = ({source, text}) => {
  return (
    <View style={style.view}>
      <TouchableOpacity>
        <Image source={source} style={{width: 100, height: 50}} />
      </TouchableOpacity>
      <Text style={style.text}>{text}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  view: {
    marginRight: 5,
    borderRadius: 15,
  },
});

export default Catergories;
