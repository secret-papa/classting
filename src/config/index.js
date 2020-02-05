class Configure {
  constructor(plugin) {
    this.plugin = plugin;
  }

  static init(plugin) {
    return new Configure(plugin).init();
  }

  init() {
    return this.plugin.initialize();
  }
}

export default Configure;