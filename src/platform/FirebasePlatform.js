import * as firebase from "firebase/app";
import auth from 'firebase/auth';

import Platform from './index';

class FirebasePlatform extends Platform {
  constructor(config) {
    super();
    this.config = config;
    this.firebase = firebase;
  }

  initialize() {
    this.firebase.initializeApp(this.config);
    this.firebase.auth().languageCode = 'ko';
    return this.firebase;
  }
}

export default FirebasePlatform;