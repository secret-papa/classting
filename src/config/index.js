class Configure {
  constructor({ history, platform, store }) {
    this.history = history;
    this.platform = platform;
    this.store = store;
  }

  static init(params) {
    return new Configure(params).init();
  }

  init() {
    this.history.createHistory();
    this.platform = this.platform.initialize();
    this.store.createStore();
    return this;
  }
}

export default Configure;