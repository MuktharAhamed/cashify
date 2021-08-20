import AsyncStorage from '@react-native-async-storage/async-storage';
import {CHECKOUT_DATA, LINE_ITEM_DATA} from 'app-constants/ActionConstants';
import {persistReducer} from 'redux-persist';

const initialState = {
  CheckoutData: {},
  lineItemData: [],
  CheckoutId: '',
};
const checkoutReducer = (state = initialState, action) => {
  console.log('action');
  console.log(action);
  switch (action.type) {
    case CHECKOUT_DATA:
      return {
        ...state,
        CheckoutData: action.data,
        CheckoutId: action.data.checkoutCreate.checkout.id,
      };

    case LINE_ITEM_DATA:
      return {
        ...state,
        lineItemData: action.data,
      };

    default:
      return state;
  }
};

const persistConfig = {
  keyPrefix: 'checkout-',
  key: 'checkoutDetails',
  storage: AsyncStorage,
};

export default persistReducer(persistConfig, checkoutReducer);
