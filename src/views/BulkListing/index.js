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

const getBulkProducts = gql`
  query productsfilter {
    collections(query: "title:*bulk*", first: 1) {
      edges {
        node {
          title
          products(first: 50) {
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
              }
            }
          }
        }
      }
    }
  }
`;

const BulkListing = props => {
  const [bulkCollections, setBulkCollections] = useState([]);
  const [isBulkCollectionsFetched, setBulkCollectionFetched] = useState(false);
  const [
    fetchBulkCollections,
    {
      loading: bulkProductsLoading,
      error: bulkProductsError,
      data: bulkProductsData,
    },
  ] = useLazyQuery(getBulkProducts, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    console.log(props.customer.customerId);
    if (props.customer.customerId != null) {
      fetchBulkCollections({
        context: GraphqlStoreFrontApi,
      });
    }
  }, []);

  useEffect(() => {
    console.log(bulkProductsError);
    if (!bulkProductsLoading && bulkProductsData != null) {
      console.log('bulkProductsData');

      if (bulkProductsData?.collections?.edges?.length > 0) {
        var bulkCollection = bulkProductsData?.collections?.edges[0].node;

        if (bulkCollection && bulkCollection.products?.edges?.length > 0) {
          var currentBulkProducts = [];
          bulkCollection.products?.edges.forEach(product => {
            // console.log('product');
            // console.log(product);
            var bulkProduct = {};
            bulkProduct.title = product.node.title;
            bulkProduct.ProductId = product.node.id;
            bulkProduct.TotalProductsCount =
              product.node.variants?.edges?.length;
            //  = [];
            if (product.node.variants?.edges?.length > 0) {
              bulkProduct.TotalPrice = 0;
              var grades = {};
              product.node.variants?.edges.forEach(variant => {
                // console.log('variandt');
                // var currentVariant = {};
                // console.log(currentProdGrade);

                var currentProdGrade = variant.node?.selectedOptions?.find(
                  a => a.name?.toLowerCase() == Constants.PRODUCT_GRADE,
                )?.value;
                if (!grades[currentProdGrade]) {
                  grades[currentProdGrade] = 1;
                } else {
                  grades[currentProdGrade] += 1;
                }
                // console.log(grades[currentProdGrade]);
                var currentPrice = parseFloat(variant.node.price);
                bulkProduct.TotalPrice =
                  currentPrice != undefined && currentPrice > 0
                    ? bulkProduct.TotalPrice + currentPrice
                    : 0;
                bulkProduct.gradeDetails = '';
                var allGrades = Object.entries(grades);
                if (allGrades.length > 0) {
                  allGrades.forEach(
                    g =>
                      (bulkProduct.gradeDetails =
                        bulkProduct.gradeDetails == ''
                          ? g.join(':')
                          : `${bulkProduct.gradeDetails} ${g.join(':')}`),
                    //////bulkProduct.gradeDetails.push(g.join(':'));
                  );
                }
                // bulkProduct.variants.push(currentVariant);
              });
              //   console.log(bulkProduct.title);
              //   console.log('bulkProduct.gradeDetails');
              //   console.log(bulkProduct.gradeDetails);
              //   bulkProduct.costPerUnit = TotalPrice
              console.log(bulkProduct);
              currentBulkProducts.push(bulkProduct);
            }
          });
        }
      }
    }
  }, [bulkProductsLoading, bulkProductsData]);

  return isBulkCollectionsFetched && <></>;
};

const mapStateToProps = (state, props) => {
  console.log('state');
  console.log(state);
  return {
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(BulkListing);
