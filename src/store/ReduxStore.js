import { createStore, combineReducers } from 'redux';
import Store from './index';
import reducers from '../redux'

class ReduxStore extends Store {
  constructor() {
    super();
    this.store = null
  }
  createStore() {
    const rootReducer = combineReducers(reducers);
    this.store = createStore(rootReducer);
  }

  dispatch(action) {
    this.store.dispatch(action);
  }
}

export default ReduxStore;