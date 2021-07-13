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
  customerName: '',
  productWishListId: '',
  expiresAt: '',
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER:
      return state;

    case SET_CUSTOMER:
      return {
        customerId: action.customer.customerId,
        customerAccessToken: action.customer.customerAccessToken,
        customerEmail: action.customer.customerEmail,
        customerMobile: action.customer.customerMobile,
        productWishListId: action.customer.productWishListId,
        expiresAt: action.customer.expiresAt,
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
