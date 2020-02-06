class Store {
  createStore() {
    throw new Error('must be override');
  }

  dispatch() {
    throw new Error('must be override');
  }
}

export default Store;