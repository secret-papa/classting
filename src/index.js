import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from 'react-redux';
import { Router } from 'react-router-dom';

import Configure from './config'
import firebaseConfing from './env/firebase';
import BrowserHistory from './history/BrowserHistory';
import FirebaseAuth from './infrastructure/auth/FirebaseAuth';
import FirebasePlatfrom from './platform/FirebasePlatform';
import AuthenticationService from './service/AuthenticationService';
import ReduxStore from './store/ReduxStore';
import App from './view/App';

const { platform, history, store } = Configure.init({
  platform: new FirebasePlatfrom(firebaseConfing),
  history: new BrowserHistory(),
  store: new ReduxStore()
});

const authAPI = new FirebaseAuth({
  auth: platform.auth,
  store
});

const authService = new AuthenticationService(authAPI);
const service = { auth: authService }

ReactDOM.render(
  <Provider store={store.store}>
    <Router history={history.history}>
      <App service={service} />
    </Router>
  </Provider>,
  document.getElementById('root')
);