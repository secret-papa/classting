import * as firebase from "firebase/app";
import auth from 'firebase/auth';
import Plugin from './index';

class FirebasePlugin extends Plugin {
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

export default FirebasePlugin;