import VoteAPI from './index';
import axios from 'axios';

class FirebaseVoteAPI extends VoteAPI {
  constructor({ userRepo }) {
    super();
    this.http = axios.create({
      baseURL: 'http://localhost:5000/classting-c59dd/us-central1/vote',
      timeout: 5000
    });
    this.userRepo = userRepo;
    
    this.http.interceptors.request.use(config => {
      config.headers.authorization = this.userRepo.getToken();
      return config;
    });
  }
  
  postVote(newVote) {
    return this.http.post('/', {
      data: newVote
    });
  }

  getAllVote() {
    return this.http.get('/all');
  }

  findVoteItemById(itemId) {
    return this.http.get(`items/${itemId}`);
  }

  findVoteById(voteId) {
    return this.http.get(`/${voteId}`)
  }
}

export default FirebaseVoteAPI;
