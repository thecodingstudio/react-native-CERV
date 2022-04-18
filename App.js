import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import cartReducer from './src/store/reducers/cart';
import addressReducer from './src/store/reducers/address';
import authReducer from './src/store/reducers/auth';
import registerReducer from './src/store/reducers/register';
import paymentReducer from './src/store/reducers/paymentMethod';
import orderReducer from './src/store/reducers/order';


const rootReducer = combineReducers({
  Cart: cartReducer,
  Address: addressReducer,
  Auth: authReducer,
  Register: registerReducer,
  Payment: paymentReducer,
  Order: orderReducer
})

const store = createStore( rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store} >
      <AppNavigator />
    </Provider>
  );
}
