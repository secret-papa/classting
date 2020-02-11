import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from 'react-redux';
import { Router } from 'react-router-dom';

import Configure from './config'
import firebaseConfing from './env/firebase';
import BrowserHistory from './history/BrowserHistory';
import FirebasePlatfrom from './platform/FirebasePlatform';
import UserRepository from './repository/UserRepository';
import AuthenticationService from './service/AuthenticationService';
import VoteService from './service/VoteService';
import WebStorage from './storage/WebStorage';
import ReduxStore from './store/ReduxStore';
import App from './view/App';
import FirebaseAuth from './infrastructure/auth/FirebaseAuth';
import FirebaseVote from './infrastructure/vote/FirebaseVote';

const { platform, history, store } = Configure.init({
  platform: new FirebasePlatfrom(firebaseConfing),
  history: new BrowserHistory(),
  store: new ReduxStore()
});

const userRepo = new UserRepository(new WebStorage());

const authAPI = new FirebaseAuth({
  auth: platform.auth,
  repo: userRepo,
  store
});
const voteAPI = new FirebaseVote({ userRepo });

const authService = new AuthenticationService(authAPI);
const voteService = new VoteService(voteAPI);
const service = {
  auth: authService,
  vote: voteService
}

ReactDOM.render(
  <Provider store={store.store}>
    <Router history={history.history}>
      <App service={service} />
    </Router>
  </Provider>,
  document.getElementById('root')
);