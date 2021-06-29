import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  parentview: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  boxview: {
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center',
    height: 330,
    marginTop: 140,
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
  usertextinput: {
    marginBottom: 10,
    height: 50,
  },
  passwordtextinput: {
    marginBottom: 5,
    borderRadius: 5,
    height: 50,
  },
  loginbutton: {
    marginBottom: 10,
  },
  textview: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  signuptext: {
    color: 'blue',
  },
});

export default style;
