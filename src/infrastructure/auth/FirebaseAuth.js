import Authentication from './index';

class FirebaseAuthentication extends Authentication {
  constructor({ auth, repo, store }) {
    super();
    this.auth = auth;
    this.repo = repo;
    this.store = store;
  }

  async _getUserToken() {
    return await this.auth().currentUser.getIdToken();
  }

  async signInWithGoogle() {
    const result = await this.auth().signInWithPopup(new this.auth.GoogleAuthProvider());
    return result.user;
  }

  signInEmail(email, pwd) {
    this.auth().createUserWithEmailAndPassword(email, pwd)
  }

  signOut() {
    return this.auth().signOut();
  }

  authStateChange(action) {
    this.auth().onAuthStateChanged(async (user) => {
      let data = null;
      if (user) {
        data = {
          uid: user.uid,
          email: user.email
        }
        const token = await this._getUserToken();
        this.repo.saveToken(token);
      } else {
        this.repo.deleteToken();
      }
      this.store.dispatch(action(data));
    })
  }
}

export default FirebaseAuthentication;