import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';

import Configure from './config'
import firebaseConfing from './env/firebase';
import FirebasePlugin from './plugin/Firbase';

import AuthenticationService from './service/AuthenticationService';
import FirebaseGoogleAPI from './infrastructure/auth/google/FirebaseGoogleAuth';

const firebasePlugin = new FirebasePlugin(firebaseConfing);
const configure = Configure.init(firebasePlugin);

const authService = new AuthenticationService({
  google: new FirebaseGoogleAPI({
    auth: configure.auth,
    provider: new configure.auth.GoogleAuthProvider()
  })
});

const service = { auth: authService }

ReactDOM.render(<App service={service} />, document.getElementById('root'));