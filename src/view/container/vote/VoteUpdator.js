import React, { useEffect } from 'react';
import VoteForm from '../../component/vote/VoteForm';
import useVoteForm from '../../hook/vote';

function VoteUpdator({
  voteId,
  title: initTitle,
  startTime: initStartTime,
  endTime: initEndTime,
  voteItems: initVoteItems,
  voteService,
  closeForm
}) {
  const [{
    title,
    startTime,
    endTime
  }, 
  voteItems, 
  changeVoteForm,
  setVoteItems
  ] = useVoteForm({
    title: initTitle,
    startTime: initStartTime,
    endTime: initEndTime
  });

  const updateVoteInfo = ({ title, startTime, endTime, voteItems }) => {
    console.log(voteItems);
  }

  useEffect(() => {
    const componentDidMount = async () => {
      const promiseFindVoteItems = initVoteItems.map((voteItemId) => voteService.findVoteItemById(voteItemId));
      const findedVoteItems = await Promise.all(promiseFindVoteItems);
      setVoteItems(findedVoteItems.map(({ id, value }) => ({ id, value })));
    }

    componentDidMount();
  }, [ voteService ]);

  return (
    <VoteForm
      title={title}
      startTime={startTime}
      endTime={endTime}
      voteItems={voteItems}
      changeVoteForm={changeVoteForm}
      setVoteItems={setVoteItems}
      confirmVote={updateVoteInfo}
      closeForm={closeForm}
    />
  );
}

export default VoteUpdator;