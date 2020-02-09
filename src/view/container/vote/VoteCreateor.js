import React from 'react';
import { useDispatch } from 'react-redux';
import VoteForm from '../../component/vote/VoteForm';
import useVoteForm from '../../hook/vote';
import { addVoteAction } from '../../../redux/vote';

function VoteCreator({ closeForm, voteService }) {
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
    const voteId = await voteService.createVote(confirmValue);
    const voteInfo = await voteService.findVoteById(voteId);
    dispatch(addVoteAction(voteInfo));
    closeForm();
  }

  return (
    <VoteForm
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