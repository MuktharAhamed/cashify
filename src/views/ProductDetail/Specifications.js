import styles from './style';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const Specifications = props => {
  console.log('Specifications', props.Specifications);
  return (
    <View style={styles.specificationmainview}>
      {props?.Specifications.map(e => (
        <SpecificationBlock item={e} />
      ))}
    </View>
  );
};

const SpecificationBlock = ({item}) => {
  console.log('Specificationsitem', item);
  return (
    <View style={styles.specificationview}>
      <Text>
        {item.node.key}:{item.node.value}
      </Text>
    </View>
  );
};

export default Specifications;
