import {NavCartPage,NavProductDetailPage, NavProductListingPage} from 'app-constants/Navigations';
import {
  NavSplashScreen,
  NavProductDetailPage,
  NavHome,
  NavLogin,
  NavSignup,
} from 'app-constants/Navigations';
import React from 'react';
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

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [text, setText] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

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
      <Button onPress={() => navigation.navigate(NavProductDetailPage, {
            productId: '6815097553052',
          })}>ProductDetailPage</Button>
      <Button onPress={() => navigation.navigate(NavProductListingPage)}>Product listing page</Button>
      <Button onPress={() => navigation.navigate(NavCartPage)}>Cart page</Button>
      <Button
        onPress={() =>
          navigation.navigate(NavProductDetailPage, {
            productId: '6815097553052',
          })
        }>
        ProductDetailPage
      </Button>
      <Button onPress={() => navigation.navigate(NavLogin)}>Login</Button>
      <Button onPress={() => navigation.navigate(NavSignup)}>Signup</Button>
    </ScrollView>
  );
};

export default Home;
