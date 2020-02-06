import { createBrowserHistory } from 'history';
import History from './index';

class BrowserHistory extends History {
  constructor() {
    super();
    this.history = null;
  }
  createHistory() {
    this.history = createBrowserHistory();
    return this.history;
  }

  push(path) {
    this.history.push(path)
  }

  getHistory() {
    return this.history;
  }
}

export default BrowserHistory;
