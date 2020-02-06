import Plugin from './index';
import { createStore, combineReducers } from 'redux';
const reducers = {};

class ReduxStore extends Plugin {
  constructor() {
    super();
    this.store = null;
  }

  initialize() {
    const rootReducer = combineReducers(reducers);
    this.store = createStore(rootReducer);
  }

  getPlugin() {
    return this.store;
  }
}

export default ReduxStore;
