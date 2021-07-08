import store from '../../store/index';
import {setCustomer} from '../../action/index';
import {gql, useMutation, useLazyQuery, useQuery} from '@apollo/client';
import {
  NavSplashScreen,
  NavProductDetailPage,
  NavCartPage,
  NavLogin,
  NavSignup,
  NavProductListingPage,
} from 'app-constants/Navigations';
import {connect} from 'react-redux';

import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Catergories from 'app-views/Home/Categories';
import ByPrice from 'app-views/Home/ByPrice';
import ByGrade from 'app-views/Home/ByGrade';
import ByBrand from 'app-views/Home/ByBrand';
import TodaysDeals from 'app-views/Home/TodaysDeals';
import style from 'app-views/Home/style';
import Slider from 'app-components/Slider/Slider';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {useMutation} from '@apollo/client';
import {GraphqlStoreFrontApi} from 'app-constants/GraphqlConstants';

const Home = props => {
  const resetAccessToken = gql`
    mutation customerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const [searchQuery, setSearchQuery] = useState('');
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const onChangeSearch = query => setSearchQuery(query);
  const [changeAccessToken] = useMutation(resetAccessToken);

  useEffect(async () => {
    // console.log('props.customer.customerAccessToken');
    // console.log(props.customer.customerId);
    // console.log(props.customer);
    // console.log(props.customer);
    // console.log(props.customer);
    if (
      props.customer.expiresAt != null &&
      props.customer.customerAccessToken != null
    ) {
      var expiresAt = new Date(props.customer.expiresAt);
      var curentDate = new Date();
      const diffTime = Math.abs(expiresAt - curentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // console.log(diffDays);
      if (diffDays <= 7) {
        const input = {
          customerAccessToken: props.customer.customerAccessToken,
        };
        var response = await changeAccessToken({
          variables: input,
          context: GraphqlStoreFrontApi,
        });
        console.log('response.data');
        console.log(response.data);
        if (response.data.customerAccessTokenRenew.userErrors.length > 0) {
          navigation.navigate(NavLogin, {
            isSessionExpired: true,
          });
        } else {
          // console.log(response.data.customerAccessTokenRenew.customerAccessToken.accessToken);
          store.dispatch(
            setCustomer({
              customerAccessToken:
                response.data.customerAccessTokenRenew.customerAccessToken
                  .accessToken,
              customerMobile: props.customer.customerMobile,
              customerId: props.customer.customerId,
              expiresAt:
                response.data.customerAccessTokenRenew.customerAccessToken
                  .expiresAt,
            }),
          );
        }
      }
    }
  }, []);
  return (
    <ScrollView
      style={style.scrollview}
      // contentContainerStyle={{alignItems: 'center'}}
    >
      <Searchbar
        placeholder="Search mobile to buy"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={style.Searchbar}
      />
      <Catergories />
      <Slider
        data={[
          {
            image: require('../../assets/solids/solid1.jpg'),
          },
          {
            image: require('app-assets/solids/solid2.jpg'),
          },
        ]}
        timer={10000}
        imageKey={'image'}
        local={true}
        height={200}
        width={Math.round(Dimensions.get('window').width)}
        separator={1}
        loop={true}
        autoscroll={false}
        currentIndexCallback={index => console.log('Index', index)}
        onPress={item => alert(JSON.stringify(item))}
        indicator
        animation
      />
      <ByPrice />
      <ByGrade />
      <ByBrand />
      <TodaysDeals />

      {/* <Button onPress={() => navigation.navigate(NavSplashScreen)}>dsf</Button> */}

      <Button onPress={() => navigation.navigate(NavProductListingPage)}>
        Product listing page
      </Button>
      <Button onPress={() => navigation.navigate(NavCartPage)}>
        Cart page
      </Button>
      <Button
        onPress={() =>
          navigation.navigate(NavProductDetailPage, {
            productId: '6815097553052',
          })
        }
      >
        ProductDetailPage
      </Button>
      <Button onPress={() => navigation.navigate(NavLogin)}>Login</Button>
      <Button onPress={() => navigation.navigate(NavSignup)}>Signup</Button>
    </ScrollView>
  );
};

const mapStateToProps = (state, props) => {
  return {
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(Home);

// export default Home;
