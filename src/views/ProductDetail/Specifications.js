import styles from './style';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const Specifications = props => {
  // console.log('props.Specifications');
  // console.log(props.Specifications);

  return (
    props.Specifications != null &&
    props.Specifications.some(
      a => a.node.value != null && a.node.value != '',
    ) && (
      <>
        <Text style={styles.SpecsText}>Specifications</Text>
        <View style={styles.specificationmainview}>
          {props?.Specifications.map((e, i) => (
            <SpecificationBlock key={i} item={e} />
          ))}
        </View>
      </>
    )
  );
};

const SpecificationBlock = ({item}) => {
  return (
    item.node.value && (
      <View style={styles.specificationview}>
        <Text style={styles.specstitle}>
          <Text style={styles.bulletedIcon}>{'\u2022'} </Text>
          <Text>{item.node.key.replace('_', ' ').toUpperCase()}</Text>
          <Text>
            {' | '}
            {item.node.value.toUpperCase()}
          </Text>
        </Text>
      </View>
    )
  );
};

export default Specifications;
