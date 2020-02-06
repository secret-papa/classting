class Configure {
  constructor({ platform, history, store }) {
    this.platform = platform;
    this.history = history;
    this.store = store;
  }

  static init(params) {
    return new Configure(params).init();
  }

  init() {
    this.platform = this.platform.initialize();
    this.store.createStore();
    this.history.createHistory();
    return this;
  }
}

export default Configure;