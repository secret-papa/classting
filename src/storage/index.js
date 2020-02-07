class Storage {
  setItem() {
    throw new Error('must be override');
  }

  getItem(key) {
    throw new Error('must be override');
  }

  deleteItem(key) {
    throw new Error('must be override');
  }
}

export default Storage;