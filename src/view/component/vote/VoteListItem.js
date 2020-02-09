import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import LayerPopUp from '../../ui/LayerPopUp'
import VoteUpdator from '../../container/vote/VoteUpdator';
import { deleteVoteAction } from '../../../redux/vote';

function VoteListItem({
  id,
  title,
  startTime,
  endTime,
  writer,
  voteItems,
  isViwerWrite,
  isViewerVote,
  voteService
}) {
  const dispatch = useDispatch();
  const [updateVotePopUpStatus, setUpdateVotePopUpStatus] = useState(false);

  const closeUpdateVotePopUp = () => {
    setUpdateVotePopUpStatus(false);
  }
  const openUpdateVotePopUp = () => {
    setUpdateVotePopUpStatus(true);
  }

  const handleClickUpdate = () => {
    openUpdateVotePopUp();
  }

  const handleClickDelete = async () => {
    const voteId = await voteService.deleteVoteById(id);
    dispatch(deleteVoteAction(voteId));
  }

  return (
    <div>
      {title}
      {startTime}
      {endTime}
      {writer.email}
      {
        isViwerWrite &&
        <>
          <button type='button' onClick={handleClickUpdate}>수정</button>
          <button type='button' onClick={handleClickDelete}>삭제</button>
        </>
      }
      {
        isViewerVote ? 
        <button type='button'>결과 보기</button>
        :
        <button type='button'>투표 하기</button>
      }
      {
        updateVotePopUpStatus &&
        <LayerPopUp>
          <VoteUpdator
            voteId={id}
            title={title}
            startTime={startTime}
            endTime={endTime}
            voteItems={voteItems}
            voteService={voteService}
            closeForm={closeUpdateVotePopUp}
          />
        </LayerPopUp>
      }
    </div>
  )
}

export default VoteListItem;