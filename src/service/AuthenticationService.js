class AuthenticationService {
  constructor(authAPI) {
    this.authAPI = authAPI;
  }

  authStateChange(action) {
    this.authAPI.authStateChange(action);
  }

  signInEmail(email, pwd) {
    return this.authAPI.signInEmail(email, pwd);
  }

  signInWithGoogle() {
    return this.authAPI.signInWithGoogle();
  }

  signOut() {
    this.authAPI.signOut();
  }

  signUpEmail(email, pwd) {
    return this.authAPI.signUpEmail(email, pwd);
  }
}

export default AuthenticationService;