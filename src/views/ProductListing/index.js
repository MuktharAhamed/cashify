import * as ProductConstants from 'app-constants/ProductConstants.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from 'app-views/ProductListing/style';
import {gql, useLazyQuery} from '@apollo/client';
import {GraphqlStoreFrontApi} from 'app-constants/GraphqlConstants';
import {
  NavProductDetailPage,
  NavProductListingPage,
} from 'app-constants/Navigations';

const query = gql`
  query productsfilter($collectionquery: String!) {
    collections(query: $collectionquery, first: 10) {
      edges {
        node {
          title
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
                images(first: 1) {
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
`;

const ProductListing = props => {
  // console.log('propsnavigation', `title:GRADE ` + props.route.params.text);
  // const [gradetype, setGradetype] = useState(props.route.params.text);
  // const [querytag, setquerytag] = useState(`title:GRADE ` + gradetype);
  const [
    getProductsByQuery,
    {loading: productLoading, error: productError, data},
  ] = useLazyQuery(query, {
    fetchPolicy: 'network-only',
  });
  const defaultFilters = [
    {
      text: 'Grade A',
      isselected: false,
      // event: handlegradeaselectedfilter,
      // isselected: gradeaselected,
    },
    {
      text: 'Grade B',
      // event: handlegradebselectedfilter,
      isselected: false,
      // isselected: gradebselected,
    },
    {
      text: 'Apple',
      // event: handleAppleselectedfilter,
      isselected: false,
      // isselected: appleselected,
    },
    {
      text: 'Samsung',
      // event: handleSamsungselectedfilter,
      isselected: false,
      // isselected: samsungselected,
    },
    {
      text: 'Redmi',
      // event: handleRedmiselectedfilter,
      isselected: false,
      // isselected: redmiselected,
    },
    {
      text: '> Rs.9999',
      // event: handleRateselectedfilter,
      isselected: false,
      // isselected: rateselected,
    },
  ];

  const [filters, updateFilters] = useState(defaultFilters);
  const [currentVariant, setCurrentVariant] = useState([]);
  // let allVariants = [];
  // let varient = {};
  // console.log('pro', data);
  // console.log('loading', loading);
  // console.log('error', error);

  useEffect(() => {
    if (!productLoading && props.route.params.text != null) {
      try {
        console.log('propsload');
        console.log(props.route.params);
        let input;
        if (props.route.params.from == 'Brand') {
          input = `title:\"${props.route.params.text}\"`;
          // .map(x => `title:\"${x.text}\"`);
        } else {
          input = `title:GRADE ${props.route.params.text}`;
        }
        console.log(input);
        getProductsByQuery({
          context: GraphqlStoreFrontApi,
          variables: {
            collectionquery: input,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    console.log('productError');
    console.log(productError);
    if (!productLoading && !productError && data != undefined) {
      if (data.collections.edges.length > 0) {
        var allVariants = [];
        console.log('data.collections.edges');
        console.log(data.collections.edges);
        data.collections.edges.forEach(collection => {
          if (collection.node?.products?.edges?.length > 0) {
            collection.node?.products?.edges.forEach(product => {
              var varient = {};
              varient.productid = product.node.id;
              varient.productname = product.node.title;
              varient.image =
                product.node.images.edges.length > 0
                  ? product.node.images.edges[0]?.node.src
                  : '';
              if (product.node.variants.edges.length > 0) {
                if (
                  collection.node.title
                    ?.toLowerCase()
                    .includes(ProductConstants.PRODUCT_GRADE)
                ) {
                  var currentProductVariant = {...varient};
                  product.node.variants.edges.forEach(a => {
                    var currentProdGrade = a.node.selectedOptions.find(
                      x =>
                        x.name.toLowerCase() == ProductConstants.PRODUCT_GRADE,
                    )?.value;
                    var selectedFilters = filters.filter(
                      a => a.isselected && a.text.includes(currentProdGrade),
                    );
                    if (
                      props.route.params.text == currentProdGrade ||
                      selectedFilters.length > 0
                    ) {
                      var currentProductVariant = {...varient};
                      currentProductVariant.grade = currentProdGrade;
                      currentProductVariant.varientid = a.node?.id;
                      currentProductVariant.price = a.node?.price;
                      currentProductVariant.quantity =
                        a.node?.quantityAvailable;
                      currentProductVariant.varientname = a.node?.title;
                      if (
                        !allVariants?.some(
                          a => a.varientid == currentProductVariant.varientid,
                        )
                      ) {
                        allVariants.push(currentProductVariant);
                      }
                    }
                  });
                  // console.log(product.node.variants);
                } else {
                  console.log();
                  var currentProductVariant = {...varient};
                  currentProductVariant.grade =
                    product.node.variants.edges[0].node.selectedOptions.find(
                      x =>
                        x.name.toLowerCase() == ProductConstants.PRODUCT_GRADE,
                    )?.value;
                  currentProductVariant.varientid =
                    product.node.variants.edges[0].node?.id;
                  currentProductVariant.price =
                    product.node.variants.edges[0].node?.price;
                  currentProductVariant.quantity =
                    product.node.variants.edges[0].node?.quantityAvailable;
                  currentProductVariant.varientname =
                    product.node.variants.edges[0].node?.title;
                  if (
                    !allVariants?.some(
                      a => a.varientid == currentProductVariant.varientid,
                    )
                  ) {
                    allVariants.push(currentProductVariant);
                  }
                }
              }
            });
          }
        });
        setCurrentVariant(allVariants);
      }
      // const selectedfilters = [];
      // if (gradeaselected) {
      //   selectedfilters.push('a');
      // }
      // if (gradebselected) {
      //   selectedfilters.push('b');
      // }
      // if (appleselected) {
      //   selectedfilters.push('apple');
      // }
      // console.log('selectedfilters', selectedfilters);
      // if (data !== undefined) {
      // var products = data.shop.collections.edges[0].node.products.edges;
      // // console.log(products,"products");
      // products.forEach(x => {
      //   x.node.variants.edges.filter(c => {
      //     varient.productid = x.node.id;
      //     varient.productname = x.node.title;
      //     varient.image = x.node.images.edges[0]?.node.src;
      //     varient.varientid = c.node.id;
      //     varient.price = c.node.price;
      //     varient.quantity = c.node.quantityAvailable;
      //     varient.varientname = c.node.title;
      //     c.node.selectedOptions.forEach(v => {
      //       // console.log('x.node.title', x.node.title);
      //       // console.log('appleselected', appleselected);
      //       if (
      //         v.name.toLowerCase() == 'grade' && !selectedfilters.length > 0
      //           ? v.value.toLowerCase() ==
      //             props.route.params.text.toLowerCase()
      //           : // &&
      //             // selectedfilters.length > 0 &&
      //             selectedfilters.includes(v.value.toLowerCase())
      //         // &&
      //         // appleselected ===true &&
      //         // x.node.title.toLowerCase().includes('apple')
      //       ) {
      //         // console.log('bothgrades', v.value.toLowerCase());
      //         // console.log('appleselected', appleselected);
      //         varient['grade'] = v.value;
      //         allVariants.push(varient);
      //         varient = {};
      //       }
      //     });
      //   });
      // });
      // setCurrentVariant(allVariants);
      // }
    }
  }, [data, productLoading]);

  // const [gradeaselected, setGradeaselected] = useState(false);
  // const [gradebselected, setGradebselected] = useState(false);
  // const [appleselected, setAppleselected] = useState(false);
  // const [samsungselected, setSamsungselected] = useState(false);
  // const [redmiselected, setRedmiselected] = useState(false);
  // const [rateselected, setRateselected] = useState(false);

  useEffect(() => {
    console.log('hit');
    if (filters.some(a => a.isselected)) {
      // var existingFilters = ["title:\"Grade " + props.route.params.text + "\""]
      // var existingFilters = [`title:\"Grade ${props.route.params.text}"`];
      var selectedQuery = filters
        .filter(a => a.isselected)
        .map(x => `title:\"${x.text}\"`);
      // var filterQuery = [...existingFilters, ...selectedQuery].join(' OR ');
      // var existingFilters = ['title:"Grade ' + props.route.params.text + '"'];
      // var selectedQuery = filters
      //   .filter(a => a.isselected)
      //   .map(x => 'title:"' + x.text + '"');
      var filterQuery = [...selectedQuery].join(' OR ');
      // var filterQuery = [...selectedQuery];

      console.log('filterQuery');
      console.log(filterQuery);
      try {
        // console.log('propsload');
        getProductsByQuery({
          context: GraphqlStoreFrontApi,
          variables: {
            collectionquery: filterQuery,
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      let input;
      if (props.route.params.from == 'Brand') {
        input = `title:\"${props.route.params.text}\"`;
      } else {
        input = `title:GRADE ${props.route.params.text}`;
      }
      // const input = `title:GRADE ${props.route.params.text}`;
      console.log('input', input);
      try {
        getProductsByQuery({
          context: GraphqlStoreFrontApi,
          variables: {
            collectionquery: input,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [filters]);

  // useEffect(() => {
  //   if (!productLoading && productError != null) {
  //     try {
  //       let selectedfilters;
  //       if (gradeaselected) {
  //         selectedfilters = 'title:"GRADE A"';
  //       }
  //       if (gradebselected) {
  //         if (selectedfilters) {
  //           selectedfilters += ' OR ';
  //         }
  //         selectedfilters =
  //           (selectedfilters ? selectedfilters : '') +
  //           'title:' +
  //           (gradebselected ? '"GRADE B"' : '');
  //       }
  //       if (appleselected) {
  //         if (selectedfilters) {
  //           selectedfilters += ' OR ';
  //         }
  //         selectedfilters =
  //           (selectedfilters ? selectedfilters : '') +
  //           'title:' +
  //           (appleselected ? '"APPLE"' : '');
  //       }
  //       console.log('selectedfilters', selectedfilters);
  //       console.log('propsload');
  //       if (selectedfilters) {
  //         getProductsByQuery({
  //           context: GraphqlStoreFrontApi,
  //           variables: {
  //             collectionquery: selectedfilters,
  //             // ? selectedfilters
  //             // : 'title:GRADE ' + gradetype,
  //           },
  //         });
  //       } else {
  //         getProductsByQuery({
  //           context: GraphqlStoreFrontApi,
  //           variables: {collectionquery: `title:GRADE ` + gradetype},
  //         });
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // }, [
  //   productLoading
  // ]);

  // const handlegradeaselectedfilter = () => {
  //   setGradeaselected(!gradeaselected);
  // };
  // const handlegradebselectedfilter = () => {
  //   setGradebselected(!gradebselected);
  // };
  // const handleAppleselectedfilter = () => {
  //   setAppleselected(!appleselected);
  // };
  // const handleSamsungselectedfilter = () => {
  //   setSamsungselected(!samsungselected);
  // };
  // const handleRedmiselectedfilter = () => {
  //   setRedmiselected(!redmiselected);
  // };
  // const handleRateselectedfilter = () => {
  //   setRateselected(!rateselected);
  // };

  const addSelectedFilter = text => {
    console.log('addSelectedFilter');
    updateFilters(prev => {
      // const existingFilters = prev;
      var selectedFilterIndex = prev.findIndex(x => x.text == text);
      var newFilters = [...prev];
      newFilters[selectedFilterIndex] = {
        ...newFilters[selectedFilterIndex],
        isselected: !newFilters[selectedFilterIndex].isselected,
      };
      // console.log('newFilters');
      // console.log(newFilters);
      return newFilters;
    });
  };
  const renderProductlist = ({item}) => {
    {
      console.log('item', item);
    }
    return <ProductBlock item={item} />;
  };

  return (
    <View style={styles.ProductListingContainer}>
      {/* {console.log('currentVariant', allVariants)} */}
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
          {filters.map((e, index) => (
            <Filter
              event={addSelectedFilter}
              text={e.text}
              isselected={e.isselected}
              key={index}
            />
          ))}
        </View>
      </ScrollView>
      <FlatList
        data={currentVariant} //allVariants
        keyExtractor={item => item.varientid} //has to be unique
        renderItem={renderProductlist} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
        contentContainerStyle={{paddingBottom: 30}}
      />
    </View>
  );
};

const Filter = ({event, text, isselected}) => {
  // console.log('fiter', event, text, isselected);
  // const [filters, updateFilters] = useState();
  return (
    <TouchableNativeFeedback
      onPress={() => {
        event(text);
      }}
    >
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
  // const [filters, updateFilters] = useState();
  // console.log('ProductBlock', item);
  const navigation = useNavigation();
  // const [sa, setsa] = useState();
  return (
    <View style={styles.productsContainer}>
      {console.log('item.productId', item.productId)}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate(NavProductDetailPage, {
            ProductId: item.productid,
            VariantId: item.varientid,
          })
        }
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginVertical: 10,
          }}
        >
          {/* <TouchableOpacity> */}
          <View
            style={{
              flex: 5,
              marginLeft: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item.image == '' && (
              <Image
                source={require('app-assets/no-image.jpg')}
                style={styles.productsImage}
              />
            )}
            {item.image != '' && (
              <Image source={{uri: item.image}} style={styles.productsImage} />
            )}
            {/* </TouchableOpacity> */}
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
              {item.productname + ' ' + item.varientname}
            </Text>
            <Text style={styles.gradeText}>{`GRADE ` + item.grade}</Text>
            <Text style={[{...styles.productsTitle, color: '#F08080'}]}>
              {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
  );
};

// const ProductBlock = ({item, index}) => {
//   // console.log('text');
//   // console.log(item.text);
//   return (
//     <View style={styles.productsContainer}>
//       <View
//         style={{
//           flex: 1,
//           flexDirection: 'row',
//           marginVertical: 10,
//         }}
//       >
//         <View
//           style={{
//             flex: 5,
//             marginLeft: 5,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <TouchableOpacity>
//             {item.image == '' && (
//               <Image
//                 source={require('app-assets/no-image.jpg')}
//                 style={styles.productsImage}
//               />
//             )}
//             {item.image != '' && (
//               <Image source={{uri: item.image}} style={styles.productsImage} />
//             )}
//           </TouchableOpacity>
//         </View>
//         <View style={{flex: 1, paddingHorizontal: 5}}>
//           <Icon name={'favorite-border'} size={30} color={'#D3D3D3'} />
//         </View>
//       </View>
//       <View
//         style={{
//           marginLeft: 5,
//           marginTop: 5,
//           flex: 1,
//         }}
//       >
//         <View>
//           <Text style={{...styles.productsTitle, height: 45}}>
//             {item.productname + ' ' + item.varientname}
//           </Text>
//           <Text style={styles.gradeText}>{`GRADE ` + item.grade}</Text>
//           <Text style={[{...styles.productsTitle, color: '#F08080'}]}>
//             {item.price}
//           </Text>
//         </View>
//         <View style={{marginVertical: 15}}>
//           <TouchableOpacity
//             underlay
//             style={{
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginBottom: 5,
//             }}
//             onPress={() => {
//               addToCart;
//             }}
//           >
//             <Text color="#1877F2" style={styles.addToCartButton}>
//               Add to Cart
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };
export default ProductListing;
