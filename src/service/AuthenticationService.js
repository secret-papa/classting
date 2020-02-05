class AuthenticationService {
  constructor({ google }) {
    this.google = google;
  }

  signInWithGoogle() {
    return this.google.signIn();
  }
}

export default AuthenticationService;