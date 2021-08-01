import base64 from 'base-64';
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

const BulkListing = props => {
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
    // console.log(props.customer.customerId);
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
        console.log(currentBulkProduct);
      }
    }
  }, [bulkProductLoading, bulkProductData]);

  return isBulkProductFetched && <></>;
};

const mapStateToProps = (state, props) => {
  return {
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(BulkListing);
