import Validator from '../util/Validator';

class VoteService {
  constructor(voteAPI) {
    this.voteAPI = voteAPI;
  }

  async createVote({ title, startTime, endTime, voteItems }) {
    if (!Validator.isStr(title)) throw new Error('invalid type of title');
    if (!Validator.checkDateFormYYYYMMDDHHMM(startTime)) throw new Error('invalid type of startTime');
    if (!Validator.checkDateFormYYYYMMDDHHMM(endTime)) throw new Error('invalid type of endTime');
    if (!Validator.isArray(voteItems) && !Validator.isArrayItemObj(voteItems)) throw new Error('invalid type of voteItems');
    voteItems.forEach(({ value }) => {
      if (!value && !Validator.isStr(value)) throw new Error('invalid value in voteItems');
    });
    const { data } = await this.voteAPI.postVote({ title, startTime, endTime, voteItems });
    return data;
  }

  async deleteVoteById(voteId) {
    if (!voteId && !Validator.isStr(voteId)) throw new Error('invalid value of voteId');
    const { data } = await this.voteAPI.deleteVoteById(voteId);
    return data;
  }

  async getAllVote() {
    const { data } = await this.voteAPI.getAllVote();
    data.forEach(({
      id,
      title,
      startTime,
      endTime,
      writer,
      voteItems,
      inProgress
    }) => {
      if (!id) throw new Error('id is empty');
      if (!title && !Validator.isStr(title)) throw new Error('invalid value type of id');
      if (!startTime && !Validator.checkDateFormYYYYMMDDHHMM(startTime)) throw new Error('invalid value form of startTime');
      if (!endTime && !Validator.checkDateFormYYYYMMDDHHMM(endTime)) throw new Error('invalid value form of endTime');
      if (!Validator.isArray(voteItems) && !Validator.isArrayItemStr(voteItems)) throw new Error('invalid value in voteItems');
      if (!writer && !writer.email && !writer.uid && !Validator.isStr(writer.uid) && !Validator.checkEmailForm(writer.email)) throw new Error('invalid value in writer');
      if (!inProgress && !Validator.isBoolean(inProgress)) throw new Error('invalid value type of inProgress');
    });
    return data;
  }

  async findVoteById(voteId) {
    if (!voteId && !Validator.isStr(voteId)) throw new Error('invalid value type of voteId');

    const { data } = await this.voteAPI.findVoteById(voteId)
    const {
      id,
      title,
      startTime,
      endTime,
      writer,
      voteItems,
      inProgress
    } = data;

    if (!id) throw new Error('id is empty');
    if (!title && !Validator.isStr(title)) throw new Error('invalid value type of id');
    if (!startTime && !Validator.checkDateFormYYYYMMDDHHMM(startTime)) throw new Error('invalid value form of startTime');
    if (!endTime && !Validator.checkDateFormYYYYMMDDHHMM(endTime)) throw new Error('invalid value form of endTime');
    if (!Validator.isArray(voteItems) && !Validator.isArrayItemStr(voteItems)) throw new Error('invalid value in voteItems');
    if (!writer && !writer.email && !writer.uid && !Validator.isStr(writer.uid) && !Validator.checkEmailForm(writer.email)) throw new Error('invalid value in writer');
    if (!inProgress && !Validator.isBoolean(inProgress)) throw new Error('invalid value type of inProgress')

    return data;
  }

  async findVoteItemById(itemId) {
    if (!itemId && Validator.isStr(itemId)) throw new Error('invalid type of itemId');
    const { data } = await this.voteAPI.findVoteItemById(itemId);
    if (!data.value && Validator.isStr(data.value)) throw new Error('invalid type of title data');
    if (!data.votedUser && Validator.isArray(data.votedUser) && Validator.isArrayItemStr(data.votedUser)) throw new Error('invalid type of voted user data');
    return data;
  }

  async updateVote({ id, title, startTime, endTime, voteItems }) {
    if (!id) throw new Error('id is empty');
    if (!title && !Validator.isStr(title)) throw new Error('invalid value type of id');
    if (!startTime && !Validator.checkDateFormYYYYMMDDHHMM(startTime)) throw new Error('invalid value form of startTime');
    if (!endTime && !Validator.checkDateFormYYYYMMDDHHMM(endTime)) throw new Error('invalid value form of endTime');
    if (!Validator.isArray(voteItems) && !Validator.isObject(voteItems)) throw new Error('invalid value in voteItems');
    voteItems.forEach(({ value }) => {
      if (!value && !Validator.isStr(value)) throw new Error('invalid value in voteItems');
    });
    const { data } = await this.voteAPI.updateVote({ id, title, startTime, endTime, voteItems });
    
    return data;
    
  }
}

export default VoteService;