class History {
  createHistory() {
    throw new Error('must be override');
  }

  push() {
    throw new Error('must be override');
  }
}

export default History;