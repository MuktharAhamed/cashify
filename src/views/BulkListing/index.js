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
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import styles from 'app-views/BulkListing/style';
import {log} from 'react-native-reanimated';

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
                bulkProduct.gradeDetails = grades;
                // console.log('obj', grades);
                // var allGrades = Object.entries(grades);
                // console.log('allGrades', allGrades);
                // if (allGrades.length > 0) {
                //   allGrades.forEach(
                //     (g, i) => (bulkProduct.gradeDetails[g[0]] = g[1]),
                //     // (bulkProduct.gradeDetails =
                //     //   bulkProduct.gradeDetails == ''
                //     //     ? g.join(':')
                //     //     : `${bulkProduct.gradeDetails} ${g.join(':')}`),
                //   );
                // }
                console.log(
                  'bulkProduct.gradeDetails[i]',
                  bulkProduct.gradeDetails,
                );
                // bulkProduct.variants.push(currentVariant);
              });
              //   console.log(bulkProduct.title);
              //   console.log('bulkProduct.gradeDetails');
              //   console.log(bulkProduct.gradeDetails);
              //   bulkProduct.costPerUnit = TotalPrice
              // console.log(bulkProduct);
              currentBulkProducts.push(bulkProduct);
            }
          });
        }
      }
      console.log('currentBulkProducts', currentBulkProducts);
      setBulkCollections(currentBulkProducts);
      console.log('bulkCollections', bulkCollections);
    }
  }, [bulkProductsLoading, bulkProductsData]);
  const renderProductlist = ({item}) => {
    {
      console.log('item', item);
    }
    return <ProductBlock item={item} />;
  };
  return (
    // isBulkCollectionsFetched && (
    <View>
      <FlatList
        data={bulkCollections} //allVariants
        keyExtractor={item => item.ProductId} //has to be unique
        renderItem={renderProductlist} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
        contentContainerStyle={{paddingBottom: 30}}
      />
    </View>
    // )
  );
};

const ProductBlock = ({item}) => {
  const navigation = useNavigation();
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
          <View
            style={{
              flex: 5,
              marginLeft: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('app-assets/no-image.jpg')}
              style={styles.productsImage}
            />
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
              {`Bulk Lot of ` + item.TotalProductsCount + ` devices`}
            </Text>
            <Text style={[{...styles.productsTitle, color: '#F08080'}]}>
              {item.TotalPrice}
            </Text>
            <Text style={[{...styles.productsTitle, color: '#F08080'}]}>
              {`₹ ` + item.TotalPrice / item.TotalProductsCount}
            </Text>
          </View>
          <View style={styles.grade}>
            <View style={styles.gradeListing}>
              <Text>
                Grade:
                {/* {item.gradeDetails['A']} */}
                {'    '}
              </Text>
              <Text>
                A:
                {Object.values('' + item.gradeDetails['A']).length == 1
                  ? '' + item.gradeDetails['A'] + 0
                  : Object.values('' + item.gradeDetails['A']).length == 2
                  ? item.gradeDetails['A']
                  : '00'}
                {'    '}
              </Text>
              <Text>
                B:
                {Object.values('' + item.gradeDetails['B']).length == 1
                  ? '' + item.gradeDetails['B'] + 0
                  : Object.values('' + item.gradeDetails['B']).length == 2
                  ? item.gradeDetails['B']
                  : '00'}
                {'    '}
              </Text>
            </View>
            <View style={styles.gradeListing}>
              <Text>
                C:
                {Object.values('' + item.gradeDetails['C']).length == 1
                  ? '' + item.gradeDetails['C'] + 0
                  : Object.values('' + item.gradeDetails['C']).length == 2
                  ? item.gradeDetails['C']
                  : '00'}
                {'       '}
              </Text>
              <Text>
                D:
                {Object.values('' + item.gradeDetails['D']).length == 1
                  ? '' + item.gradeDetails['D'] + 0
                  : Object.values('' + item.gradeDetails['D']).length == 2
                  ? item.gradeDetails['D']
                  : '00'}
                {'     '}
              </Text>
              <Text>
                E:
                {Object.values('' + item.gradeDetails['E']).length == 1
                  ? '' + item.gradeDetails['E'] + 0
                  : Object.values('' + item.gradeDetails['E']).length == 2
                  ? item.gradeDetails['E']
                  : '00'}
                {'    '}
              </Text>
            </View>
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

const mapStateToProps = (state, props) => {
  console.log('state');
  console.log(state);
  return {
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(BulkListing);
