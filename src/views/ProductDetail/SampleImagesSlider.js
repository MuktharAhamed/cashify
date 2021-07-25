import React, {useEffect} from 'react';
import {View, Dimensions, TouchableWithoutFeedback} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Slider from 'app-components/Slider/Slider';
const SampleImagesSlider = props => {
  useEffect(() => {
    var productImages = props.selectedGrade;
  }, []);
  const {width, height} = Dimensions.get('window');
  return (
    <Modal
      // animationIn="slideInUp"
      // animationOut="slideOutDown"
      animationInTiming={700}
      useNativeDriver={true}
      animationOutTiming={700}
      // backdropTransitionOutTiming={1}
      visible={props.showSampleProducts}
      swipeDirection="down"
      transparent
      // coverScreen={true}
      // backdropColor="black"
      onSwipeComplete={e => {
        props.closePopup();
      }}
      style={{
        backgroundColor: 'black',
        // flex: 1,
        // flexDirection: 'column',
        height: height,
        width: width,
        margin: 0,
        padding: 0,
        // height: '100%',
      }}
      // onBackdropPress={() => props.closePopup()}
      onRequestClose={() => {
        props.closePopup();
      }}
    >
      <View style={{flex: 1, flexDirection: 'column', marginHorizontal: 20}}>
        <View
          style={{
            marginTop: 10,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableWithoutFeedback onPress={() => props.closePopup()}>
            <FontAwesome
              // style={styles.iconStyle}
              name="close"
              color="#05375a"
              size={20}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={{flex: 3}}>
          <Slider
            data={[
              {
                image: require('../../assets/solids/solid1.jpg'),
              },
              {
                image: require('app-assets/solids/solid2.jpg'),
              },
            ]}
            timer={10000}
            imageKey={'image'}
            local={true}
            height={300}
            onPress={() => {}}
            width={Math.round(Dimensions.get('window').width)}
            separator={1}
            loop={false}
            autoscroll={false}
            indicator
            useNativeDriver={true}
            animation
          />
        </View>
      </View>
    </Modal>
  );
};

export default SampleImagesSlider;
