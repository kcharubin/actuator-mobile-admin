import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { MainNavigator } from './navigators/MainNavigator';

export let navigatorRef;

export default class App extends Component {
  componentDidMount() {
    console.log("defining navigtor");
    console.log(this.navigator);
    navigatorRef = this.navigator;
  }
  render() {
    const middleware = applyMiddleware(thunk);
    return (
      <Provider store={createStore(reducers, {}, middleware)}>
        <MainNavigator ref={nav => { this.navigator = nav; }} />
      </Provider>
    );
  }
}
