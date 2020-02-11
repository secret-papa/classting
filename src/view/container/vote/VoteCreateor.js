import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { IN_PROGRESS, IN_SUCCESS } from '../../constant/progress';
import useVoteForm from '../../hook/vote';
import VoteForm from '../../component/vote/VoteForm';
import { addVoteAction } from '../../../redux/vote';

function VoteCreator({ closeForm, voteService }) {
  const dispatch = useDispatch();
  const [progressStatus, setProgressStatus] = useState(IN_SUCCESS);
  const [
    {
      endTime,
      startTime,
      title
    },
    voteItems,
    changeVoteForm,
    setVoteItems,
  ] = useVoteForm();

  const createVote = async (confirmValue) => {
    setProgressStatus(IN_PROGRESS);
    const voteId = await voteService.createVote(confirmValue);
    const voteInfo = await voteService.findVoteById(voteId);
    dispatch(addVoteAction(voteInfo));
    setProgressStatus(IN_SUCCESS);
    closeForm();
  }

  return (
    <VoteForm
      progressStatus={progressStatus}
      title={title}
      startTime={startTime}
      endTime={endTime}
      voteItems={voteItems}
      changeVoteForm={changeVoteForm}
      setVoteItems={setVoteItems}
      confirmVote={createVote}
      closeForm={closeForm}
    />
  )
}

export default VoteCreator;