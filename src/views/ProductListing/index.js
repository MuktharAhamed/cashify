import * as ProductConstants from 'app-constants/ProductConstants.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

import store from '../../store/index';
import {setCustomer} from '../../action/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import * as action from '../../action/index';
import {useNavigation} from '@react-navigation/native';

import {
  GraphqlAdminApi,
  GraphqlStoreFrontApi,
} from 'app-constants/GraphqlConstants';
import {Button} from 'react-native-paper';
import {Searchbar} from 'react-native-paper';
import Catergories from 'app-views/Home/Categories';
import ByPrice from 'app-views/Home/ByPrice';
import ByGrade from 'app-views/Home/ByGrade';
import ByBrand from 'app-views/Home/ByBrand';
import TodaysDeals from 'app-views/Home/TodaysDeals';

import styles from 'app-views/ProductListing/style';

import {gql, useLazyQuery, useMutation} from '@apollo/client';
import {
  createCheckout,
  CheckoutLineAdd,
  checkoutCustomerAssociate,
} from '../../checkOut';

import {
  NavProductDetailPage,
  NavProductListingPage,
} from 'app-constants/Navigations';
import {connect} from 'react-redux';
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

const addproductToFavoritesQuery = gql`
  mutation updateFavoritesForUser($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        metafields(first: 10) {
          edges {
            node {
              key
              value
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const ProductListingPage = props => {
  // console.log('propsnavigation', `title:GRADE ` + props.route.params.text);
  // const [gradetype, setGradetype] = useState(props.route.params.text);
  // const [querytag, setquerytag] = useState(`title:GRADE ` + gradetype);
  const [createCheckoutMut, {data: checkoutData, error: CheckoutError}] =
    useMutation(createCheckout);
  const [LineItemToCart, {data: lineItemResponse, error: linrItemError}] =
    useMutation(CheckoutLineAdd);
  const [
    CustomerAssociate,
    {data: CustomerAssociateData, error: CustomerError},
  ] = useMutation(checkoutCustomerAssociate);
  // const [CheckoutId, setCheckoutId] = useState(props.checkout.CheckoutId)

  // if (checkoutData) {
  //   console.log('checkoutData');
  //   console.log(checkoutData);
  //   if (checkoutData.checkoutCreate?.checkout?.id) props.checkout(checkoutData);
  // }
  // if (lineItemResponse) {
  //   props.lineItem(lineItemResponse);
  // }
  const [
    getProductsByQuery,
    {loading: productLoading, error: productError, data},
  ] = useLazyQuery(query, {
    fetchPolicy: 'network-only',
  });

  const [addProductToFavorites] = useMutation(addproductToFavoritesQuery);
  // const [currentCheckoutId, setCurrentCheckoutId] = useState(
  //   props.checkout.CheckoutId,
  // );
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

  const [favproducts, setFavoriteProducts] = useState([]);
  const [filters, updateFilters] = useState(defaultFilters);
  const [currentVariant, setCurrentVariant] = useState([]);
  // let allVariants = [];
  // let varient = {};
  // console.log('pro', data);
  // console.log('loading', loading);
  // console.log('error', error);

  const associateCheckoutWithUser = async (newCheckoutId, checkoutId) => {
    console.log('associateCheckoutWithUser');
    console.log(checkoutId);
    if (checkoutId != newCheckoutId) {
      var customAssociateResp = await CustomerAssociate({
        context: GraphqlStoreFrontApi,
        variables: {
          checkoutId: newCheckoutId,
          customerAccessToken: props.customer.customerAccessToken,
        },
      });
      console.log('customAssociateResp');
      console.log(customAssociateResp);
    }
  };

  useEffect(() => {
    if (!productLoading && props?.route?.params?.text != null) {
      try {
        var existingFavItems = props.customer.favoriteItems
          ? props.customer.favoriteItems.split(',')
          : [];
        setFavoriteProducts(existingFavItems);
        // console.log('propsload');
        // console.log(props.route.params);
        let input;
        if (props.route.params.from == 'Brand') {
          input = `title:\"${props.route.params.text}\"`;
          // .map(x => `title:\"${x.text}\"`);
        } else {
          input = `title:GRADE ${props.route.params.text}`;
        }
        // console.log(input);

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
    // console.log('productError');
    // console.log(productError);
    if (!productLoading && !productError && data != undefined) {
      if (data.collections.edges.length > 0) {
        var allVariants = [];
        // console.log('data.collections.edges');
        // console.log(data.collections.edges);
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
                        currentProductVariant.IsInFavorites =
                          favproducts.indexOf(currentProductVariant.varientid) >
                          -1;
                        allVariants.push(currentProductVariant);
                      }
                    }
                  });
                  // console.log(product.node.variants);
                } else {
                  // console.log();
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
                    currentProductVariant.IsInFavorites =
                      favproducts.indexOf(currentProductVariant.varientid) > -1;
                    allVariants.push(currentProductVariant);
                  }
                }
              }
            });
          }
        });
        setCurrentVariant(allVariants);
      }
    }
  }, [data, productLoading]);

  useEffect(() => {
    // console.log('hit');
    if (filters.some(a => a.isselected)) {
      var selectedQuery = filters
        .filter(a => a.isselected)
        .map(x => `title:\"${x.text}\"`);
      var filterQuery = [...selectedQuery].join(' OR ');
      try {
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
      // console.log('input', input);

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

  const addOrRemoveProductFromFavoritesHandler = async variantId => {
    var allVariants = currentVariant;
    allVariants.forEach(a => {
      if (a.id == variantId) {
        a.IsInFavorites = true;
      }
    });
    setCurrentVariant(allVariants);
    setFavoriteProducts(prev => [...prev, variantId]);
    // console.log('hit');
    // console.log(variantId);
    if (props.customer.favoriteMetaFieldId) {
      // console.log('props.customer.favoriteItems');
      // console.log(props.customer.favoriteItems);
      var existingFavItems = props.customer.favoriteItems
        ? props.customer.favoriteItems.split(',')
        : [];

      if (!existingFavItems.includes(variantId)) {
        existingFavItems.push(variantId);
      } else {
        // console.log('existingFavItems.length888');
        existingFavItems =
          existingFavItems.length > 0
            ? existingFavItems.filter(a => a != variantId)
            : [];
      }
      // console.log('existingFavItems');
      // console.log(existingFavItems);
      // console.log('existingFavItems.length');
      // console.log(
      //   existingFavItems.length > 0 ? existingFavItems.join(',') : 'null',
      // );
      // console.log(props.customer.favoriteMetaFieldId);
      // console.log();
      var favIds =
        existingFavItems.length > 0 ? existingFavItems.join(',') : '';
      // console.log(favIds);
      var input = {
        input: {
          metafields: {
            id: props.customer.favoriteMetaFieldId,
            namespace: 'favorite_products',
            key: 'Favorites',
            value: favIds,
            valueType: 'STRING',
            // type: 'STRING',
          },
          id: props.customer.customerId,
        },
      };

      var result = await addProductToFavorites({
        context: GraphqlAdminApi,
        variables: input,
      });
      // console.log('result');
      // console.log(result?);
      // console.log(result.data?.customerUpdate?.userErrors);
      if (result && !result.data?.customerUpdate?.userErrors.length > 0) {
        // console.log(result.data?.customerUpdate?.customer.metafields.edges[0]);
        // console.log();
        store.dispatch(
          setCustomer({
            favoriteItems: favIds,
          }),
        );
      }
    }
  };

  const addSelectedFilter = text => {
    // console.log('addSelectedFilter');
    updateFilters(prev => {
      // const existingFilters = prev;
      // console.log('newFilters');
      // console.log(newFilters);
      var selectedFilterIndex = prev.findIndex(x => x.text == text);
      var newFilters = [...prev];
      newFilters[selectedFilterIndex] = {
        ...newFilters[selectedFilterIndex],
        isselected: !newFilters[selectedFilterIndex].isselected,
      };
      return newFilters;
    });
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
        renderItem={({item, index}) => (
          <ProductBlock
            item={item}
            lineItemUpdate={e => {
              LineItemToCart(e);
            }}
            associateCheckoutWithUser={associateCheckoutWithUser}
            createCheckout={createCheckoutMut}
            checkoutId={props.checkout.CheckoutId}
            addToFavorites={addOrRemoveProductFromFavoritesHandler}
          />
        )} //method to render the data in the way you want using styling u need
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

const ProductBlock = ({
  item,
  index,
  associateCheckoutWithUser,
  createCheckout,
  lineItemUpdate,
  checkoutId,
}) => {
  const navigation = useNavigation();
  // console.log(item);
  const addToCart = async varientid => {
    console.log('item.node.variants');
    console.log(varientid);

    console.log(checkoutId);
    if (!checkoutId) {
      console.log('here');
      // console.log(createCheckout);
      const result = await createCheckout({
        context: GraphqlStoreFrontApi,
        variables: {input: {lineItems: [{quantity: 1, variantId: varientid}]}},
      });
      if (!result.data.checkoutCreate?.userErrors?.length > 0) {
        if (result.data.checkoutCreate?.checkout?.id) {
          console.log('result.checkoutCreate?.checkout?.id');
          console.log(result.data.checkoutCreate?.checkout?.id);
          associateCheckoutWithUser(
            result.data.checkoutCreate?.checkout?.id,
            checkoutId,
          );
          // setCurrentCheckoutId(result.checkoutCreate?.checkout?.id);
          // props.checkout(result.data.checkoutCreate?.checkout);
        }
        console.log('result');
        console.log(result.data.checkoutCreate?.checkout?.id);
      } else {
        console.log('Error');
        console.log(result.data.checkoutCreate?.userErrors);
      }
    } else {
      console.log('here lineItemUpdate');
      var linetItemResponse = await lineItemUpdate({
        context: GraphqlStoreFrontApi,
        variables: {
          lineItems: [{quantity: 1, variantId: varientid}],
          checkoutId: checkoutId,
        },
      });
      if (lineItemResponse) {
        props.lineItem(lineItemResponse);
      }
    }

    // let previousData = [...AddToCartList]
    // if (AddToCartList) {
    //   previousData = [...AddToCartList]
    // }
    // previousData.push({ quantity: 1, variantId: item.node.variants.edges[0].node.id })
    // setAddToCartList([...previousData,])
  };

  return (
    <View style={styles.productsContainer}>
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
            <MaterialCommunityIcons
              style={{marginTop: 10}}
              name={item.IsInFavorites ? 'heart' : 'heart-outline'}
              size={30}
              color={item.IsInFavorites ? 'red' : '#A9A9A9'}
            />
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
            addToCart(item.varientid);
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

const mapDispatchToProps = {
  lineItem: action.lineItemData,
  checkout: action.checkoutData,
};

function mapStateToProps(state) {
  return {
    checkout: state.checkout,
    customer: state.customer,
  };
}

export default ProductListing = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductListingPage);

export const PRODUCT_LISTING = 'PRODUCT_LISTING';
