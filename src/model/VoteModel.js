class VoteModel {
  constructor({ title, startTimeModel, endTimeModel, items }) {
    this._title = title;
    this._startTime = startTimeModel;
    this._endTime = endTimeModel;
    this._items = items;
  }

  get title() {
    return this._title;
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }

  get items() {
    return this._items;
  }
}

export default VoteModel;