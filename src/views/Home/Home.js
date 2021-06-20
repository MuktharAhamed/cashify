import {NavSplashScreen,NavProductDetailPage} from 'app-constants/Navigations';
import React from 'react';
import {ScrollView, View, TouchableOpacity, Image, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Catergories from 'app-views/Home/Categories';
import ByPrice from 'app-views/Home/ByPrice';
import ByGrade from 'app-views/Home/ByGrade';
import ByBrand from 'app-views/Home/ByBrand';
import TodaysDeals from 'app-views/Home/TodaysDeals';
import style from 'app-views/Home/style';

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

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
      <ByPrice />
      <ByGrade />
      <ByBrand />
      <TodaysDeals />
      {/* <Button onPress={() => navigation.navigate(NavSplashScreen)}>dsf</Button> */}
      <Button onPress={() => navigation.navigate(NavProductDetailPage, {
            productId: '6815097553052',
          })}>ProductDetailPage</Button>
    </ScrollView>
  );
};

export default Home;
