import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

import rootReducer from '../reducers/index';


// create store using preloaded state
const store = createStore(rootReducer);

export const persistor = persistStore( store );

export default store;