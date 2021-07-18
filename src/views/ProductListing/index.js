import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Catergories from 'app-views/Home/Categories';
import ByPrice from 'app-views/Home/ByPrice';
import ByGrade from 'app-views/Home/ByGrade';
import ByBrand from 'app-views/Home/ByBrand';
import TodaysDeals from 'app-views/Home/TodaysDeals';
import styles from 'app-views/ProductListing/style';
import style from 'app-views/Home/style';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  createHttpLink,
  useMutation,
} from '@apollo/client';

import {event} from 'react-native-reanimated';
import {Button} from 'react-native-paper';

// const query = gql`
//   query query($tag: String!) {
//     shop {
//       name
//       products(first: 10, query: $tag) {
//         edges {
//           node {
//             title
//             variants(first: 10) {
//               edges {
//                 node {
//                   title
//                 }
//               }
//             }
//             variantBySelectedOptions(
//               selectedOptions: {name: "GRADE", value: "Grade_A"}
//             ) {
//               id
//               title
//             }
//           }
//         }
//       }
//     }
//   }
// `;

const query = gql`
  query productsfilter($collectionquery: String!) {
    shop {
      name
      collections(query: $collectionquery, first: 1) {
        edges {
          node {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  variants(first: 10) {
                    edges {
                      node {
                        selectedOptions {
                          name
                          value
                        }
                        price
                        id
                        quantityAvailable
                        title
                      }
                    }
                  }
                  images(first: 10) {
                    edges {
                      node {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const productList = [
  {
    id: 0,
    text: 'Realme X 128 GB',
    grade: 'Grade D',
    source: require('app-assets/mob/mobile1.jpg'),
    price: '₹6,110',
  },
  {
    id: 1,
    text: 'Redmi Note 9Pro 8 GB/128 GB',
    grade: 'Grade C',
    source: require('app-assets/mob/mobile2.png'),
    price: '₹9,320',
  },
  {
    id: 2,
    text: 'Redmi Note 10 Pro 128 GB',
    grade: 'Grade D',
    source: require('app-assets/mob/mobile1.jpg'),
    price: '₹16,110',
  },
  {
    id: 3,
    text: 'Mi Note 10 Pro 8 GB/128 GB',
    grade: 'Grade C',
    source: require('app-assets/mob/mobile2.png'),
    price: '₹29,320',
  },
  {
    id: 4,
    text: 'Realme X 128 GB',
    grade: 'Grade D',
    source: require('app-assets/mob/mobile1.jpg'),
    price: '₹6,110',
  },
  {
    id: 5,
    text: 'Redmi Note 9Pro 8 GB/128 GB',
    grade: 'Grade C',
    source: require('app-assets/mob/mobile2.png'),
    price: '₹9,320',
  },
  {
    id: 6,
    text: 'Redmi Note 10 Pro 128 GB',
    grade: 'Grade D',
    source: require('app-assets/mob/mobile1.jpg'),
    price: '₹16,110',
  },
  {
    id: 7,
    text: 'Mi Note 10 Pro 8 GB/128 GB',
    grade: 'Grade C',
    source: require('app-assets/mob/mobile2.png'),
    price: '₹29,320',
  },
  {
    id: 8,
    text: 'Realme X 128 GB',
    grade: 'Grade D',
    source: require('app-assets/mob/mobile1.jpg'),
    price: '₹6,110',
  },
  {
    id: 9,
    text: 'Redmi Note 9Pro 8 GB/128 GB',
    grade: 'Grade C',
    source: require('app-assets/mob/mobile2.png'),
    price: '₹9,320',
  },
  {
    id: 10,
    text: 'Redmi Note 10 Pro 128 GB',
    grade: 'Grade D',
    source: require('app-assets/mob/mobile1.jpg'),
    price: '₹16,110',
  },
  {
    id: 11,
    text: 'Mi Note 10 Pro 8 GB/128 GB',
    grade: 'Grade C',
    source: require('app-assets/mob/mobile2.png'),
    price: '₹29,320',
  },
];
const ProductListing = props => {
  console.log('propsnavigation', `title:GRADE ` + props.route.params.text);
  const [querytag, setquerytag] = useState(
    `title:GRADE ` + props.route.params.text,
  );
  const {loading, data, error} = useQuery(query, {
    variables: {collectionquery: querytag},
  });
  const [currentVariant, setCurrentVariant] = useState([]);
  let allVariants = [];
  let varient = {};
  console.log('pro', data);
  useEffect(() => {
    if (!loading) {
      console.log('data', data.shop.collections.edges[0].node.products.edges);
      var products = data.shop.collections.edges[0].node.products.edges;
      products.forEach(x => {
        varient.productid = x.node.id;
        varient.productname = x.node.title;
        varient.image = x.node.images.edges[0]?.node.src;
        x.node.variants.edges.filter(c => {
          varient.varientid = c.node.id;
          varient.price = c.node.price;
          varient.quantity = c.node.quantityAvailable;
          varient.varientname = c.node.title;
          c.node.selectedOptions.forEach(v => {
            if (
              v.name.toLowerCase() == 'grade' &&
              v.value.toLowerCase() ==
                'grade_' + props.route.params.text.toLowerCase()
            ) {
              varient['grade'] = v.value;
              allVariants.push(varient);
              varient = {};
              // console.log('currentVariant', allVariants);
            }
          });
        });
      });
    }
  }, [data]);

  const [gradeaselected, setGradeaselected] = useState(false);
  const [gradebselected, setGradebselected] = useState(false);
  const [appleselected, setAppleselected] = useState(false);
  const [samsungselected, setSamsungselected] = useState(false);
  const [redmiselected, setRedmiselected] = useState(false);
  const [rateselected, setRateselected] = useState(false);

  const handlegradeaselectedfilter = () => {
    setGradeaselected(!gradeaselected);
  };
  const handlegradebselectedfilter = () => {
    setGradebselected(!gradebselected);
  };
  const handleAppleselectedfilter = () => {
    setAppleselected(!appleselected);
  };
  const handleSamsungselectedfilter = () => {
    setSamsungselected(!samsungselected);
  };
  const handleRedmiselectedfilter = () => {
    setRedmiselected(!redmiselected);
  };
  const handleRateselectedfilter = () => {
    setRateselected(!rateselected);
  };

  const Filters = [
    {
      text: 'Grade A',
      event: handlegradeaselectedfilter,
      isselected: gradeaselected,
    },
    {
      text: 'Grade B',
      event: handlegradebselectedfilter,
      isselected: gradebselected,
    },
    {
      text: 'Apple',
      event: handleAppleselectedfilter,
      isselected: appleselected,
    },
    {
      text: 'Samsung',
      event: handleSamsungselectedfilter,
      isselected: samsungselected,
    },
    {
      text: 'Redmi',
      event: handleRedmiselectedfilter,
      isselected: redmiselected,
    },
    {
      text: '> Rs.9999',
      event: handleRateselectedfilter,
      isselected: rateselected,
    },
  ];

  return (
    <View style={styles.ProductListingContainer}>
      {console.log('currentVariant', allVariants)}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            borderTopWidth: 0.5,
            paddingTop: 6,
            paddingBottom: 4,
            flexDirection: 'row',
            margin: 5,
            height: 30,
          }}
        >
          {currentVariant.map(e => (
            <Text>{e.id}</Text>
          ))}
          <Text
            style={{marginHorizontal: 1, fontWeight: 'bold', color: 'black'}}
          >
            {' '}
            Filters :{' '}
          </Text>
          {Filters.map((e, index) => (
            <Filter
              event={e.event}
              text={e.text}
              isselected={e.isselected}
              key={index}
            />
          ))}
        </View>
      </ScrollView>
      <FlatList
        data={allVariants} //allVariants
        keyExtractor={item => item.id} //has to be unique
        renderItem={ProductBlock} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
        contentContainerStyle={{paddingBottom: 30}}
      />
    </View>
  );
};

const Filter = ({event, text, isselected}) => {
  // console.log('fiter', event, text, isselected);
  return (
    <TouchableNativeFeedback onPress={event}>
      <Text
        style={
          isselected
            ? {
                ...styles.selectedFilter,
                paddingHorizontal: 10,
              }
            : {
                paddingHorizontal: 10,
                color: 'black',
              }
        }
      >
        {text}
      </Text>
    </TouchableNativeFeedback>
  );
};

const ProductBlock = ({item, index}) => {
  console.log('text');
  // console.log(item.text);
  return (
    <View style={styles.productsContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flex: 5,
            marginLeft: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity>
            <Image source={item.image} style={styles.productsImage} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, paddingHorizontal: 5}}>
          <Icon name={'favorite-border'} size={30} color={'#D3D3D3'} />
        </View>
      </View>
      <View
        style={{
          marginLeft: 5,
          marginTop: 5,
          flex: 1,
        }}
      >
        <View>
          <Text style={{...styles.productsTitle, height: 45}}>
            {item.productname + item.varientname}
          </Text>
          <Text style={styles.gradeText}>{item.grade}</Text>
          <Text style={[{...styles.productsTitle, color: '#F08080'}]}>
            {item.price}
          </Text>
        </View>
        <View style={{marginVertical: 15}}>
          <TouchableOpacity
            underlay
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,
            }}
            onPress={() => {
              addToCart;
            }}
          >
            <Text color="#1877F2" style={styles.addToCartButton}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductListing;
