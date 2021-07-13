import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {
  Modal,
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
const AccordionOptions = props => {
  const changeSelected = option => {
    console.log('option');
    // console.log(option);
    props.availableOptions.forEach(x => (x.isSelected = false));
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.accordionRow}
        onPress={() => props.toggleExpand(props.title)}
      >
        <Text style={styles.accordionTitle}>{props.title}</Text>
        <Icon
          name={
            props.expandedState[props.title]
              ? 'keyboard-arrow-up'
              : 'keyboard-arrow-down'
          }
          size={30}
          color={'#A9A9A9'}
        />
      </TouchableOpacity>
      <View style={styles.accordionParentHr}>
        {props.expandedState[props.title] &&
          props.availableOptions.map((opt, i) => {
            return (
              <View key={i} style={styles.accordionChild}>
                <TouchableOpacity
                  onPress={() => {
                    changeSelected(opt);
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      borderColor: opt.isSelected ? '#0000CD' : '#fff',
                      ...styles.attributesContainer,
                      ...styles.boxShadw,
                    }}
                  >
                    <Text>{opt.value}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default AccordionOptions;
