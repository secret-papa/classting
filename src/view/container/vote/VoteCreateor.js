import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import VoteForm from '../../component/vote/VoteForm';
import useVoteForm from '../../hook/vote';
import { addVoteAction } from '../../../redux/vote';
import { IN_INIT, IN_PROGRESS, IN_SUCCESS, IN_FAIL} from '../../constant/progress';

function VoteCreator({ closeForm, voteService }) {
  const [progressStatus, setProgressStatus] = useState(IN_SUCCESS);
  const dispatch = useDispatch();
  const [
    {
      title,
      startTime,
      endTime
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