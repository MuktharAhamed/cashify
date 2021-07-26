// import ProductAvailableOptions from './ProductAvailableOptions';
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

const Favorites = props => {
  const [isFavoritesFetched, setfavoritesFetched] = useState(false);
  const [allFavorites, setAllFavorites] = useState([]);
  const [fetchCusotomer, {loading, error, data}] = useLazyQuery(getCustomer, {
    fetchPolicy: 'network-only',
  });
  const [
    fetchFavoriteItems,
    {loading: favoritesLoading, error: favoritesError, data: favoritesData},
  ] = useLazyQuery(getFavoritesQuery, {
    fetchPolicy: 'network-only',
  });

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
  }, []);

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
      console.log(favoritesData);
      if (favoritesData.nodes.length > 0) {
        var allVariants = [];
        favoritesData.nodes.forEach(variant => {
          console.log('variant.product');
          console.log(variant);
          var currentProd = {};
          currentProd.variantId = variant.id;
          currentProd.variantTitle = variant.title;
          currentProd.quantity = variant.inventoryQuantity;
          currentProd.price = variant.price;
          currentProd.prodTitle = variant.product?.title;
          currentProd.ProductId = variant.product?.id;
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

  return isFavoritesFetched && <></>;
};

const mapStateToProps = (state, props) => {
  console.log('state');
  console.log(state);
  return {
    customer: state.customer,
  };
};

export default connect(mapStateToProps)(Favorites);
