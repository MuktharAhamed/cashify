import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {gql, useMutation, useLazyQuery} from '@apollo/client';
import {
  GraphqlAdminApi,
  GraphqlStoreFrontApi,
} from 'app-constants/GraphqlConstants';
import styles from 'app-views/Login/style';
import {NavLogin} from 'app-constants/Navigations';

const Signup = props => {
  const defaultState = {
    Value: '',
    IsValid: true,
    IsTouched: false,
  };

  const updateCustomer = gql`
    mutation customerUpdate($input: CustomerInput!) {
      customerUpdate(input: $input) {
        customer {
          id
        }
        userErrors {
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
            email
          }
        }
      }
    }
  `;

  const createCustomer = gql`
    mutation customerCreate($input: CustomerCreateInput!) {
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
    }
  `;

  const [signUpUser] = useMutation(createCustomer);
  const [updateUser] = useMutation(updateCustomer);
  const [
    getCustomerByQuery,
    {loading: customerLoading, error: CustomerError, data: customerData},
  ] = useLazyQuery(getCustomer, {
    fetchPolicy: 'network-only',
  });

  const handlePasswordDefaultState = {
    newPassword: false,
    repeatNewPassword: false,
  };
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrormessage] = useState('');
  const [showpassword, setShowpassword] = useState(handlePasswordDefaultState);
  const [customerGST, setCustomerGST] = useState(defaultState);
  const [customerName, setCustomerName] = useState(defaultState);
  const [existingMobileNumber, setExistingMobileNumber] = useState(false);
  const [email, setEmail] = useState(defaultState);
  const [phoneno, setPhoneno] = useState(defaultState);
  const [password, setPassword] = useState(defaultState);
  const [repeatPassword, setRepeatPassword] = useState(defaultState);
  const [address, setAddress] = useState(defaultState);
  const [formValidity, setFormValidity] = useState(false);

  const ValidateGST = () => {
    var gstRegex = new RegExp(
      '^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$',
    );

    setCustomerGST({
      Value: customerGST.Value,
      IsValid:
        gstRegex.test(customerGST.Value) || customerGST.Value === 'No_G$t',
      IsTouched: true,
    });
    UpdateFormValidity();
  };
  const ValidateEmail = () => {
    var emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
    );
    setEmail({
      Value: email.Value,
      IsValid: emailRegex.test(email.Value),
      IsTouched: true,
    });
    UpdateFormValidity();
  };

  const handleGSTName = text => {
    setCustomerGST({
      Value: text,
      IsValid: true,
      IsTouched: true,
    });
    UpdateFormValidity();
  };

  const handleshowpassword = isNewPassord => {
    setShowpassword(prevState => {
      return {
        newPassword: isNewPassord
          ? !prevState.newPassword
          : prevState.newPassword,
        repeatNewPassword: !isNewPassord
          ? !prevState.repeatNewPassword
          : prevState.repeatNewPassword,
      };
    });
  };
  const handleName = text => {
    setCustomerName({
      Value: text,
      IsValid: text !== '',
      IsTouched: true,
    });
    UpdateFormValidity();
  };
  const handlesetemail = text => {
    setEmail({
      Value: text,
      IsValid: true,
      IsTouched: true,
    });
    UpdateFormValidity();
  };
  const handlesetphoneno = text => {
    setPhoneno({
      Value: text,
      IsValid: text !== '',
      IsTouched: true,
    });
    UpdateFormValidity();
  };
  // const handlesetgst = text => {
  //   setGst(text);
  // };

  const UpdateFormValidity = () => {
    // console.log('Updat Form Validity');
    // console.log(customerGST.IsValid);
    // console.log(customerName.IsValid);
    // console.log(email.IsValid);
    // console.log(phoneno.IsValid);
    // console.log(password.IsValid);
    // console.log(repeatPassword.IsValid);
    // console.log(customerGST.IsTouched);
    // console.log(customerName.IsTouched);
    // console.log(email.IsTouched);
    // console.log(phoneno.IsTouched);
    // console.log(password.IsTouched);
    // console.log("errorMessage != ''");
    // console.log(errorMessage);
    // console.log('!existingMobileNumber');
    // console.log(!existingMobileNumber);

    if (
      !existingMobileNumber &&
      customerGST.IsValid &&
      customerGST.IsTouched &&
      customerName.IsValid &&
      customerName.IsTouched &&
      email.IsValid &&
      email.IsTouched &&
      phoneno.IsValid &&
      phoneno.IsTouched &&
      password.IsValid &&
      password.IsTouched &&
      repeatPassword.IsValid &&
      repeatPassword.IsTouched
    ) {
      setFormValidity(true);
    } else {
      setFormValidity(false);
    }
  };

  const handlePassword = text => {
    setPassword({
      Value: text,
      IsValid: true,
      IsTouched: true,
    });
    UpdateFormValidity();
  };

  const checkRepeatNewPassword = () => {
    setRepeatPassword({
      Value: repeatPassword.Value,
      IsValid: password.Value === repeatPassword.Value,
      IsTouched: true,
    });
    UpdateFormValidity();
  };

  const handleExistingCustomers = () => {
    var getCustomerInp = {
      input: `phone:${phoneno.Value}`,
    };
    getCustomerByQuery({
      context: GraphqlAdminApi,
      variables: getCustomerInp,
    });
  };

  useEffect(() => {
    if (!customerLoading && customerData) {
      if (customerData?.customers?.edges?.length > 0) {
        setExistingMobileNumber(true);
      } else {
        setExistingMobileNumber(false);
      }
    }
  }, [customerData, customerLoading]);

  const handleRepeatPassword = text => {
    setRepeatPassword({
      Value: text,
      IsValid: true,
      IsTouched: true,
    });
    UpdateFormValidity();
  };

  const handlesignup = async () => {
    if (formValidity) {
      setLoading(true);
      var graphqlVariables = {
        input: {
          email: email.Value,
          password: password.Value,
          firstName: customerName.Value,
          lastName: customerGST.Value,
        },
      };
      try {
        var createUserResponse = await signUpUser({
          variables: graphqlVariables,
          context: GraphqlStoreFrontApi,
        });
        if (
          createUserResponse.data.customerCreate.customerUserErrors.length > 0
        ) {
          setErrormessage(
            createUserResponse.data.customerCreate.customerUserErrors[0]
              .message,
          );
          setLoading(false);
        } else {
          setErrormessage('');
          var customerId = createUserResponse.data.customerCreate.customer.id;
          var updateCustomer = {
            input: {
              id: customerId,
              phone: phoneno.Value,
            },
          };
          await updateUser({
            variables: updateCustomer,
            context: GraphqlAdminApi,
          });
          setLoading(false);
          props.navigation.navigate(NavLogin, {
            isCustomerSignedUp: true,
          });
        }
      } catch (ex) {
        console.log('ex');
        console.log(ex);
      }
    }
    // console.log('handlesignup');
    // console.log(data.data.customerCreate.customer);
    // if(data.data.customerCreate.customerUserErrors)
    // {
    //   console.log(data.data.customerCreate.customerUserErrors);
    // }
    // var customerId = 'Z2lkOi8vc2hvcGlmeS9DdXN0b21lci81NDI3NTY4ODY5NTMy';
    // console.log('data.customerCreate.customerUserErrors');
    // data
  };
  return (
    // <ScrollView
    //   style={[{...style.parentview, flex: 1}]}
    //   contentContainerStyle={{flexGrow: 1}}>
    //   {/* <View style={style.parentview}> */}
    //   <View style={style.boxview}>
    //     <Text style={style.text}>Signup</Text>
    //     <TextInput
    //       label="GST Number"
    //       Text={customerGST}
    //       mode="outlined"
    //       onChangeText={handleGSTName}
    //       style={style.textinput}
    //     />
    //     {!customerGST.IsValid && <Text>Please enter a valid GST</Text>}
    //     <TextInput
    //       label="Name"
    //       Text={customerName}
    //       mode="outlined"
    //       onChangeText={handleName}
    //       style={style.textinput}
    //     />
    //     {!customerName.IsValid && <Text>Please enter your name</Text>}
    //     <TextInput
    //       label="Email"
    //       Text={email}
    //       mode="outlined"
    //       onChangeText={handlesetemail}
    //       style={style.textinput}
    //     />
    //     {!email.IsValid && <Text>Please enter a valid email</Text>}
    //     <TextInput
    //       label="Phone Number"
    //       Text={phoneno}
    //       mode="outlined"
    //       onChangeText={handlesetphoneno}
    //       style={style.textinput}
    //     />
    //     {!phoneno.IsValid && <Text>Please enter your number</Text>}
    //     <TextInput
    //       label="Password"
    //       Text={password}
    //       mode="outlined"
    //       onChangeText={handlePassword}
    //       style={style.textinput}
    //       secureTextEntry={!showpassword.newPassword}
    //       right={
    //         <TextInput.Icon
    //           name={!showpassword.newPassword ? 'eye-off' : 'eye'}
    //           onPress={()=> {handleshowpassword(true)}}
    //         />
    //       }
    //     />

    //     <TextInput
    //       label="Repeat New Password"
    //       Text={repeatPassword}
    //       mode="outlined"
    //       onChangeText={handleRepeatPassword}
    //       style={style.textinput}
    //       secureTextEntry={!showpassword.repeatNewPassword}
    //       right={
    //         <TextInput.Icon
    //           name={!showpassword.repeatNewPassword ? 'eye-off' : 'eye'}
    //           onPress={()=> {handleshowpassword(false)}}
    //         />
    //       }
    //     />

    //     {!repeatPassword.IsValid && <Text>Passwords do not match</Text>}
    //     <TouchableOpacity  disabled={!formValidity}>
    //       <Button
    //         mode="outlined"
    //         onPress={handlesignup}
    //         style={style.signupbutton}>
    //         Signup
    //     </Button>
    //     </TouchableOpacity>

    //   </View>
    //   {/* </View> */}
    // </ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Sign Up</Text>
      </View>
      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
        duration={600}
      >
        <ScrollView>
          <Text style={styles.text_footer}>GST Number</Text>
          <View style={styles.action}>
            <MaterialIcons
              style={styles.iconStyle}
              name="business-center"
              color="#05375a"
              size={25}
            />
            <TextInput
              Text={customerGST}
              onChangeText={handleGSTName}
              onEndEditing={ValidateGST}
              style={styles.textInput}
              placeholder="Enter your GST Number"
              placeholderTextColor="#CDCDCD"
            />
          </View>
          {!customerGST.IsValid && (
            <Text style={styles.errorText}>Please enter a valid GST</Text>
          )}
          <Text style={{...styles.text_footer, marginTop: 20}}>Name</Text>
          <View style={styles.action}>
            <FontAwesome
              style={styles.iconStyle}
              name="user-o"
              color="#05375a"
              size={25}
            />
            <TextInput
              placeholder="Enter your Name"
              placeholderTextColor="#CDCDCD"
              Text={customerName}
              mode="outlined"
              onChangeText={handleName}
              style={styles.textInput}
            />
          </View>
          {!customerName.IsValid && (
            <Text style={styles.errorText}>Please enter your name</Text>
          )}
          <Text style={{...styles.text_footer, marginTop: 20}}>
            Mobile Number
          </Text>
          <View style={styles.action}>
            <FontAwesome
              style={styles.iconStyle}
              name="mobile"
              color="#05375a"
              size={30}
            />
            <TextInput
              placeholder="Enter your Phone Number"
              placeholderTextColor="#CDCDCD"
              Text={phoneno}
              keyboardType={'numeric'}
              maxLength={10}
              mode="outlined"
              onChangeText={handlesetphoneno}
              onEndEditing={handleExistingCustomers}
              style={styles.textInput}
            />
            {/* <TouchableOpacity>
                    <Feather style={styles.iconStyle} onPress={handleshowpassword} name={showpassword.password? "eye-off" : "eye"} color="#CDCDCD" size={25}/>
                  </TouchableOpacity> */}
          </View>
          {!phoneno.IsValid && (
            <Text style={styles.errorText}>
              Please enter your mobile number
            </Text>
          )}

          {existingMobileNumber && (
            <Text style={styles.errorText}>
              An account with the same mobile number has alread been created.
            </Text>
          )}

          <Text style={{...styles.text_footer, marginTop: 20}}>Email</Text>
          <View style={styles.action}>
            <Feather
              style={styles.iconStyle}
              name="mail"
              color="#05375a"
              size={25}
            />
            <TextInput
              placeholder="Enter your Email"
              placeholderTextColor="#CDCDCD"
              Text={email}
              onEndEditing={ValidateEmail}
              mode="outlined"
              onChangeText={handlesetemail}
              style={styles.textInput}
            />
            {/* <TouchableOpacity>
                    <Feather style={styles.iconStyle} onPress={handleshowpassword} name={showpassword.password? "eye-off" : "eye"} color="#CDCDCD" size={25}/>
                  </TouchableOpacity> */}
          </View>
          {!email.IsValid && (
            <Text style={styles.errorText}>Please enter a valid email</Text>
          )}
          <Text style={{...styles.text_footer, marginTop: 20}}>Password</Text>
          <View style={styles.action}>
            <Feather
              style={styles.iconStyle}
              name="lock"
              color="#05375a"
              size={25}
            />
            <TextInput
              placeholder="Enter your Password"
              placeholderTextColor="#CDCDCD"
              Text={password}
              mode="outlined"
              onChangeText={handlePassword}
              style={styles.textInput}
              secureTextEntry={!showpassword.newPassword}
            />
            <TouchableOpacity
              onPress={() => {
                handleshowpassword(true);
              }}
            >
              <Feather
                style={styles.iconStyle}
                name={!showpassword.newPassword ? 'eye-off' : 'eye'}
                color="#CDCDCD"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <Text style={{...styles.text_footer, marginTop: 20}}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather
              style={styles.iconStyle}
              name="lock"
              color="#05375a"
              size={25}
            />
            <TextInput
              placeholder="Re-enter your password"
              placeholderTextColor="#CDCDCD"
              Text={repeatPassword}
              mode="outlined"
              onChangeText={handleRepeatPassword}
              onEndEditing={checkRepeatNewPassword}
              secureTextEntry={!showpassword.repeatNewPassword}
              style={styles.textInput}
            />
            <TouchableOpacity
              onPress={() => {
                handleshowpassword(false);
              }}
            >
              <Feather
                style={styles.iconStyle}
                name={!showpassword.repeatNewPassword ? 'eye-off' : 'eye'}
                color="#CDCDCD"
                size={25}
              />
            </TouchableOpacity>
          </View>
          {!repeatPassword.IsValid && (
            <Text style={styles.errorText}>Passwords do not match</Text>
          )}
          {errorMessage != '' && (
            <Text style={{...styles.errorText, textAlign: 'center'}}>
              {errorMessage}
            </Text>
          )}
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={handlesignup}>
              <LinearGradient
                colors={['#5db8fe', '#39cff2']}
                style={styles.signIn}
              >
                <Text style={{...styles.textSignIn, color: 'white'}}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    'Sign Up'
                  )}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Signup;
