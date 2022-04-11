import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import cartReducer from './src/store/reducers/cart';
import addressReducer from './src/store/reducers/address';
import authReducer from './src/store/reducers/auth';

const rootReducer = combineReducers({
  Cart: cartReducer,
  Address: addressReducer,
  Auth: authReducer,
})

const store = createStore( rootReducer, applyMiddleware(ReduxThunk) );

export default function App() {
  return (
    <Provider store={store} >
      <AppNavigator />
    </Provider>
  );
}
