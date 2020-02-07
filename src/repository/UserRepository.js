class UserRepository {
  constructor(storage) {
    this.storage = storage;
  }

  saveToken(token) {
    this.storage.setItem('token', token)
  }

  getToken() {
    return this.storage.getItem('token');
  }

  deleteToken() {
    return this.storage.deleteItem('token');
  }
}

export default UserRepository;