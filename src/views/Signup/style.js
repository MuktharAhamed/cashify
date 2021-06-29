import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  parentview: {
    flex: 1,
    // backgroundColor: 'lightgreen',
  },
  boxview: {
    width: '90%',
    alignSelf: 'center',
    height: 600,
    marginTop: 50,
    borderRadius: 5,
    shadowColor: '#000',
    padding: 30,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textinput: {
    marginBottom: 10,
    height: 50,
  },
  signupbutton: {
    // marginBottom: 10,
  },
});

export default style;
