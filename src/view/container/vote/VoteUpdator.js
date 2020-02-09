import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import VoteForm from '../../component/vote/VoteForm';
import useVoteForm from '../../hook/vote';
import { updateVoteAction } from '../../../redux/vote';

function VoteUpdator({
  voteId,
  title: initTitle,
  startTime: initStartTime,
  endTime: initEndTime,
  voteItems: initVoteItems,
  voteService,
  closeForm
}) {
  const copyinitVoteItmes = useRef();
  const dispatch = useDispatch();
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

  const updateVoteInfo = async (voteInfo) => {
    if (
      initTitle !== voteInfo.title ||
      initStartTime !== voteInfo.startTime ||
      initEndTime !== voteInfo.endTime ||
      JSON.stringify(copyinitVoteItmes.current) !== JSON.stringify(voteInfo.voteItems)
    ) {
      const updatedVoteId = await voteService.updateVote({
        ...voteInfo,
        id: voteId
      });
      const updatedVoteInfo = await voteService.findVoteById(updatedVoteId);
      dispatch(updateVoteAction(updatedVoteInfo));  
    }
    closeForm();
  }

  useEffect(() => {
    const componentDidMount = async () => {
      const promiseFindVoteItems = initVoteItems.map((voteItemId) => voteService.findVoteItemById(voteItemId));
      const findedVoteItems = await Promise.all(promiseFindVoteItems);
      const voteItemsInfo = findedVoteItems.map(({ id, value }) => ({ id, value }))
      copyinitVoteItmes.current = voteItemsInfo;
      setVoteItems(voteItemsInfo);
    }

    componentDidMount();
  }, [ initVoteItems, setVoteItems, voteService ]);

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