import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import style from './VoteList.scss';
import { IN_INIT, IN_PROGRESS, IN_SUCCESS, IN_FAIL} from '../../constant/progress';
import VoteListItem from '../../component/vote/VoteListItem';
import { setVotesAction } from '../../../redux/vote';

const cx = classnames.bind(style);

function VoteList({
  voteService,
  openCreatorVoteForm
}) {
  const dispatch = useDispatch();
  const [progressStatus, setProgressStatus] = useState(IN_INIT);
  const { votes } = useSelector((state) => state.vote);

  const handleClickCreateVote = () => {
    openCreatorVoteForm()
  };

  useEffect(() => {
    const componentDidMount = async () => {
      setProgressStatus(IN_PROGRESS);
      const results = await voteService.getAllVote();
      dispatch(setVotesAction(results));
      setProgressStatus(IN_SUCCESS);
    }
    componentDidMount();
  }, [ dispatch, voteService ]);

  return (
    <div className={cx('vote_list_container')}>
      {
        progressStatus === IN_SUCCESS ? 
        <>
          <div className={cx('vote_add_button')}>
              <Fab color="secondary" aria-label="add" size='small' onClick={handleClickCreateVote}>
              <AddIcon />
            </Fab>
          </div>
          {
            !!votes.length &&
              <ul className={cx('vote_list')}>
              {
                votes.map(({ id, title, startTime, endTime, voteItems, writer, isViewerWrite, isViewerVote, inProgress }) => (
                  <li key={id} className={cx('vote_list_item')}>
                    <VoteListItem
                      id={id}
                      title={title}
                      startTime={startTime}
                      endTime={endTime}
                      writer={writer}
                      voteItems={voteItems}
                      isViewerWrite={isViewerWrite}
                      isViewerVote={isViewerVote}
                      inProgress={inProgress}
                      voteService={voteService}
                    />
                  </li>
                ))
              }
            </ul>
          }
        </>
        :
        progressStatus === IN_PROGRESS ?
            <div>Loading...</div>
          :
          progressStatus === IN_FAIL &&
            <div>Fail...</div>
      }
    </div>
  )
}

export default VoteList;