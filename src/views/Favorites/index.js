// import ProductAvailableOptions from './ProductAvailableOptions';
import base64 from 'base-64';
import utf8 from 'utf8';
import {gql, useMutation, useLazyQuery, useQuery} from '@apollo/client';
import {
  NavProductDetailPage,
  NavProductListingPage,
} from 'app-constants/Navigations';
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
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import styles from 'app-views/Favorites/style';
import store from '../../store/index';
import {setCustomer} from '../../action/index';
import toast from 'app-views/common/Toast';

const getFavoritesQuery = gql`
  query getFavorites($input: [ID!]!) {
    nodes(ids: $input) {
      ... on ProductVariant {
        id
        inventoryQuantity
        price
        title
        selectedOptions {
          name
          value
        }
        product {
          id
          title
          images(first: 1) {
            edges {
              node {
                originalSrc
              }
            }
          }
        }
      }
    }
  }
`;

const getCustomer = gql`
  query getCustomerFavorites($customerAccessToken: ID!) {
    customer(id: $customerAccessToken) {
      metafields(first: 10) {
        edges {
          node {
            id
            key
            namespace
            value
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

const Favorites = props => {
  console.log('favorites');
  const [isFavoritesFetched, setfavoritesFetched] = useState(false);
  const [allFavorites, setAllFavorites] = useState([]);
  const [fetchCusotomer, {loading, error, data}] = useLazyQuery(getCustomer, {
    fetchPolicy: 'network-only',
  });
  const [addProductToFavorites] = useMutation(addproductToFavoritesQuery);
  const [
    fetchFavoriteItems,
    {loading: favoritesLoading, error: favoritesError, data: favoritesData},
  ] = useLazyQuery(getFavoritesQuery, {
    fetchPolicy: 'network-only',
  });
  const addOrRemoveProductFromFavoritesHandler = async variantId => {
    console.log('hit');
    console.log(base64.decode(variantId));
    if (props.customer.favoriteMetaFieldId) {
      console.log('props.customer.favoriteItems');
      console.log(props.customer.favoriteItems);
      var existingFavItems = props.customer.favoriteItems
        ? props.customer.favoriteItems.split(',')
        : [];

      if (existingFavItems.includes(variantId)) {
        existingFavItems =
          existingFavItems.length > 0
            ? existingFavItems.filter(a => a != variantId)
            : [];
        setAllFavorites(
          allFavorites.filter(fav => fav.variantId != base64.decode(variantId)),
        );
        toast({
          text: 'Removed from wishlist',
          xaxis: 50,
          yaxis: 1500,
        });
      }
      var favIds =
        existingFavItems.length > 0 ? existingFavItems.join(',') : '';
      console.log('favIds', favIds);
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
      // console.log(result.data?.customerUpdate?.userErrors);
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

  useEffect(() => {
    // console.log('props.customer.customerAccessToken');
    console.log(props.customer.customerId);
    if (props.customer.customerId != null) {
      fetchCusotomer({
        context: GraphqlAdminApi,
        variables: {
          customerAccessToken: props.customer.customerId,
          //   favoritesKey: Constants.FAVORITESKEY,
          //   favoritesNamespace: Constants.FAVORITESNAMESPACE,
        },
      });
    }
  }, [props?.customer?.customerId]);

  useEffect(() => {
    console.log(error);
    if (!loading && data != null) {
      console.log(data);
      console.log();
      if (data?.customer?.metafields?.edges?.length > 0) {
        console.log('customerdata');
        var favMetaField = data?.customer?.metafields?.edges.find(
          x =>
            x.node.key == 'Favorites' &&
            x.node.namespace == 'favorite_products',
        );
        console.log('favMetaField');
        console.log(favMetaField);
        if (favMetaField) {
          var favoritesIds = favMetaField.node.value.split(',');
          favoritesIds = favoritesIds.filter(x => x != 'null');
          console.log('favoritesIds');
          console.log(favoritesIds);
          if (favoritesIds.length > 0) {
            console.log('fetchFavoriteItems');
            fetchFavoriteItems({
              context: GraphqlAdminApi,
              variables: {
                input: favoritesIds,
              },
            });
          }
        }
      }
    }
  }, [loading, data]);

  useEffect(() => {
    console.log(favoritesError);
    if (!favoritesLoading && favoritesData != null) {
      console.log('favoritesData');
      console.log(favoritesData);
      if (favoritesData.nodes.length > 0) {
        var allVariants = [];
        favoritesData.nodes.forEach(variant => {
          console.log('variant.product');
          console.log(variant);
          var currentProd = {};
          const variantIdBytes = utf8.encode(variant.id);
          var variantId = base64.encode(variantIdBytes);
          currentProd.variantId = variantId;
          currentProd.variantTitle = variant.title;
          currentProd.quantity = variant.inventoryQuantity;
          currentProd.price = variant.price;
          currentProd.prodTitle = variant.product?.title;
          const productIdBytes = utf8.encode(variant.product?.id);
          var productId = base64.encode(productIdBytes);
          currentProd.ProductId = productId;
          currentProd.imageUrl =
            variant.product?.images?.edges?.length > 0
              ? variant.product?.images?.edges[0].node?.originalSrc
              : '';
          currentProd.grade = variant.selectedOptions?.find(
            x => x.name.toLowerCase() == Constants.PRODUCT_GRADE,
          )?.value;
          currentProd.size = variant.selectedOptions?.find(
            x => x.name.toLowerCase() == Constants.PRODUCT_SIZE,
          )?.value;
          currentProd.ram = variant.selectedOptions?.find(
            x => x.name.toLowerCase() == Constants.PRODUCT_RAM,
          )?.value;
          // console.log(currentProd);
          allVariants.push(currentProd);
        });
      }
      console.log('favoritesData');
      setAllFavorites(allVariants);
      setfavoritesFetched(true);
    }
  }, [favoritesLoading, favoritesData]);

  const renderProduct = ({item}) => {
    console.log('renderProduct', item);
    return (
      <ProductBlock
        item={item}
        favHandler={addOrRemoveProductFromFavoritesHandler}
      />
    );
  };
  return (
    isFavoritesFetched && (
      <>
        <FlatList
          data={allFavorites}
          keyExtractor={item => item.variantId}
          renderItem={renderProduct}
          horizontal={false}
          numColumns={2}
          contentContainerStyle={{paddingBottom: 30}}
        />
      </>
    )
  );
};

const ProductBlock = ({item, favHandler}) => {
  const navigation = useNavigation();
  console.log('item');
  console.log(item);

  return (
    <View style={styles.productsContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate(NavProductDetailPage, {
            ProductId: item.ProductId,
            VariantId: item.variantId,
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
            {item.imageUrl == '' && (
              <Image
                source={require('app-assets/no-image.jpg')}
                style={styles.productsImage}
              />
            )}
            {item.imageUrl != '' && (
              <Image
                source={{uri: item.imageUrl}}
                style={styles.productsImage}
              />
            )}
          </View>
          <View style={{flex: 1, paddingHorizontal: 5}}>
            <Icon
              onPress={() => {
                favHandler(base64.encode(item.variantId));
              }}
              name={'delete'}
              size={30}
              color={'#D3D3D3'}
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
              {item.prodTitle + ' ' + item.variantTitle}
            </Text>
            <Text style={styles.gradeText}>{`GRADE ` + item.grade}</Text>
            <Text style={[{...styles.productsTitle, color: '#F08080'}]}>
              {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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

export default connect(mapStateToProps)(Favorites);
