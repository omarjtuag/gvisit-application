import React from 'react';
import store from './Store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './layouts/Layout';
import './App.less';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  );
}

export default App;
