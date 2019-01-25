import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store';

import './App.css';
import List from './movies/List';
import MovieForm from './movies/Form';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/create" component={MovieForm} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

