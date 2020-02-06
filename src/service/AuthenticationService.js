class AuthenticationService {
  constructor(authAPI) {
    this.authAPI = authAPI;
  }

  signInWithGoogle() {
    return this.authAPI.signInWithGoogle();
  }

  signInEmail(email, pwd) {
    return this.authAPI.signInEmail(email, pwd);
  }

  signOut() {
    this.authAPI.signOut();
  }

  authStateChange(action) {
    this.authAPI.authStateChange(action);
  }
}

export default AuthenticationService;