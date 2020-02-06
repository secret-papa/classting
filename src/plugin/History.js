import { createBrowserHistory } from "history";
import Plugin from './index';

class HistoryPlugin extends Plugin {
  constructor() {
    super();
    this.history = null
  }

  initialize() {
    this.history = createBrowserHistory()
  }

  getPlugin() {
    return this.history;
  }
}

export default HistoryPlugin;