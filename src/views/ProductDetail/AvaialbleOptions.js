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
const AvaialbleOptions = props => {
  useEffect(() => {
    console.log('props');
    console.log(props);
    var abs = props.availableOptions.sort((a, b) => {
      return a.value - b.value;
    });
    console.log('abs');
    console.log(abs);
  }, []);
  return (
    <View>
      <Text style={styles.accordionTitle}>{props.title}</Text>
      <View style={styles.accordionParentHr}>
        {props.availableOptions.map((opt, i) => {
          return (
            <View key={i} style={styles.accordionChild}>
              <TouchableOpacity
                onPress={() => {
                  props.changeVariant(props.optionKey, opt.value);
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
                  <Text>
                    {props.title == 'GRADE' ? 'Grade ' + opt.value : opt.value}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AvaialbleOptions;
