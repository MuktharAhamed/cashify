import utf8 from 'utf8';
import {gql, useMutation, useLazyQuery, useQuery} from '@apollo/client';
import {
  GraphqlAdminApi,
  GraphqlStoreFrontApi,
} from 'app-constants/GraphqlConstants';
import * as Constants from 'app-constants/ProductConstants';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
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
import styles from 'app-views/BulkDetail/style';
import {Button} from 'react-native-paper';
import style from 'app-views/Home/style';
// import {Link} from 'react-native-paper';

////https://shopify.dev/custom-storefronts/checkout#update-the-checkout

const getBulkProductDetail = gql`
  query getBulkProduct($input: ID!) {
    node(id: $input) {
      ... on Product {
        id
        title
        metafields(first: 10) {
          edges {
            node {
              id
              key
              value
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              quantityAvailable
              sku
              priceV2 {
                amount
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

const BulkDetail = props => {
  const [productsCanBeRemoved, setProductsThatCanBeRemoved] = useState(0);
  const [currentBulkProduct, setCurrentBulkProduct] = useState({});
  const [isBulkProductFetched, setBulkProductFetched] = useState(false);
  const [
    fetchBulkProduct,
    {
      loading: bulkProductLoading,
      error: bulkProductError,
      data: bulkProductData,
    },
  ] = useLazyQuery(getBulkProductDetail, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    console.log('route params', props.route?.params);
    var productId;
    if (props.route?.params?.ProductId) {
      console.log('contains product id', props);
      productId = props.route.params?.ProductId;
    } else {
      productId = 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY5MjE1NDA1MDE2NjA=';
    }
    if (props.customer.customerId != null) {
      fetchBulkProduct({
        context: GraphqlStoreFrontApi,
        variables: {
          input: productId,
        },
      });
    }
  }, []);

  useEffect(() => {
    console.log(bulkProductError);
    if (
      !bulkProductLoading &&
      bulkProductData != null &&
      bulkProductData.node != null
    ) {
      if (bulkProductData.node.metafields?.edges?.length > 0) {
        var productsThatCanBeRemoved =
          bulkProductData.node.metafields.edges?.find(meta => {
            return meta.node.key == Constants.BulkProductsRemovalCount;
          })?.node.value;
        if (
          productsThatCanBeRemoved != null ||
          productsThatCanBeRemoved != undefined
        ) {
          setProductsThatCanBeRemoved(parseFloat(productsThatCanBeRemoved));
        }
      }
      var currentBulkProduct = {};
      currentBulkProduct.id = bulkProductData.node.id;
      currentBulkProduct.title = bulkProductData.node.title;
      currentBulkProduct.allVariants = [];
      currentBulkProduct.TotalPrice = 0;
      currentBulkProduct.gradeDetails = {};
      currentBulkProduct.brandDetails = {};
      if (bulkProductData.node?.variants?.edges?.length > 0) {
        currentBulkProduct.TotalProductsCount =
          bulkProductData.node?.variants?.edges?.length;
        bulkProductData.node?.variants?.edges.forEach(variant => {
          if (variant.node.quantityAvailable > 0) {
            var currentProdGrade = variant.node.selectedOptions.find(
              a => a.name.toLowerCase() == Constants.PRODUCT_GRADE,
            )?.value;
            var currentVariant = {};
            if (!currentBulkProduct.gradeDetails[currentProdGrade]) {
              currentBulkProduct.gradeDetails[currentProdGrade] = 1;
            } else {
              currentBulkProduct.gradeDetails[currentProdGrade] += 1;
            }
            var currrentProductBrand = variant.node?.sku;
            if (!currentBulkProduct.brandDetails[currrentProductBrand]) {
              currentBulkProduct.brandDetails[currrentProductBrand] = 1;
            } else {
              currentBulkProduct.brandDetails[currrentProductBrand] += 1;
            }
            currentVariant.id = variant.node.id;
            currentVariant.title = variant.node.selectedOptions.find(
              a => a.name.toLowerCase() == Constants.PRODUCT_NAME,
            )?.value;
            currentVariant.grade = currentProdGrade;
            currentVariant.size = variant.node.selectedOptions.find(
              a => a.name.toLowerCase() == Constants.PRODUCT_SIZE,
            )?.value;
            currentVariant.price = variant.node?.priceV2?.amount;
            var currentPrice = parseFloat(currentVariant.price);
            currentBulkProduct.TotalPrice +=
              currentPrice > 0 ? currentPrice : 0;
            currentBulkProduct.allVariants.push(currentVariant);
          }
        });
        setCurrentBulkProduct(currentBulkProduct);
        setBulkProductFetched(true);
        console.log('currentBulkProduct', currentBulkProduct);
      }
    }
  }, [bulkProductLoading, bulkProductData]);

  return (
    isBulkProductFetched && (
      <ScrollView style={{flex: 1}}>
        <View style={styles.detaillisting}>
          <Image
            source={require('app-assets/mob/mobile1.jpg')}
            style={styles.productsImage}
          />
          <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Bulk Lot Of {currentBulkProduct.TotalProductsCount} Devices
            </Text>
            <Text style={styles.textgrey}>CASHIFYBFV</Text>
            <Text style={styles.textgrey}>Type: pre-used</Text>
            <Text style={styles.textgrey}>
              Bulk Price:
              <Text style={{fontSize: 18, marginTop: 4, color: 'red'}}>
                {'  '}₹{currentBulkProduct.TotalPrice}
              </Text>
            </Text>
            <Text style={{fontSize: 14, marginTop: 2, color: 'red'}}>
              ₹
              {currentBulkProduct.TotalPrice /
                currentBulkProduct.TotalProductsCount}
              /Devices
            </Text>
          </View>
          <View style={{marginTop: 1}}>
            <Icon name={'favorite-border'} size={30} color={'#D3D3D3'} />
          </View>
        </View>
        <GradeListing products={currentBulkProduct} />
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{fontWeight: 'bold'}}>Lot Composition</Text>
            <Icon
              style={{color: 'black'}}
              name={'file-download'}
              size={30}
              color={'#D3D3D3'}
            />
          </View>
          <Text style={{color: 'grey'}}>
            You can reject upto 2 Devices from this Lot
          </Text>
        </View>
        {currentBulkProduct.allVariants?.map((item, index) => {
          return <ProductList key={index} text={item} />;
        })}
        <GradingProcess />
        <Button
          mode="contained"
          style={{
            marginLeft: 12,
            marginRight: 24,
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          buy now{' '}
        </Button>
      </ScrollView>
    )
  );
};

const GradeListing = ({products}) => {
  console.log('GradeListing');
  return (
    <View style={styles.boxview}>
      <Text style={{fontWeight: 'bold', marginTop: 3}}>Grades</Text>
      <View
        style={{
          borderBottomColor: 'lightgrey',
          borderBottomWidth: 2,
          alignSelf: 'stretch',
          marginHorizontal: 10,
          marginTop: 5,
        }}
      />
      {Object.entries(products.gradeDetails)?.map((item, index) => {
        return <Grade key={index} text={item} />;
      })}
      <Text style={{fontWeight: 'bold', marginTop: 15}}>Brands</Text>
      <View
        style={{
          borderBottomColor: 'lightgrey',
          borderBottomWidth: 2,
          alignSelf: 'stretch',
          marginHorizontal: 10,
          marginTop: 5,
        }}
      />
      {Object.entries(products.brandDetails)?.map((item, index) => {
        return <Brands key={index} text={item} />;
      })}
    </View>
  );
};
const Grade = ({text}) => {
  console.log('gradecall', text[0]);
  return (
    <View style={styles.view}>
      <Text style={styles.gradeText}>
        {'GRADE ' + text[0]}
        {'  '}
      </Text>
      <Text>{text[1] + ' units'}</Text>
    </View>
  );
};
const Brands = ({text}) => {
  return (
    <View style={styles.view}>
      <Text>
        {text[0]}
        {'  '}
      </Text>
      <Text>{text[1] + ' units'}</Text>
    </View>
  );
};

const ProductList = ({text}) => {
  console.log(text?.id, 'ProductList');
  return (
    <View style={[styles.boxview, {marginTop: 10}]}>
      <View
        style={{display: 'flex', flexDirection: 'row', paddingVertical: 10}}
      >
        <Image
          source={require('app-assets/mob/mobile1.jpg')}
          style={styles.productsImage}
        />
        <View>
          <Text>{text?.title + '(' + text?.size + ')'} </Text>
          <Text style={{fontSize: 12, marginTop: 4, color: 'grey'}}>
            Bulk Price:
            <Text style={{fontSize: 18, marginTop: 4, color: 'black'}}>
              {'  '}₹{text?.price}
            </Text>
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <Text style={styles.gradeText}>Grade {text?.grade}</Text>
            <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
              View Complete Report
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Button>View Images</Button>
        <Button>Reject Device</Button>
      </View>
    </View>
  );
};

const GradingProcess = () => {
  return (
    <View style={[styles.boxview, {marginTop: 10, paddingVertical: 10}]}>
      <Text>Cashify Grading Process</Text>
      <Text
        style={{
          color: 'blue',
          textDecorationLine: 'underline',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Discription of how the given grade devices will look like
      </Text>
    </View>
  );
};
const mapStateToProps = (state, props) => {
  return {
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(BulkDetail);
