import GoogleAuthAPI from './index';

class FirebaseGoogleAuthAPI extends GoogleAuthAPI {
  constructor({ auth, provider }) {
    super();
    this.auth = auth;
    this.provider = provider;
  }

  async signIn() {
    console.log('Firebase Google sign in!');
    const r = await this.auth().signInWithPopup(this.provider);
    return r.user;
  }
}

export default FirebaseGoogleAuthAPI;