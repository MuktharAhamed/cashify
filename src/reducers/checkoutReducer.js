import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    CHECKOUT_DATA,
    LINE_ITEM_DATA
} from 'app-constants/ActionConstants';
import { persistReducer } from 'redux-persist';

const initialState = {
    CheckoutData: {},
    lineItemData: [],
    CheckoutId: '',
}
const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECKOUT_DATA:
            return { ...state, CheckoutData: action.payload.data, CheckoutId: action.payload.data.checkoutCreate.checkout.id };

        case LINE_ITEM_DATA:
            return {
                ...state, lineItemData: action.payload.data,
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
