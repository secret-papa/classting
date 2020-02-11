class Authentication {
  authStateChange() {
    throw new Error('must be override');
  }

  signInEmail() {
    throw new Error('must be override');
  }

  signInWithGoogle() {
    throw new Error('must be override');
  }

  signOut() {
    throw new Error('must be override');
  }

  signUpEmail() {
    throw new Error('must be override');
  }
}

export default Authentication;