import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import checkoutReducer from './checkoutReducer';

const rootReducer = combineReducers( {
    customer : customerReducer,
    checkout : checkoutReducer,
});

export default rootReducer;