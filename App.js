import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import cartReducer from './src/store/reducers/cart';

const rootReducer = combineReducers({
  Cart: cartReducer
})

const store = createStore( rootReducer, applyMiddleware(ReduxThunk) );

export default function App() {
  return (
    <Provider store={store} >
      <AppNavigator />
    </Provider>
  );
}
