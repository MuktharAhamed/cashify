import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Text,
  TextInput,
  UIManager,
} from 'react-native';
const Specifications = props => {
  //   useEffect(() => {
  //     console.log('props');
  //     console.log(props);
  //     var abs = props.availableOptions.sort((a, b) => {
  //       return a.value - b.value;
  //     });
  //     console.log('abs');
  //     console.log(abs);
  //   }, []);
  return (
    <FlatList
      data={props.Specifications}
      keyExtractor={item => item.node.id}
      renderItem={({item, index}) => <SpecificationBlock item={item} />}
      horizontal={false}
      numColumns={2}
      //   scrollEnabled={false}
    />
  );
};

const SpecificationBlock = ({item}) => {
  return <View></View>;
};

export default Specifications;
