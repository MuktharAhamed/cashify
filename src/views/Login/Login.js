import React from 'react';
import {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, Text} from 'react-native';
import style from 'app-views/Login/style';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showpassword, setShowpassword] = useState({
    password: true,
    icon: 'eye',
  });
  const [errormessage, setErrormessage] = useState(null);
  const handlesetusername = text => {
    setUsername(text);
  };
  const handlesetpassword = text => {
    setPassword(text);
  };
  const handleshowpassword = () => {
    setShowpassword({
      password: !showpassword.password,
      icon: showpassword.password ? 'eye-off' : 'eye',
    });
  };
  const handlelogin = () => {
    console.log('handlelogin', password);
    if (password.length > 8) {
      setErrormessage(null);
      console.log('login success');
    } else {
      setErrormessage(
        'please enter more than 8 characters for a stronger password!',
      );
    }
  };
  const handlesignup = () => {
    console.log('handlesignup');
  };
  return (
    <View style={style.parentview}>
      <View style={style.boxview}>
        <Text style={style.text}>Login</Text>
        <TextInput
          label="Username"
          Text={username}
          mode="outlined"
          onChangeText={handlesetusername}
          style={style.usertextinput}
        />
        <TextInput
          label="Password"
          Text={password}
          mode="outlined"
          secureTextEntry={showpassword.password}
          right={
            <TextInput.Icon
              name={showpassword.icon}
              onPress={handleshowpassword}
            />
          }
          onChangeText={text => handlesetpassword(text)}
          style={style.passwordtextinput}
        />
        {errormessage && <Text style={{color: 'red'}}>{errormessage}</Text>}
        <Button mode="outlined" onPress={handlelogin} style={style.loginbutton}>
          Login
        </Button>
        <View style={style.textview}>
          <Text>First Time Here? </Text>
          <Text onPress={handlesignup} style={style.signuptext}>
            Sign up.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
