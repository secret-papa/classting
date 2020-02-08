import React from 'react';
import VoteForm from '../../component/vote/VoteForm';
import useVoteForm from '../../hook/vote';

function VoteCreator({
  voteService
}) {

  const [
    {
      title,
      startTime,
      endTime
    },
    voteItems,
    changeVoteForm,
    setVoteItems
  ] = useVoteForm();

  return (
    <VoteForm
      title={title}
      startTime={startTime}
      endTime={endTime}
      voteItems={voteItems}
      changeVoteForm={changeVoteForm}
      setVoteItems={setVoteItems}
    />
  )
}

export default VoteCreator;