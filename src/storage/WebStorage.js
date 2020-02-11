import Storage from './index';

class WebStorage extends Storage {
  constructor() {
    super();
    this.storage = window.localStorage;
  }

  deleteItem(key) {
    this.storage.removeItem(key);
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  setItem(key, data) {
    this.storage.setItem(key, data)
  }
}

export default WebStorage;