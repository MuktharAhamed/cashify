import base64 from 'base-64';
import utf8 from 'utf8';
import {
  GraphqlAdminApi,
  GraphqlStoreFrontApi,
} from 'app-constants/GraphqlConstants';
import React, {useEffect, useState} from 'react';
import {gql, useMutation, useLazyQuery, useQuery} from '@apollo/client';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from './style.js';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {NavLogin} from 'app-constants/Navigations.js';

const ForgotPassword = () => {
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

  const customerReset = gql`
    mutation customerReset($id: ID!, $input: CustomerResetInput!) {
      customerReset(id: $id, input: $input) {
        customer {
          id
        }
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

  const customerRecover = gql`
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const handlePasswordDefaultState = {
    newPassword: false,
    repeatNewPassword: false,
  };
  const navigation = useNavigation();
  const [currentUserId, setCurrentUserId] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [obscureEmail, setObscureEmail] = useState('');
  const [MobileNo, setMobileNo] = useState('');
  const [repeatNewPassword, handleRepeatNewPassword] = useState('');
  const [showResetPasswordFields, setShowResetPasswordFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(false);
  const [showpassword, setShowpassword] = useState(handlePasswordDefaultState);
  const [errorMessage, setErrorMessage] = useState('');
  const [accessTokenError, setAccessTokenError] = useState(false);

  const [
    getCustomerByQuery,
    {loading: customerLoading, error: CustomerError, data: customerData},
  ] = useLazyQuery(getCustomer, {
    fetchPolicy: 'network-only',
  });
  const [recoverCustomer] = useMutation(customerRecover);
  const [changePassword] = useMutation(customerReset);

  const handleResetPassword = async () => {
    console.log('resetToken');
    console.log(resetToken);
    console.log('errorMessage');
    console.log(errorMessage);
    if (!errorMessage) {
      console.log('inside');
      if (resetToken == '') {
        setErrorMessage('Please enter your verification code sent to mail.');
      } else {
        setErrorMessage('');
        console.log('inside');
        setLoading(true);
        var input = {
          id: currentUserId,
          input: {
            resetToken: resetToken,
            password: password,
          },
        };
        var res = await changePassword({
          variables: input,
          context: GraphqlStoreFrontApi,
        });
        if (res.data.customerReset.customerUserErrors.length > 0) {
          setLoading(false);
          setAccessTokenError(true);
        } else {
          navigation.navigate(NavLogin, {
            isCustomerResetPassword: true,
          });
          setLoading(false);
        }
      }
    }
  };

  const CheckIfCustomerExists = () => {
    if (MobileNo != '') {
      var getCustomerInp = {
        input: `phone:${MobileNo}`,
      };
      try {
        getCustomerByQuery({
          context: GraphqlAdminApi,
          variables: getCustomerInp,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(async () => {
    if (!customerLoading && customerData) {
      if (customerData?.customers?.edges?.length > 0) {
        const utf8Bytes = utf8.encode(
          customerData?.customers?.edges[0]?.node?.id,
        );
        var userId = base64.encode(utf8Bytes);
        setCurrentUserId(userId);
        var email = customerData?.customers?.edges[0]?.node?.email;
        console.log('email');
        console.log(email);
        var input = {
          email: email,
        };
        console.log('HIt');
        try {
          var response = await recoverCustomer({
            variables: input,
            context: GraphqlStoreFrontApi,
          });

          console.log('response');
          // setShowResetPasswordFields(true);
          console.log(response);
          console.log(response?.data);
          console.log(response.data.customerRecover.customerUserErrors[0]);
          if (response.data.customerRecover.customerUserErrors.length > 0) {
            setErrorMessage(
              response.data.customerRecover.customerUserErrors[0],
            );
          } else {
            setErrorMessage('');
            await setShowResetPasswordFields(true);
            // console.log('showResetPasswordFields');
            // console.log(showResetPasswordFields);
            setErrorMessage('');
            const [name, domain] = email.split('@');
            setObscureEmail(
              `${name[0]}${name[1]}${name[2]}${name[3]}${new Array(
                name.length - 4,
              ).join('*')}@${domain}`,
            );
          }
        } catch (ex) {
          // console.log('asdjfas');
          setErrorMessage(
            'Resetting password limit exceeded. Please try again later.',
          );
          throw ex;
        }
      } else {
        setErrorMessage('The mobile number you have entered is invalid');
        setShowResetPasswordFields(false);
      }
    }
  }, [customerData, customerLoading]);

  const handleResetToken = text => {
    setResetToken(text);
    setAccessTokenError(false);
  };

  const verifyConfirmationPassword = text => {
    if (password == repeatNewPassword) {
      setErrorMessage('');
    } else {
      setErrorMessage('Passwords do not match');
    }
  };

  const handleshowpassword = isNewPassword => {
    setShowpassword(prevState => {
      return {
        newPassword: isNewPassword
          ? !prevState.newPassword
          : prevState.newPassword,
        repeatNewPassword: !isNewPassword
          ? !prevState.repeatNewPassword
          : prevState.repeatNewPassword,
      };
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Reset Your Passwrod</Text>
      </View>
      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig"
        duration={600}
      >
        <Text style={styles.text_footer}>Mobile Number</Text>
        <View style={styles.action}>
          <FontAwesome
            style={styles.iconStyle}
            name="user-o"
            color="#05375a"
            size={25}
          />
          <TextInput
            Text={MobileNo}
            maxLength={10}
            keyboardType={'numeric'}
            onChangeText={text => {
              setMobileNo(text);
            }}
            onEndEditing={CheckIfCustomerExists}
            style={styles.textInput}
            placeholder="Enter your Mobile Number"
            placeholderTextColor="#CDCDCD"
          />
        </View>
        <Text style={{...styles.text_footer, marginTop: 35}}>
          Enter your new password
        </Text>
        <View style={styles.action}>
          <Feather
            style={styles.iconStyle}
            name="lock"
            color="#05375a"
            size={25}
          />
          <TextInput
            Text={password}
            secureTextEntry={!showpassword.newPassword}
            placeholder="Enter your Password"
            placeholderTextColor="#CDCDCD"
            onChangeText={text => setPassword(text)}
            onEndEditing={verifyConfirmationPassword}
            style={styles.textInput}
          />
          <TouchableOpacity>
            <Feather
              style={styles.iconStyle}
              onPress={() => {
                handleshowpassword(true);
              }}
              name={!showpassword.newPassword ? 'eye-off' : 'eye'}
              color="#CDCDCD"
              size={25}
            />
          </TouchableOpacity>
        </View>
        <Text style={{...styles.text_footer, marginTop: 35}}>
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
            Text={repeatNewPassword}
            secureTextEntry={!showpassword.repeatNewPassword}
            placeholder="Re-enter your password"
            placeholderTextColor="#CDCDCD"
            onChangeText={text => handleRepeatNewPassword(text)}
            onEndEditing={verifyConfirmationPassword}
            style={styles.textInput}
          />
          <TouchableOpacity>
            <Feather
              style={styles.iconStyle}
              onPress={() => {
                handleshowpassword(false);
              }}
              name={!showpassword.repeatNewPassword ? 'eye-off' : 'eye'}
              color="#CDCDCD"
              size={25}
            />
          </TouchableOpacity>
        </View>
        {showResetPasswordFields && (
          <>
            <Text style={{...styles.text_footer, marginTop: 35}}>
              We have sent a verification code to your email ending at{' '}
              {obscureEmail}
            </Text>
            <View style={styles.action}>
              <FontAwesome
                style={styles.iconStyle}
                name="key"
                color="#05375a"
                size={25}
              />
              <TextInput
                Text={resetToken}
                placeholder="Enter your verification code"
                placeholderTextColor="#CDCDCD"
                onChangeText={handleResetToken}
                style={styles.textInput}
              />
            </View>
          </>
        )}
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          {accessTokenError && (
            <Text style={styles.errorText}>
              The token you have entered is expired. Please try again.
            </Text>
          )}
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.resetPass}
            onPress={handleResetPassword}
          >
            <LinearGradient
              colors={['#5db8fe', '#39cff2']}
              style={styles.resetPass}
            >
              <Text style={{...styles.textResetPass, color: 'white'}}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  'Reset Password'
                )}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ForgotPassword;
