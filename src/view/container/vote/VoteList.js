import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVotesAction } from '../../../redux/vote';
import VoteListItem from '../../component/vote/VoteListItem';
import { IN_INIT, IN_PROGRESS, IN_SUCCESS, IN_FAIL} from '../../constant/progress';

function VoteList({
  voteService
}) {
  const [progressStatus, setProgressStatus] = useState(IN_INIT);
  const { votes } = useSelector((state) => state.vote);
  const dispatch = useDispatch();

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
    <div>
      <h1>투표 리스트</h1>
      {
        progressStatus === IN_SUCCESS ? 
        <>
            {
              !!votes.length &&
              <ul>
                {
                  votes.map(({ id, title, startTime, endTime, voteItems, writer, isViewerWrite, isViewerVote, inProgress }) => (
                    <li key={id}>
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
          <div>loading...</div>
          :
          progressStatus === IN_FAIL &&
            <div>Fail...</div>
      }
    </div>
  )
}

export default VoteList;