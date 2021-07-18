import React, {useState, useEffect} from 'react';
import {Modal, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import styles from 'app-views/ProductDetail/style';
import {View} from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AvaialbleOptions from './AccordionOptions';
const ProductZoom = props => {
  return (
    <Modal
      animationType="slide"
      visible={props.zoomProductImage}
      swipeDirection="down"
      onSwipeComplete={e => {
        props.zoomImageHandler(false);
      }}
      style={{
        flex: 1,
        flexDirection: 'column',
      }}
      onRequestClose={() => {
        props.zoomImageHandler(false);
      }}
    >
      <View style={{flex: 1, flexDirection: 'column', marginHorizontal: 20}}>
        <View
          style={{
            marginTop: 10,
            // flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => props.zoomImageHandler(false)}
          >
            <FontAwesome
              // style={styles.iconStyle}
              name="close"
              color="#05375a"
              size={20}
            />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            onSwipeDown={e => {
              props.zoomImageHandler(false);
            }}
            enableSwipeDown={true}
            swipeDownThreshold={100}
            pinchToZoom={true}
            imageWidth={200}
            imageHeight={200}
          >
            {props.ImageUrl != '' && (
              <Image
                style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                source={{
                  uri: props.ImageUrl,
                }}
              />
            )}
          </ImageZoom>
        </View>
      </View>
    </Modal>
  );
};

export default ProductZoom;
