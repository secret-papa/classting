import React, { useState } from 'react';
import LayerPopUp from '../../ui/LayerPopUp'
import VoteUpdator from '../../container/vote/VoteUpdator';

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
  const [updateVotePopUpStatus, setUpdateVotePopUpStatus] = useState(false);

  const closeUpdateVotePopUp = () => {
    setUpdateVotePopUpStatus(false);
  }
  const openUpdateVotePopUp = () => {
    setUpdateVotePopUpStatus(true);
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
          <button type='button' onClick={openUpdateVotePopUp}>수정</button>
          <button type='button' >삭제</button>
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