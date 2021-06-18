import {NavSplashScreen,NavProductDetailPage} from 'app-constants/Navigations';
import React from 'react';
import {ScrollView, View, TouchableOpacity, Image, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Catergories from 'app-components/Categories';
// import {ViewPagerAndroid} from 'react-native-viewpager';

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <ScrollView style={{flex: 1}}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{marginBottom: 5}}
      />
      <Catergories />
      {/* <ViewPagerAndroid da>
        <View key="1">
          <Text>First page</Text>
        </View>
        <View key="2">
          <Text>Second page</Text>
        </View>
      </ViewPagerAndroid> */}
      <Button onPress={() => navigation.navigate(NavSplashScreen)}>dsf</Button>
      <Button onPress={() => navigation.navigate(NavProductDetailPage, {
            productId: '6815097553052',
          })}>ProductDetailPage</Button>
    </ScrollView>
  );
};

export default Home;
