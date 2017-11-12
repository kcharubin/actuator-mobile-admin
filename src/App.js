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

export let navigatorRef;

export default class App extends Component {
  componentDidMount() {
    console.log('compinent did moount navigator');
    console.log(this.navigator);
    navigatorRef = this.navigator;
  }
  render() {
    const storeConfig = {
      key: 'rootStore', // key is required
      storage,
    };

    const persistedReducer = persistReducer(storeConfig, reducers);

    const middleware = applyMiddleware(thunk);
    const store = createStore(persistedReducer, {}, middleware);
    const persistor = persistStore(store);

    persistStore(store);
    console.log('app rendered');
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<Text>Loading</Text>}
          onBeforeLift={() => {
            console.log('nav2');
            console.log(this.navigator);
            navigatorRef = this.navigator;
          }}
        >
          <MainNavigatorWithState />
        </PersistGate>
      </Provider>

    );
  }
}
