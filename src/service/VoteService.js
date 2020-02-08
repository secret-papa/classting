class VoteService {
  constructor(voteAPI) {
    this.voteAPI = voteAPI;
  }

  createVote() {
    return this.voteAPI.postVote();
  }
}

export default VoteService;