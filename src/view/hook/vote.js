import { useState } from 'react';
import CustomDate from '../../util/CustomDate';

const initFormState = () => {
  const date = new Date();
  return {
    title: '',
    startTime: CustomDate.getCurrentTimeYYYYMMDDHHMM(date),
    endTime: CustomDate.getCurrentTimeYYYYMMDDHHMM(date),
  };
}

export default function useVoteForm(initForm = initFormState()) {
  const [voteForm, setVoteForm] = useState({
    title: initForm.title,
    startTime: initForm.startTime,
    endTime: initForm.endTime
  });

  const [voteItems, setVoteItems] = useState([]);

  const changeVoteForm = ({ target: { name, value } }) => {
    setVoteForm({
      ...voteForm,
      [name]: value
    });
  }

  return [voteForm, voteItems, changeVoteForm, setVoteItems];
};