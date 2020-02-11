import { useState } from 'react';

import CustomDate from '../../util/CustomDate';

const initFormState = () => {
  const date = new Date();
  return {
    endTime: CustomDate.getCurrentTimeYYYYMMDDHHMM(date),
    startTime: CustomDate.getCurrentTimeYYYYMMDDHHMM(date),
    title: '',
  };
}

export default function useVoteForm(initForm = initFormState()) {
  const [voteForm, setVoteForm] = useState({
    endTime: initForm.endTime,
    startTime: initForm.startTime,
    title: initForm.title
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