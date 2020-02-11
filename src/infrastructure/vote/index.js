class VoteAPI {
  castVote() {
    throw new Error('must be override');
  }

  deleteVoteById() {
    throw new Error('must be override');
  }

  findVoteItemById() {
    throw new Error('must be override');
  }

  findVoteById() {
    throw new Error('must be override');
  }

  getAllVote() {
    throw new Error('must be override');
  }

  postVote() {
    throw new Error('must be override');
  }

  updateVote() {
    throw new Error('must be override');
  }
}

export default VoteAPI;