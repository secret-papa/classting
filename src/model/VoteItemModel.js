class VoteItemModel {
  constructor(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }
}

export default VoteItemModel;