class VoteTimeModel {
  constructor() {
    this._d = new Date();
    this._year = this._d.getFullYear();
    this._month = `${this._d.getMonth() + 1}`.padStart(2, 0);
    this._date = `${this._d.getDate()}`.padStart(2, 0);
    this._hours = `${this._d.getHours()}`.padStart(2, 0);
    this._minutes = `${this._d.getMinutes()}`.padStart(2, 0);
  }

  get time() {
    return `${this._year}-${this._month}-${this._date}T${this._hours}:${this._minutes}`;
  }
}

export default VoteTimeModel;