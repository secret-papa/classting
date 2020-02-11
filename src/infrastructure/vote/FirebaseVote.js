import axios from 'axios';

import VoteAPI from './index';

class FirebaseVoteAPI extends VoteAPI {
  constructor({ userRepo }) {
    super();
    this.http = axios.create({
      baseURL: 'https://asia-east2-classting-c59dd.cloudfunctions.net/vote',
      timeout: 5000
    });
    this.userRepo = userRepo;
    
    this.http.interceptors.request.use(config => {
      config.headers.authorization = this.userRepo.getToken();
      return config;
    });
  }

  castVote(itemId) {
    return this.http.put(`/cast/${itemId}`)
  }
  
  deleteVoteById(voteId) {
    return this.http.delete(`/${voteId}`);
  }

  findVoteItemById(itemId) {
    return this.http.get(`items/${itemId}`);
  }

  findVoteById(voteId) {
    return this.http.get(`/${voteId}`)
  }

  getAllVote() {
    return this.http.get('/all');
  }

  postVote(newVote) {
    return this.http.post('/', {
      data: newVote
    });
  }

  updateVote(voteInfo) {
    return this.http.put(`/${voteInfo.id}`, {
      data: voteInfo
    })
  }
}

export default FirebaseVoteAPI;
