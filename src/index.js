import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './store';
import './index.scss';
import TicTacToe from './containers/TicTacToe';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <TicTacToe />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
