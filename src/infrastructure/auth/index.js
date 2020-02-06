class Authentication {
  signInWithGoogle() {
    throw new Error('must be override');
  }

  signInEmail() {
    throw new Error('must be override');
  }

  signOut() {
    throw new Error('must be override');
  }
}

export default Authentication;