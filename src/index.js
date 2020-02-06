import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider  } from 'react-redux';

import App from './view/App';
import Configure from './config'
import firebaseConfing from './env/firebase';
import FirebasePlatfrom from './platform/FirebasePlatform';
import BrowserHistory from './history/BrowserHistory';
import ReduxStore from './store/ReduxStore';
import AuthenticationService from './service/AuthenticationService';
import FirebaseAuth from './infrastructure/auth/FirebaseAuth';

const { platform, history, store } = Configure.init({
  platform: new FirebasePlatfrom(firebaseConfing),
  history: new BrowserHistory(),
  store: new ReduxStore()
});

const authAPI = new FirebaseAuth({
  auth: platform.auth,
  history,
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