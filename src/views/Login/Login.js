import React ,{useEffect} from 'react';
import {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {View, Text} from 'react-native';
import style from 'app-views/Login/style';
import { gql, useMutation,useLazyQuery } from '@apollo/client';
// import axios from 'axios'
// import { useEffect } from 'react/cjs/react.production.min';
// import PropTypes from 'app-utils/graphqlTypes';
import { GraphqlAdminApi , GraphqlStoreFrontApi} from 'app-constants/GraphqlConstants'


// const propTypes = {
//   customerCreate: PropTypes.func.isRequired,
//   customerAccessTokenCreate: PropTypes.func.isRequired,
// }

const getCustomer = gql`
query getCustomer($input: String!) {
  customers(query: $input, first: 1) {
    edges {
      node {
        email
      }
    }
  }
}`;

const customerCreate = gql`
mutation customerCreate($input: CustomerInput!) {
  customerCreate(input: $input) {
    customer {
      id
      email
      firstName
    }   
  }
}`;
const Login = () => {
  // const [ updateTodo ] = useMutation(gql`
  // mutation MyMutation($input: CustomerInput = {firstName:"GraphqlNikhil",email:"GraphqlNikhil@gmail.com"}) {
  //   customerCreate(input: $input) {
  //     customer {
  //       id
  //       firstName
  //       email
  //     }
  //   }
  // }
  // `);
 const [ updateTodo ] = useMutation(customerCreate);
 const [ getCustomerByQuery ,  { loading, data }] = useLazyQuery(getCustomer);
//  const [customerLogin] = useMutation(getCustomer);
  // useEffect(async () => {
  //   updateTodo({ 
  //     variables: { 
  //         input : { 
  //         "email": "user@example.com",
  //         "password": "HiZqFuDvDdQ7" 
  //       } 
  //     },

  // });
  // }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showpassword, setShowpassword] = useState({
    password: true,
    icon: 'eye',
  });

  // const headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'Content-Type': 'application/json'
  // }

  // const shopifyHeaders = {
  //   ...headers,
  //   Accept: 'application/json',
  //   'X-Shopify-Access-Token': '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',
  // }

  // const preparePayload = (query, inp) => {
  //   return {
  //     query,
  //     variables: inp
  //   }
  // }

  // const payload = preparePayload(customerCreate, {
  //   CustomerInput: {
  //     email:" data.email@gmail.com",
  //     // password: "data.password",
  //     firstName: "data firstName",
  //     // lastName: "data lastName"
  //   }
  // })
  
  // useEffect(async () => {
  
    // updateTodo({ 
    //   variables: { 
    //     input : { 
    //            email: "use2523r@example.com",
    //            firstName: "androidrQ7",
    //          }  
    //   },
    //   onCompleted: ({ updateTodo }) => {
    //    console.log(updateTodo);
    //   },
    //   context: GraphqlAdminApi,
    //   onError(err) {
    //     console.log("err");
    //     console.log(err);
    // },
    //  });
  // }, []);
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
  const handlelogin = async () => {
    var getCustomerInp = {
       input :"lastName:No_G$t",
    }
    try{
      var customerEmail =  getCustomerByQuery({
        context: GraphqlAdminApi,
        variables : getCustomerInp,
      });
    }
    catch (e)
    {
      console.log(e);
    }
    // const { loading, error, customerEmail } = useLazyQuery (getCustomer,{

    //   context: GraphqlStoreFrontApi,
    //   variables : getCustomerInp,
    // });
    console.log("customerEmail");
    console.log(customerEmail);
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
  useEffect(() => {

    console.log(data, loading);
    console.log("userEmail");
    if(data)
    {
      var email = data?.customers?.edges[0]?.node?.email;
      // console.log("email");
      console.log(email);

    }
   
  }, [data, loading])
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
        <Text style={{color: 'red'}}>{errormessage}</Text>
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
