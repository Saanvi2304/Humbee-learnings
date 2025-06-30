import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer
});

const store = configureStore({
  reducer: rootReducer,
  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;