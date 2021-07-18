import React from 'react';
import {TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';

export default ChildItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height,
}) => {
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => onPress(index)}
    >
      <Image
        style={[styles.image, style, {height: height}]}
        source={local ? item[imageKey] : {uri: item[imageKey]}}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
});
