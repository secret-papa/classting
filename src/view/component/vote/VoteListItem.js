import React, { useState } from 'react';
import classnames from 'classnames/bind';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LayerPopUp from '../../ui/LayerPopUp'
import VoteUpdator from '../../container/vote/VoteUpdator';
import { deleteVoteAction } from '../../../redux/vote';
import style from './VoteListItem.scss';

const cx = classnames.bind(style);

function VoteListItem({
  id,
  title,
  startTime,
  endTime,
  writer,
  voteItems,
  isViewerWrite,
  isViewerVote,
  inProgress,
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
    <>
      <span className={cx('vote_item')}>{title}</span>
      <span className={cx('vote_item')}>{startTime.split("T").join(' ')} ~ {endTime.split("T").join(' ')}</span>
      <span className={cx('vote_item')}>{writer.email}</span>
      <span className={cx('vote_item')}>{inProgress ? '진행 중' : '종료 됨'}</span>
      {
        inProgress &&
        <Button>
          <Link to={`/vote/${id}`}>
            {isViewerVote ? '결과 보기' : '투표 하기'}
          </Link>
        </Button>
      }
      {
        isViewerWrite &&
        <>
          <Button color="primary" onClick={handleClickUpdate}>수정</Button>
          <Button color="secondary" onClick={handleClickDelete}>삭제</Button>
        </>
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
    </>
  )
}

export default VoteListItem;