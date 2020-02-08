import VoteAPI from './index';
import axios from 'axios';

class FirebaseVoteAPI extends VoteAPI {
  constructor({ userRepo }) {
    super();
    this.http = axios.create({
      baseURL: '',
      timeout: 1000
    });
    this.userRepo = userRepo;
    
    this.http.interceptors.request.use(config => {
      config.headers.authorization = this.userRepo.getToken();
      return config;
    });
  }
  
  postVote() {
    console.log('post!');
  }
}

export default FirebaseVoteAPI;
