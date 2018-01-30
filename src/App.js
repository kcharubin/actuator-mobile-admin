import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { Text } from 'react-native';
import thunk from 'redux-thunk';
import reducers from './reducers';

import MainNavigatorWithState from './navigators/MainNavigator';


export default class App extends Component {
  render() {
    const storeConfig = {
      key: 'rootStore', // key is required
      storage,
      blacklist: ['nav', 'fetchedData'],
    };
    const persistedReducer = persistReducer(storeConfig, reducers);
    const middleware = applyMiddleware(thunk);
    const store = createStore(persistedReducer, {}, middleware);
    const persistor = persistStore(store);
    persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<Text>Loading</Text>}
          onBeforeLift={() => {
          }}
        >
          <MainNavigatorWithState />
        </PersistGate>
      </Provider>

    );
  }
}
