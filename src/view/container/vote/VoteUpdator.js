import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { IN_INIT, IN_SUCCESS, IN_PROGRESS } from '../../constant/progress';
import useVoteForm from '../../hook/vote';
import VoteForm from '../../component/vote/VoteForm';
import { updateVoteAction } from '../../../redux/vote';

function VoteUpdator({
  endTime: initEndTime,
  startTime: initStartTime,
  title: initTitle,
  voteItems: initVoteItems,
  voteId,
  voteService,
  closeForm
}) {
  const copyinitVoteItmes = useRef();
  const dispatch = useDispatch();
  const [progressStatus, setProgressStatus] = useState(IN_INIT);
  const [{
    endTime,
    startTime,
    title
  }, 
  voteItems, 
  changeVoteForm,
  setVoteItems
  ] = useVoteForm({
    endTime: initEndTime,
    startTime: initStartTime,
    title: initTitle
  });

  const updateVoteInfo = async (voteInfo) => {
    if (
      initTitle !== voteInfo.title ||
      initStartTime !== voteInfo.startTime ||
      initEndTime !== voteInfo.endTime ||
      JSON.stringify(copyinitVoteItmes.current) !== JSON.stringify(voteInfo.voteItems)
    ) {
      setProgressStatus(IN_PROGRESS);
      const updatedVoteId = await voteService.updateVote({
        ...voteInfo,
        id: voteId
      });
      const updatedVoteInfo = await voteService.findVoteById(updatedVoteId);
      closeForm();
      dispatch(updateVoteAction(updatedVoteInfo));
    } else {
      closeForm();
    }
  }

  useEffect(() => {
    const componentDidMount = async () => {
      setProgressStatus(IN_PROGRESS);
      const promiseFindVoteItems = initVoteItems.map((voteItemId) => voteService.findVoteItemById(voteItemId));
      const findedVoteItems = await Promise.all(promiseFindVoteItems);
      const voteItemsInfo = findedVoteItems.map(({ id, value }) => ({ id, value }))
      copyinitVoteItmes.current = voteItemsInfo;
      setVoteItems(voteItemsInfo);
      setProgressStatus(IN_SUCCESS);
    }

    componentDidMount();
  }, [ initVoteItems, setVoteItems, voteService ]);

  return (
    <VoteForm
      progressStatus={progressStatus}
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