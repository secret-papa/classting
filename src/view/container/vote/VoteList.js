import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVotesAction } from '../../../redux/vote';
import VoteListItem from '../../component/vote/VoteListItem';

function VoteList({
  voteService
}) {
  const { votes } = useSelector((state) => state.vote);
  const dispatch = useDispatch();

  useEffect(() => {
    const componentDidMount = async () => {
      dispatch(setVotesAction(await voteService.getAllVote()));
    }
    componentDidMount();
  }, [ dispatch, voteService ]);

  return (
    <div>
      <h1>투표 리스트</h1>
      {
        !!votes.length &&
        <ul>
          {

            votes.map(({ id, title, startTime, endTime, voteItems, writer, isViwerWrite, isViewerVote }) => (
              <li key={id}>
                <VoteListItem
                  id={id}
                  title={title}
                  startTime={startTime}
                  endTime={endTime}
                  writer={writer}
                  voteItems={voteItems}
                  isViwerWrite={isViwerWrite}
                  isViewerVote={isViewerVote}
                  voteService={voteService}
                />
              </li>
            ))
          }
        </ul>
      }
    </div>
  )
}

export default VoteList;