import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SET_CUSTOMER,
  GET_CUSTOMER,
  REMOVE_CUSTOMER,
} from 'app-constants/ActionConstants';
import {persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

let initialState = {
  customerId: '',
  customerAccessToken: '',
  customerEmail: '',
  customerMobile: '',
  favoriteMetaFieldId: '',
  favoriteItems: '',
  expiresAt: '',
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER:
      return state;

    case SET_CUSTOMER:
      return {
        customerId: action.customer.customerId
          ? action.customer.customerId
          : state.customerId,
        customerAccessToken: action.customer.customerAccessToken
          ? action.customer.customerAccessToken
          : state.customerAccessToken,
        customerEmail: action.customer.customerEmail
          ? action.customer.customerEmail
          : state.customerEmail,
        customerMobile: action.customer.customerMobile
          ? action.customer.customerMobile
          : state.customerMobile,
        expiresAt: action.customer.expiresAt
          ? action.customer.expiresAt
          : state.expiresAt,
        favoriteItems: action.customer.favoriteItems
          ? action.customer.favoriteItems
          : state.favoriteItems,
        favoriteMetaFieldId: action.customer.favoriteMetaFieldId
          ? action.customer.favoriteMetaFieldId
          : state.favoriteMetaFieldId,
      };

    case REMOVE_CUSTOMER:
      return initialState;

    default:
      return state;
  }
};

const persistConfig = {
  keyPrefix: 'customer-',
  key: 'customerDetails',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, customerReducer);
