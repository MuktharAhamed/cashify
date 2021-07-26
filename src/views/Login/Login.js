import {NavHome, NavForgotPassword, NavSignup} from 'app-constants/Navigations';
import store from '../../store/index';
import {setCustomer} from '../../action/index';
import React, {useEffect} from 'react';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from 'app-views/Login/style';
import {gql, useMutation, useLazyQuery, useQuery} from '@apollo/client';
import {
  GraphqlAdminApi,
  GraphqlStoreFrontApi,
} from 'app-constants/GraphqlConstants';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

const getAccessToken = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const getCustomer = gql`
  query getCustomer($input: String!) {
    customers(query: $input, first: 1) {
      edges {
        node {
          id
          metafields(first: 10) {
            edges {
              node {
                id
                key
                namespace
                value
              }
            }
          }
          email
        }
      }
    }
  }
`;

// const customerCreate = gql`
// mutation customerCreate($input: CustomerInput!) {
//   customerCreate(input: $input) {
//     customer {
//       id
//       email
//       firstName
//     }
//   }
// }`;
const Login = props => {
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
  //  const [ updateTodo ] = useMutation(customerCreate);
  const [
    getCustomerByQuery,
    {loading: customerLoading, error: CustomerError, data: customerData},
  ] = useLazyQuery(getCustomer, {
    fetchPolicy: 'network-only',
  });
  const navigation = useNavigation();
  // const [ refetch ] = useQuery(getCustomer, {skip : true});
  const [loading, setLoading] = useState(false);
  // const [userId, setUserId] = useState('');
  const [getCustomerAccessToken] = useMutation(getAccessToken);
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
  // const defaultState = {
  //   Value : '',
  //   IsValid : true,
  //   IsTouched : false,
  // };
  // const [formValidity, setFormValidity] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showpassword, setShowpassword] = useState(true);
  const [errormessage, setErrormessage] = useState('');
  const handlesetusername = text => {
    setUsername(text.replace(/[^0-9]/g, ''));
    setErrormessage('');
  };
  const handlesetpassword = text => {
    setPassword(text);
    setErrormessage('');
  };
  const handleshowpassword = () => {
    setShowpassword(prevState => {
      return !prevState;
    });
  };
  // var userName = `phone=${username}`
  const handlelogin = async () => {
    setLoading(true);
    if (username == '' && password == '') {
      setLoading(false);
      setErrormessage('Please enter your username and passwrod');
    } else if (username == '') {
      setLoading(false);
      setErrormessage('Please enter your username');
    } else if (password == '') {
      setLoading(false);
      setErrormessage('Please enter your password');
    } else {
      if (errormessage == '') {
        var getCustomerInp = {
          input: `phone:${username}`,
        };
        try {
          getCustomerByQuery({
            context: GraphqlAdminApi,
            variables: getCustomerInp,
            // fetchPolicy: 'no-cache',
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  useEffect(async () => {
    if (!customerLoading && customerData) {
      if (customerData?.customers?.edges?.length > 0) {
        var userEmail = customerData?.customers?.edges[0]?.node?.email;
        if (userEmail) {
          console.log('customerData?.customers?.edges[0]?.node?.id');
          console.log(
            customerData?.customers?.edges[0]?.node?.metafields.edges,
          );
          var favoriteMetaField =
            customerData?.customers?.edges[0]?.node?.metafields.edges.length > 0
              ? customerData?.customers?.edges[0]?.node?.metafields.edges.find(
                  x =>
                    x.node.namespace == 'favorite_products' &&
                    x.node.key == 'Favorites',
                )
              : null;
          console.log('favoriteMetaField?.node?.value');
          console.log(favoriteMetaField?.node?.value);

          // console.log(favoriteMetaField?.node);
          // var favItems = favoriteMetaField?.node
          //   ? favoriteMetaField?.node?.value
          //   : '';
          // console.log(favItems);
          // var favMetaId = favoriteMetaField?.node
          //   ? favoriteMetaField?.node?.id
          //   : '';
          // console.log(favMetaId);
          const userId = customerData?.customers?.edges[0]?.node?.id;
          var accessTokenInput = {
            input: {
              email: userEmail,
              password: password,
            },
          };
          var data = await getCustomerAccessToken({
            context: GraphqlStoreFrontApi,
            variables: accessTokenInput,
          });
          var accessToken = data.data;
          if (
            accessToken.customerAccessTokenCreate.customerUserErrors.length > 0
          ) {
            // var errorMessages =
            //   accessToken?.customerAccessTokenCreate?.customerUserErrors?.map(
            //     x => x.message,
            //   );
            setLoading(false);
            setErrormessage('Passwrod is incorrect');
          } else {
            setLoading(false);
            console.log('userId');
            console.log(userId);
            store.dispatch(
              setCustomer({
                customerAccessToken:
                  accessToken.customerAccessTokenCreate.customerAccessToken
                    .accessToken,
                customerMobile: username,
                customerId: userId,
                customerEmail: userEmail,
                favoriteItems: favoriteMetaField?.node
                  ? favoriteMetaField?.node?.value
                  : '',
                favoriteMetaFieldId: favoriteMetaField?.node
                  ? favoriteMetaField?.node?.id
                  : '',
                expiresAt:
                  accessToken.customerAccessTokenCreate.customerAccessToken
                    .expiresAt,
              }),
            );
            navigation.navigate(NavHome);
          }
        } else {
          setLoading(false);
          setErrormessage('Username is invalid');
        }
      } else {
        setLoading(false);
        setErrormessage('Username is invalid');
      }
    }
  }, [customerData, customerLoading]);

  const navigatToForgotPassword = () => {
    navigation.navigate(NavForgotPassword);
  };

  // useEffect(() => {
  //   if (!accessTokenLoading && accessToken) {
  //   }
  // }, [accessToken, accessTokenLoading]);
  // const handlesignup = () => {
  //   console.log('handlesignup');
  //   navigation.navigate(NavSignup);
  // };
  return (
    // <View style={style.parentview}>
    //   <View style={style.boxview}>
    //     <Text style={style.text}>Login</Text>
    //     <TextInput
    //       label="Username"
    //       Text={username}
    //       mode="outlined"
    //       onChangeText={handlesetusername}
    //       style={style.usertextinput}
    //     />
    //     <TextInput
    //       label="Password"
    //       Text={password}
    //       mode="outlined"
    //       secureTextEntry={showpassword.password}
    //       right={
    //         <TextInput.Icon
    //           name={showpassword.icon}
    //           onPress={handleshowpassword}
    //         />
    //       }
    //       onChangeText={text => handlesetpassword(text)}
    //       style={style.passwordtextinput}
    //     />
    //     <Text style={{color: 'red'}}>{errormessage}</Text>
    //     <Button mode="outlined" onPress={handlelogin} style={style.loginbutton}>
    //       Login
    //     </Button>
    //     <View style={style.textview}>
    //       <Text>First Time Here? </Text>
    //       <Text onPress={handlesignup} style={style.signuptext}>
    //         Sign up.
    //       </Text>
    //     </View>
    //   </View>
    // </View>

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
        duration={600}
      >
        {props?.route?.params?.isCustomerSignedUp && (
          <Text style={styles.LoginText}>
            Your account has been created. Please login to continue.
          </Text>
        )}
        {props?.route?.params?.isCustomerResetPassword && (
          <Text style={styles.LoginText}>
            Your password has been changed successfully. Please login to
            continue.
          </Text>
        )}
        {props?.route?.params?.isSessionExpired && (
          <Text style={styles.LoginText}>
            Your session has expired. Please login again to continue.
          </Text>
        )}
        <Text style={styles.text_footer}>Mobile Number</Text>
        <View style={styles.action}>
          <FontAwesome
            style={styles.iconStyle}
            name="user-o"
            color="#05375a"
            size={25}
          />
          <TextInput
            Text={username}
            maxLength={10}
            keyboardType={'numeric'}
            onChangeText={handlesetusername}
            style={styles.textInput}
            placeholder="Enter your Mobile Number"
            placeholderTextColor="#CDCDCD"
          />
        </View>
        <Text style={{...styles.text_footer, marginTop: 35}}>Password</Text>
        <View style={styles.action}>
          <Feather
            style={styles.iconStyle}
            name="lock"
            color="#05375a"
            size={25}
          />
          <TextInput
            Text={password}
            secureTextEntry={showpassword}
            placeholder="Enter your Password"
            placeholderTextColor="#CDCDCD"
            onChangeText={text => handlesetpassword(text)}
            style={styles.textInput}
          />
          <TouchableOpacity>
            <Feather
              style={styles.iconStyle}
              onPress={handleshowpassword}
              name={showpassword ? 'eye-off' : 'eye'}
              color="#CDCDCD"
              size={25}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text onPress={navigatToForgotPassword} style={styles.ForgotPassText}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{errormessage}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handlelogin}>
            <LinearGradient
              colors={['#5db8fe', '#39cff2']}
              style={styles.signIn}
            >
              <Text style={{...styles.textSignIn, color: 'white'}}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  'Sign In'
                )}
                {/* <ActivityIndicator size="small" color="#ffffff" /> */}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NavSignup);
            }}
            style={{
              ...styles.signIn,
              borderColor: '#4dc2f8',
              borderWidth: 1,
              marginTop: 15,
            }}
          >
            <Text style={{...styles.textSignIn, color: '#4dc2f8'}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Login;
