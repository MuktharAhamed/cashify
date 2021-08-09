import {ToastAndroid} from 'react-native';

const toast = ({text, duration, position, xaxis, yaxis}) => {
  ToastAndroid.showWithGravityAndOffset(
    text,
    duration ? duration : ToastAndroid.SHORT,
    position ? position : ToastAndroid.TOP,
    xaxis ? xaxis : -500,
    yaxis ? yaxis : 200,
  );
};

export default toast;
