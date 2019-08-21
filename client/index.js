import React from 'react';
import ReactDom from 'react-dom';
import Instagram from './src/pages/index.js';
import { Provider } from 'react-redux';
import store from './src/store/index.js';

ReactDom.render(
  <Provider store={store}>
    <Instagram />
  </Provider>,
  document.getElementById('root')
);
