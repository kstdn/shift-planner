import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import 'typeface-montserrat';
import history from 'util/history';
import { App } from './components/App';
import { store } from './store';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
