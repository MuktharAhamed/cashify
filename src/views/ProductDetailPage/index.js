import {useNavigation} from '@react-navigation/core';
import {NavHome} from 'app-constants/Navigations';
import React, {useState, useEffect} from 'react';
import ProductService from '../../utils/ProductService';
// import Accordion from 'app-components/Accordion';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Text,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from 'app-components/Slider/Slider';

const ProductDetailPage = ({route, navigation}) => {
  const {productId} = route.params;
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([{}]);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [expandedState, setExpandedState] = useState({});

  const toggleExpand = groupName => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedState(prev => {
      var newState = {...prev};
      newState[groupName] = !prev[groupName];
      return newState;
    });
  };

  useEffect(async () => {
    // check if the user is logged in
    // if logged in then navigate to home
    // navigation.navigate(NavHome);
    // else to login page
    // navigation.navigate(NavLogin);
    // var product = await ProductService.getProductWithId(productId);
    // console.log(product.images[0].src);
    // setProduct(product);
    setExpandedState({
      SIZE: false,
      COLOR: false,
      GRADE: false,
    });
    setRelatedProducts();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, [productId]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Slider
          data={[
            {
              image: require('../../assets/mobilebunch.jpg'),
            },
            {
              image: require('app-assets/singlemobile.jpg'),
            },
          ]}
          timer={2000}
          imageKey={'image'}
          local={true}
          height={500}
          width={Math.round(Dimensions.get('window').width)}
          separator={0}
          loop={true}
          autoscroll={false}
          currentIndexCallback={index => console.log('Index', index)}
          onPress={item => alert(JSON.stringify(item))}
          indicator
          animation
        />

        <View style={{alignItems: 'center', marginHorizontal: 40}}>
          <Text style={styles.name}>Apple Iphone 64GB</Text>
          <Text style={styles.price}>$ 12.22</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec
          </Text>
        </View>
        <View style={styles.separator}></View>
        {/* Accrdion for Size, Grade and Color  */}
        <View>
          <TouchableOpacity
            style={styles.accordionRow}
            onPress={() => toggleExpand('SIZE')}>
            <Text style={styles.accordionTitle}>SIZE</Text>
            <Icon
              name={
                expandedState.SIZE ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={30}
              color={'#A9A9A9'}
            />
          </TouchableOpacity>
          <View style={styles.accordionParentHr} />
          {expandedState.SIZE && (
            <View style={styles.accordionChild}>
              <Text>16GB</Text>
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={styles.accordionRow}
            onPress={() => toggleExpand('COLOR')}>
            <Text style={styles.accordionTitle}>COLOUR</Text>
            <Icon
              name={
                expandedState.COLOR
                  ? 'keyboard-arrow-up'
                  : 'keyboard-arrow-down'
              }
              size={30}
              color={'#A9A9A9'}
            />
          </TouchableOpacity>
          <View style={styles.accordionParentHr} />
          {expandedState.COLOR && (
            <View style={styles.accordionChild}>
              <Text>Black</Text>
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={styles.accordionRow}
            onPress={() => toggleExpand('GRADE')}>
            <Text style={styles.accordionTitle}>GRADE</Text>
            <Icon
              name={
                expandedState.COLOR
                  ? 'keyboard-arrow-up'
                  : 'keyboard-arrow-down'
              }
              size={30}
              color={'#A9A9A9'}
            />
          </TouchableOpacity>
          <View style={styles.accordionParentHr} />
          {expandedState.GRADE && (
            <View style={styles.accordionChild}>
              <Text>Black</Text>
            </View>
          )}
        </View>
        <View style={styles.addToCarContainer}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => this.clickEventListener()}>
            <Text style={styles.shareButtonText}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  btnSize: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderColor: '#778899',
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentSize: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#eeeeee',
    marginTop: 20,
    marginHorizontal: 30,
  },
  shareButton: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  addToCarContainer: {
    marginHorizontal: 30,
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A9A9A9',
  },
  accordionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  accordionParentHr: {
    height: 1,
    color: '#ffffff',
    width: '100%',
  },
  accordionChild: {
    backgroundColor: '#D3D3D3',
    padding: 16,
  },
});

export default ProductDetailPage;
