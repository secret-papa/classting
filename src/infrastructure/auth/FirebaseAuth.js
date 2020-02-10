import Authentication from './index';

class FirebaseAuthentication extends Authentication {
  constructor({ auth, repo, store }) {
    super();
    this.auth = auth;
    this.repo = repo;
    this.store = store;
  }

  _createErrorForm(e) {
    if (e.code === 'auth/invalid-email') {
      return {
        success: false,
        code: 'auth/emailError',
        message: e.message
      }
    } else if (e.code === 'auth/wrong-password') {
      return {
        success: false,
        code: 'auth/passwordError',
        message: e.message
      }
    } else {
      return {
        success: false,
        code: 'auth/etcError',
        message: e.message
      };
    }
  }

  async _getUserToken() {
    return await this.auth().currentUser.getIdToken();
  }

  async signInWithGoogle() {
    const result = await this.auth().signInWithPopup(new this.auth.GoogleAuthProvider());
    return result.user;
  }

  async signUpEmail(email, pwd) {
    try {
      const data = await this.auth().createUserWithEmailAndPassword(email, pwd);
      return {
        success: true,
        data
      };
    } catch(e) {
      return this._createErrorForm(e);
    }
    
  }

  async signInEmail(email, pwd) {
    try {
      const data = await this.auth().signInWithEmailAndPassword(email, pwd)
      return {
        success: true,
        data
      };
    } catch(e) {
      return this._createErrorForm(e);
    }
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