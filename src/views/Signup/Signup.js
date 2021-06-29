import React from 'react';
import {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, Text, ScrollView} from 'react-native';
import style from 'app-views/Signup/style';

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [secondname, setSecondname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [gst, setGst] = useState('');
  const [address, setAddress] = useState('');

  const handlesetfirstname = text => {
    setFirstname(text);
  };
  const handlesetsecondname = text => {
    setSecondname(text);
  };
  const handlesetemail = text => {
    setEmail(text);
  };
  const handlesetphoneno = text => {
    setPhoneno(text);
  };
  const handlesetgst = text => {
    setGst(text);
  };
  const handlesetaddress = text => {
    setAddress(text);
  };
  const handlesignup = () => {
    console.log('handlesignup');
  };
  return (
    <ScrollView
      style={[{...style.parentview, flex: 1}]}
      contentContainerStyle={{flexGrow: 1}}>
      {/* <View style={style.parentview}> */}
      <View style={style.boxview}>
        <Text style={style.text}>Signup</Text>
        <TextInput
          label="First Name"
          Text={firstname}
          mode="outlined"
          onChangeText={handlesetfirstname}
          style={style.textinput}
        />
        <TextInput
          label="Second Name"
          Text={secondname}
          mode="outlined"
          onChangeText={handlesetsecondname}
          style={style.textinput}
        />
        <TextInput
          label="Email"
          Text={email}
          mode="outlined"
          onChangeText={handlesetemail}
          style={style.textinput}
        />
        <TextInput
          label="Phone Number"
          Text={phoneno}
          mode="outlined"
          onChangeText={handlesetphoneno}
          style={style.textinput}
        />
        <TextInput
          label="GST"
          Text={gst}
          mode="outlined"
          onChangeText={handlesetgst}
          style={style.textinput}
        />
        <TextInput
          label="Address"
          Text={address}
          mode="outlined"
          onChangeText={handlesetaddress}
          style={style.textinput}
        />
        <Button
          mode="outlined"
          onPress={handlesignup}
          style={style.signupbutton}>
          Signup
        </Button>
      </View>
      {/* </View> */}
    </ScrollView>
  );
};

export default Signup;
