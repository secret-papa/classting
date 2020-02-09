import { useState } from 'react';

const getCurrentTimeYYYYMMDDHHMM = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const day = `${date.getDate()}`.padStart(2, 0);
  const hours = `${date.getHours()}`.padStart(2, 0);
  const minutes = `${date.getMinutes()}`.padStart(2, 0);
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const initFormState = () => {
  const date = new Date();
  return {
    title: '',
    startTime: getCurrentTimeYYYYMMDDHHMM(date),
    endTime: getCurrentTimeYYYYMMDDHHMM(date),
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