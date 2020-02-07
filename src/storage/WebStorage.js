import Storage from './index';

class WebStorage extends Storage {
  constructor() {
    super();
    this.storage = window.localStorage;
  }

  setItem(key, data) {
    this.storage.setItem(key, data)
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  deleteItem(key) {
    this.storage.removeItem(key);
  }
}

export default WebStorage;