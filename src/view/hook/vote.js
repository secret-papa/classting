import { useState } from 'react';
import VoteModel from '../../model/VoteModel';
import VoteTimeModel from '../../model/VoteTimeModel';

export default function useVoteForm(initForm = new VoteModel({
  title: '',
  startTimeModel: new VoteTimeModel().time,
  endTimeModel: new VoteTimeModel().time,
  items: []
})) {
  if (!initForm instanceof VoteModel) throw new Error('invalid instance');
  
  const [voteForm, setVoteForm] = useState({
    title: initForm.title,
    startTime: initForm.startTime,
    endTime: initForm.endTime
  });

  const [voteItems, setVoteItems] = useState(initForm.items);

  const changeVoteForm = ({ target: { name, value } }) => {
    setVoteForm({
      ...voteForm,
      [name]: value
    });
  }

  return [voteForm, voteItems, changeVoteForm, setVoteItems];
};