import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (<AppNavigator />);
}
