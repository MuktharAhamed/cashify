import ProductAvailableOptions from './ProductAvailableOptions';
import base64 from 'base-64';
import store from '../../store/index';
import {setCustomer} from '../../action/index';
import utf8 from 'utf8';
import {gql, useMutation, useLazyQuery, useQuery} from '@apollo/client';
import {GraphqlAdminApi} from 'app-constants/GraphqlConstants';
import * as Constants from 'app-constants/ProductConstants';
import React, {useState, useEffect} from 'react';
import ProductImageZoom from './ProductZoom';
import SampleImagesSlider from './SampleImagesSlider';
import {connect} from 'react-redux';
// import Specifications from './Specifications';
import {
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import RelatedProducts from './relatedProducts';
import styles from 'app-views/ProductDetail/style';
import Specifications from './Specifications';

const relatedProductQuery = gql`
  query getRelatedProducts($input: String!) {
    productVariants(first: 50, query: $input) {
      edges {
        node {
          id
          inventoryQuantity
          title
          selectedOptions {
            name
            value
          }
          price
          product {
            id
            images(first: 1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            title
          }
        }
      }
    }
  }
`;

const getProductQuery = gql`
  query getProductQuery($input: ID!) {
    product(id: $input) {
      description
      id
      title
      images(first: 1) {
        edges {
          node {
            id
            originalSrc
          }
        }
      }
      metafields(first: 50) {
        edges {
          node {
            key
            id
            value
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price
            inventoryQuantity
            selectedOptions {
              value
              name
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

const ProductDetail = props => {
  const [fetchProductQuery, {loading, error, data}] = useLazyQuery(
    getProductQuery,
    {
      fetchPolicy: 'network-only',
    },
  );
  const [
    getRelatedProducts,
    {
      loading: relatedProdLoading,
      error: relatedProdError,
      data: relatedProdData,
    },
  ] = useLazyQuery(relatedProductQuery, {
    fetchPolicy: 'network-only',
  });

  const [addProductToFavorites] = useMutation(addproductToFavoritesQuery);

  const defaultProd = {
    imgUrl: {
      id: '',
      imgSrc: '',
    },
    productTitle: '',
    productId: '',
  };

  const [relatedProducts, setRelatedProducts] = useState([{}]);
  const [iscurrentProdInFav, setCurrentProdFav] = useState(false);
  const [showRelatedProducts, setShowRelatedProducts] = useState(false);
  const [availableVariants, setAllAvailableVariants] = useState([]);
  const [zoomProductImage, setZoomProductImage] = useState(false);
  const [qtyValue, setQtyInputText] = useState('1');
  const [selectedVariant, setSelectedVariant] = useState({});
  const [showSampleImages, setShowSampleImages] = useState(false);
  const [isProductFetched, setIsProductFetched] = useState(false);

  const quantityTextHandler = e => {
    setQtyInputText(e.replace(/[^0-9]/g, ''));
  };

  const increaseQtyHandler = () => {
    setQtyInputText(prevState => {
      var qty = parseInt(prevState);
      qty += 1;
      return qty.toString();
    });
  };

  const addOrRemoveProductFromFavoritesHandler = async variantId => {
    // console.log(props.customer);
    // setSelectedVariant(prev => {
    //   return {
    //     ...prev,
    //     isProductInFavorites: !prev.isProductInFavorites,
    //   };
    // });
    setCurrentProdFav(prev => !prev);
    console.log('hit');
    console.log(variantId);
    if (props.customer.favoriteMetaFieldId) {
      console.log('props.customer.favoriteItems');
      console.log(props.customer.favoriteItems);
      var existingFavItems = props.customer.favoriteItems
        ? props.customer.favoriteItems.split(',')
        : [];

      if (!existingFavItems.includes(variantId)) {
        existingFavItems.push(variantId);
      } else {
        console.log('existingFavItems.length888');
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
      console.log(favIds);
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
      console.log('result');
      // console.log(result?);
      console.log(result.data?.customerUpdate?.userErrors);
      if (result && !result.data?.customerUpdate?.userErrors.length > 0) {
        console.log(result.data?.customerUpdate?.customer.metafields.edges[0]);
        console.log();
        store.dispatch(
          setCustomer({
            favoriteItems: favIds,
          }),
        );
      }
    }
  };

  const decreaseQtyHandler = () => {
    setQtyInputText(prevState => {
      var qty = parseInt(prevState);
      qty -= 1;
      return qty.toString();
    });
  };

  const showsampleImagesHandler = () => {
    setShowSampleImages(!showSampleImages);
  };

  useEffect(() => {
    console.log('relatedProdError');
    if (
      !relatedProdLoading &&
      relatedProdData &&
      !relatedProdError &&
      selectedVariant != null
    ) {
      console.log('relatedProdError 2');
      if (relatedProdData.productVariants.edges.length > 0) {
        var allRelatedProducts = [];
        relatedProdData.productVariants.edges.forEach(currentProd => {
          var relatedProd = {};
          const productIdBytes = utf8.encode(currentProd.node.product.id);
          relatedProd.productId = base64.encode(productIdBytes);
          if (relatedProd.productId == selectedVariant.productId) return;
          if (
            allRelatedProducts.some(
              prd => prd.productId == relatedProd.productId,
            )
          ) {
            return;
          }
          const utf8Bytes = utf8.encode(currentProd.node.id);
          relatedProd.title = currentProd?.node?.product?.title;
          if (currentProd?.node?.product?.images?.edges?.length > 0) {
            relatedProd.ImageUrl =
              currentProd?.node?.product?.images?.edges[0].node.originalSrc;
          } else {
            relatedProd.ImageUrl = '';
          }
          relatedProd.variantId = base64.encode(utf8Bytes);
          relatedProd.price = currentProd.node.price;
          relatedProd.grade = currentProd.node.selectedOptions.find(
            x => x.name.toLowerCase() == Constants.PRODUCT_GRADE,
          )?.value;
          relatedProd.size = currentProd.node.selectedOptions.find(
            x => x.name.toLowerCase() == Constants.PRODUCT_SIZE,
          )?.value;
          relatedProd.ram = currentProd.node.selectedOptions.find(
            x => x.name.toLowerCase() == Constants.PRODUCT_RAM,
          )?.value;
          allRelatedProducts.push(relatedProd);
        });
        setRelatedProducts(allRelatedProducts);
        setShowRelatedProducts(true);
      }
    }
  }, [relatedProdData, relatedProdLoading]);

  useEffect(() => {
    if (!loading && data != null) {
      if (error) {
        console.log(error);
      } else {
        const imageData = {};
        if (data.product.images.edges.length > 0) {
          imageData.id = data.product.images.edges[0].node.id;
          imageData.imgSrc = data.product.images.edges[0].node.originalSrc;
        }
        // console.log('data.prod.metafields');
        console.log(data.product);
        // console.log('data.prod.metafields2');
        console.log(data.product.metafields?.edges);
        // var metafields =

        const prodBytes = utf8.encode(data.product.id);
        const prodId = base64.encode(prodBytes);
        const allVariants = [];
        data.product.variants.edges.forEach(x => {
          if (x.node.inventoryQuantity > 0) {
            const utf8Bytes = utf8.encode(x.node.id);
            const variantId = base64.encode(utf8Bytes);
            // console.log(base64.encode(utf8Bytes));
            // console.log('base64.encode(utf8Bytes)');
            allVariants.push({
              productTitle: data.product.title,
              productId: prodId,
              imgUrl: imageData,
              specs:
                data.product.metafields?.edges.length > 0
                  ? data.product.metafields?.edges
                  : null,
              id: variantId,
              title: x.node.title.replace('/', ' '),
              price: x.node.price,
              grade: x.node.selectedOptions.find(
                x => x.name.toLowerCase() == Constants.PRODUCT_GRADE,
              )?.value,
              ram: x.node.selectedOptions.find(
                x => x.name.toLowerCase() == Constants.PRODUCT_RAM,
              )?.value,
              size: x.node.selectedOptions.find(
                x => x.name.toLowerCase() == Constants.PRODUCT_SIZE,
              )?.value,
            });
          }
        });
        var currentSelectedVariant;
        if (props.routeParams?.VariantId) {
          currentSelectedVariant = allVariants.find(
            x => x.id == props.routeParams?.VariantId,
          );
        } else {
          currentSelectedVariant = allVariants[0];
        }
        var favoriteList = props.customer.favoriteItems.split(',');
        setCurrentProdFav(favoriteList.includes(currentSelectedVariant.id));
        setSelectedVariant(currentSelectedVariant);
        setAllAvailableVariants(allVariants);
        setIsProductFetched(true);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (selectedVariant != null && selectedVariant.ram != null) {
      try {
        ///Match to get the number alone in size ignoring "GB".
        var favItems = props.customer.favoriteItems
          ? props.customer.favoriteItems.split(',')
          : [];
        console.log('asdasdasdas');
        console.log(favItems);
        setCurrentProdFav(favItems.includes(selectedVariant.id));
        var relatedProductsInp = {
          input: `title:*${selectedVariant.ram.match(/\d+/g)}*`,
        };
        getRelatedProducts({
          context: GraphqlAdminApi,
          variables: relatedProductsInp,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [selectedVariant]);

  useEffect(() => {
    var productId;
    if (props.route?.params?.ProductId && props.route?.params?.VariantId) {
      productId = props.route.params?.ProductId;
    } else {
      productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY5MDczNDM5Mjk1MDA=';
    }
    fetchProductQuery({
      context: GraphqlAdminApi,
      variables: {
        input: productId,
      },
    });
  }, []);
  // const closeButton = (
  //   <Text
  //     style={{flex: 6, color: '#ffff'}}
  //     onPress={() => {
  //       setZoomProductImage(false);
  //     }}
  //   >
  //     X
  //   </Text>
  // );
  const zoomProductImageHandler = () => {
    setZoomProductImage(prev => !prev);
  };

  const changeVariantHandler = (ram, size, grade) => {
    if (ram != '' && grade != '') {
      var currentVariant = availableVariants.find(
        a => a.ram == ram && a.size == size && a.grade == grade,
      );
      if (currentVariant) {
        setSelectedVariant(currentVariant);
      }
    }
  };

  return (
    <>
      {isProductFetched && (
        <>
          <SampleImagesSlider
            selectedGrade={selectedVariant.grade}
            closePopup={showsampleImagesHandler}
            showSampleProducts={showSampleImages}
          />
          <View style={styles.container}>
            <ScrollView>
              <ProductBlock
                isProductInFavorites={iscurrentProdInFav}
                addProductToFavorites={addOrRemoveProductFromFavoritesHandler}
                handler={zoomProductImageHandler}
                imgUrl={selectedVariant?.imgUrl?.imgSrc}
                title={[
                  selectedVariant.productTitle,
                  ' - ',
                  'Grade ' + selectedVariant.grade,
                  ' ',
                  selectedVariant.ram,
                  '/',
                  selectedVariant.size,
                ].join('')}
                grade={selectedVariant.grade}
                price={selectedVariant.price}
                id={selectedVariant.id}
              />
              <ProductImageZoom
                zoomImageHandler={setZoomProductImage}
                zoomProductImage={zoomProductImage}
                ImageUrl={selectedVariant?.imgUrl?.imgSrc}
              />
              <View>
                <Text style={styles.SelectAttrText}>Available Options</Text>
              </View>
              <View>
                <ProductAvailableOptions
                  allAvailableVariants={availableVariants}
                  selectedVariant={selectedVariant}
                  changeVariantHandler={changeVariantHandler}
                />
              </View>

              <View style={styles.qtySection}>
                <View style={styles.qtyTextContainer}>
                  <Text style={styles.SelectQtyText}>Select Quantity</Text>
                </View>
                <View style={styles.InputContainer}>
                  <TouchableOpacity
                    disabled={qtyValue == 1}
                    onPress={decreaseQtyHandler}
                  >
                    <Icon
                      style={styles.qtyInputIcons}
                      name="remove"
                      size={20}
                    />
                  </TouchableOpacity>
                  <TextInput
                    underlineColorAndroid="transparent"
                    keyboardType={'numeric'}
                    style={{...styles.qtyInput}}
                    onChangeText={quantityTextHandler}
                    value={qtyValue}
                  />
                  <TouchableOpacity onPress={increaseQtyHandler}>
                    <Icon style={styles.qtyInputIcons} name="add" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Specifications Specifications={selectedVariant.specs} />
              </View>
              <View style={styles.InformationSection}>
                <View style={{flex: 5}}>
                  <TouchableWithoutFeedback onPress={showsampleImagesHandler}>
                    <Text style={styles.InformationTitle}>
                      Check the sample images for your reference
                    </Text>
                  </TouchableWithoutFeedback>
                  <Text style={styles.InformationContent}>
                    Please note that these images are not the exact replica of
                    this device, they are just a representation of the physical
                    condition.
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity onPress={showsampleImagesHandler}>
                    <Icon
                      name="arrow-right"
                      size={20}
                      color="black"
                      type="entypo"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {showRelatedProducts && (
                <RelatedProducts products={relatedProducts} />
              )}
              <View
                style={{
                  ...styles.InformationSection,
                  marginVertical: 5,
                  marginHorizontal: 10,
                }}
              >
                <View style={{flex: 5}}>
                  <Text style={styles.InformationTitle}>
                    Check out our grading process
                  </Text>
                  <Text style={styles.InformationContent}>
                    Description on how the products looks like
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Icon
                    name="arrow-right"
                    size={20}
                    color="black"
                    type="entypo"
                  />
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.StaticFooterContainer}>
            <View style={styles.StaticFooter}>
              <TouchableOpacity underlay style={{flex: 3}}>
                <Button color="#1877F2" style={styles.addToCartButton}>
                  Add to Cart
                </Button>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 3}}>
                <Button color="#ffff" style={styles.buyButton}>
                  Buy now
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const ProductBlock = ({
  isProductInFavorites,
  addProductToFavorites,
  handler,
  imgUrl,
  title,
  grade,
  price,
  id,
}) => {
  return (
    <View
      style={{
        ...styles.boxShadw,
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
      }}
    >
      <View style={{flex: 2}}>
        <TouchableOpacity onPress={handler}>
          {imgUrl != '' && (
            <Image
              style={styles.prod_img}
              source={{
                uri: imgUrl,
              }}
            />
          )}
          {imgUrl == '' && (
            <Image
              source={require('app-assets/no-image.jpg')}
              style={styles.prod_img}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={{flex: 3}}>
        <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
          {title.toUpperCase()}
        </Text>
        <Text
          style={{
            ...styles.bygradetext,
            color: '#42c8b7',
          }}
        >
          {'Grade ' + grade}
        </Text>
        <Text style={styles.priceText}>{'₹ ' + price}</Text>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            addProductToFavorites(id);
          }}
        >
          <MaterialCommunityIcons
            style={{marginTop: 10}}
            name={isProductInFavorites ? 'heart' : 'heart-outline'}
            size={30}
            color={isProductInFavorites ? 'red' : '#A9A9A9'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state, props) => {
  console.log('state');
  console.log(state);
  return {
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(ProductDetail);
