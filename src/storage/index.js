class Storage {
  deleteItem() {
    throw new Error('must be override');
  }

  getItem() {
    throw new Error('must be override');
  }

  setItem() {
    throw new Error('must be override');
  }

}

export default Storage;