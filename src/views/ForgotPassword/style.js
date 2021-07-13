import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05375a',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  errorView: {
    paddingTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text_header: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 16,
    marginTop: 5,
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  iconStyle: {
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
    // textAlign : 'center',
    // fontWeight :'bold',
    fontSize: 16,
    // backgroundColor : 'white',
    // height : 25,
  },
  //   loginbutton: {
  //     backgroundColor: 'black',
  //   },
  button: {
    alignItems: 'center',
    marginTop: 40,
  },
  resetPass: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textResetPass: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  //   LoginText: {
  //     color: 'red',
  //     // fontWeight: 'bold',
  //     marginVertical: 10,
  //   },
  //   ForgotPassText: {
  //     color: '#009bd1',
  //     marginTop: 15,
  //     fontSize: 16,
  //   },
});

export default styles;
