import Authentication from './index';

class FirebaseAuthentication extends Authentication {
  constructor({ auth, history, store }) {
    super();
    this.auth = auth;
    this.history = history;
    this.store = store;
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
    this.auth().onAuthStateChanged(user => {
      if (user) {
        this.history.push('/');
      } else {
        this.history.push('/signIn');
      }
      this.store.dispatch(action(user));
    })
  }
}

export default FirebaseAuthentication;