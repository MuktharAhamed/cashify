import React from 'react';
import {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import style from 'app-views/Signup/style';
import { gql, useMutation } from '@apollo/client';
import { GraphqlAdminApi , GraphqlStoreFrontApi} from 'app-constants/GraphqlConstants';

const Signup = () => {
  const defaultState = {
    Value : '',
    IsValid : true,
    IsTouched : false,
}

const updateCustomer = gql`mutation customerUpdate($input: CustomerInput!) {
  customerUpdate(input: $input) {
    customer {
      id
    }
    userErrors {
      field
      message
    }
  }
}`;

const createCustomer = gql`mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
      email
      firstName
      lastName      
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`;

const [ signUpUser ] = useMutation(createCustomer);
const [updateUser] = useMutation(updateCustomer);
  const handlePasswordDefaultState = {
    newPassword : false,
    repeatNewPassword : false,
  };
  
  const [showpassword,setShowpassword] = useState(handlePasswordDefaultState);
  const [customerGST, setCustomerGST] = useState(defaultState);
  const [customerName, setCustomerName] = useState(defaultState);
  const [email, setEmail] = useState(defaultState);
  const [phoneno, setPhoneno] = useState(defaultState);
  const [password, setPassword] = useState(defaultState);
  const [repeatPassword, setRepeatPassword] = useState(defaultState);
  const [address, setAddress] = useState(defaultState);
  const [formValidity, setFormValidity] = useState(false);
  const handleGSTName = text => {
    console.log("text");
    console.log(text);
    // console.log(text.nativeEvent.text);
    var gstRegex = new RegExp('^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$');
    console.log(gstRegex.test(text));
    
    setCustomerGST({
      Value : text,
      IsValid : gstRegex.test(text) || text === 'No_G$t',
      IsTouched : true,
    });
    UpdateFormValidity();

  };

  const handleshowpassword = (isNewPassord) => {
      setShowpassword( prevState =>{
        return {
          newPassword : isNewPassord ? !prevState.newPassword : prevState.newPassword,
          repeatNewPassword : !isNewPassord ? !prevState.repeatNewPassword : prevState.repeatNewPassword,
        }
      }
    );
  }
  const handleName = text => {
    setCustomerName({
      Value : text,
      IsValid : text !== '',
      IsTouched : true,
    });
    UpdateFormValidity();

  };
  const handlesetemail = text => {
    var emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');
    setEmail({
      Value : text,
      IsValid : emailRegex.test(text),
      IsTouched : true,
    });
    UpdateFormValidity();

  };
  const handlesetphoneno = text => {
    console.log("Phone");
    console.log(text);
    setPhoneno({
      Value : text,
      IsValid : text !== '',
      IsTouched : true,
    });
    UpdateFormValidity();
  };
  // const handlesetgst = text => {
  //   setGst(text);
  // };

  const UpdateFormValidity = () =>
  {
    setFormValidity(
      (customerGST.IsValid && customerGST.IsTouched) && 
      (customerName.IsValid && customerName.IsTouched) && 
      (email.IsValid && email.IsTouched) && 
      (phoneno.IsValid && phoneno.IsTouched) && 
      (password.IsValid && password.IsTouched) &&
      (repeatPassword.IsValid && repeatPassword.IsTouched));
  }

  const handlesetaddress = text => {
    setAddress({
      Value : text,
      IsValid : true,
      IsTouched : true,
    });
  };

  const handlePassword = text => {
    setPassword({
      Value : text,
      IsValid : true,
      IsTouched : true,
    });
  };

  const handleRepeatPassword = text => {
    console.log("password");
    console.log(password);
    console.log(text);
    setRepeatPassword({
      Value : text,
      IsValid : password.Value === text,
      IsTouched : true,
    });
  };

  const handlesignup = async () => {
    console.log("formValidity");
    console.log(formValidity);
    if(!formValidity)
    {
      var graphqlVariables = {
        input :{
          email: email.Value,
          password: password.Value,
          firstName : customerName.Value,
          lastName : customerGST.Value,
          // phone : phoneno.Value,
        }
      };
      try
      {
      //   console.log("graphqlVariables");
      //   console.log(graphqlVariables);
      // var data = await signUpUser({
      //   variables : graphqlVariables,
      //   onCompleted: (res) => {
      //     console.log("res");
      //     console.log(res);
      //    },
      //   context: GraphqlStoreFrontApi,
      // },);
      var customerId = 'Z2lkOi8vc2hvcGlmeS9DdXN0b21lci81NDI3NTY4ODY5NTMy';
      var updateCustomer = {
        input : {
          id : customerId,
          phone : "9876123450",
        }
      }
      var response = await updateUser(
        {
          variables : updateCustomer,
          context : GraphqlAdminApi,
        }
      );
        console.log("response");
        console.log(response);
        console.log(response.data.customerUpdate.userErrors);
        console.log(response.data.customerUpdate.customer);
      }
      catch(ex)
      {
        console.log("ex");
        console.log(ex);
      }
    }
    // console.log('handlesignup');
    // console.log(data.data.customerCreate.customer);
    // if(data.data.customerCreate.customerUserErrors)  
    // {
    //   console.log(data.data.customerCreate.customerUserErrors);
    // }
    var customerId = 'Z2lkOi8vc2hvcGlmeS9DdXN0b21lci81NDI3NTY4ODY5NTMy';
      console.log("data.customerCreate.customerUserErrors");
    // data
  };
  return (
    <ScrollView
      style={[{...style.parentview, flex: 1}]}
      contentContainerStyle={{flexGrow: 1}}>
      {/* <View style={style.parentview}> */}
      <View style={style.boxview}>
        <Text style={style.text}>Signup</Text>
        <TextInput
          label="GST Number"
          Text={customerGST}
          mode="outlined"
          onChangeText={handleGSTName}
          style={style.textinput}
        />
        {!customerGST.IsValid && <Text>Please enter a valid GST</Text>}
        <TextInput
          label="Name"
          Text={customerName}
          mode="outlined"
          onChangeText={handleName}
          style={style.textinput}
        />
        {!customerName.IsValid && <Text>Please enter your name</Text>}
        <TextInput
          label="Email"
          Text={email}
          mode="outlined"
          onChangeText={handlesetemail}
          style={style.textinput}
        />
        {!email.IsValid && <Text>Please enter a valid email</Text>}
        <TextInput
          label="Phone Number"
          Text={phoneno}
          mode="outlined"
          onChangeText={handlesetphoneno}
          style={style.textinput}
        />
        {!phoneno.IsValid && <Text>Please enter your number</Text>}
        <TextInput
          label="Password"
          Text={password}
          mode="outlined"
          onChangeText={handlePassword}
          style={style.textinput}
          secureTextEntry={!showpassword.newPassword}
          right={
            <TextInput.Icon
              name={!showpassword.newPassword ? 'eye-off' : 'eye'}
              onPress={()=> {handleshowpassword(true)}}
            />
          }
        />

        <TextInput
          label="Repeat New Password"
          Text={repeatPassword}
          mode="outlined"
          onChangeText={handleRepeatPassword}
          style={style.textinput}
          secureTextEntry={!showpassword.repeatNewPassword}
          right={
            <TextInput.Icon
              name={!showpassword.repeatNewPassword ? 'eye-off' : 'eye'}
              onPress={()=> {handleshowpassword(false)}}
            />
          }
        />

        {!repeatPassword.IsValid && <Text>Passwords do not match</Text>}
        <TouchableOpacity  disabled={!formValidity}>
          <Button
            mode="outlined"
            onPress={handlesignup}
            style={style.signupbutton}>
            Signup
        </Button>
        </TouchableOpacity>
        
      </View>
      {/* </View> */}
    </ScrollView>
  );
};

export default Signup;
