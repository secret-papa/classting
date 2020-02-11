import React, { useEffect, useState } from 'react';

import { IN_INIT, IN_PROGRESS, IN_SUCCESS, IN_FAIL } from '../constant/progress';
import Progress from '../ui/Progress';
import VoteCasting from '../container/vote/VoteCasting';
import VoteResult from '../container/vote/VoteResult';

function VoteDetail({
  match: {
    params: {
      voteId
    }
  },
  voteService
}) {
  const [progressStatus, setProgressStatus] = useState(IN_INIT);
  const [voteInfo, setVoteInfo] = useState({});

  useEffect(() => {
    const componentDidMount = async () => {
      setProgressStatus(IN_PROGRESS);
      const result = await voteService.findVoteById(voteId);
      setVoteInfo(result);
      setProgressStatus(IN_SUCCESS);
    };

    componentDidMount();
  }, [ voteId, voteService ]);

  return (
    <div>
      {
        progressStatus === IN_SUCCESS ?
          !voteInfo.isViewerVote ?
            <VoteCasting
              voteId={voteId}
              voteItems={voteInfo.voteItems}
              voteService={voteService}
              setProgressStatus={setProgressStatus}
              setVoteInfo={setVoteInfo}
            />
            :
            <VoteResult
              voteItems={voteInfo.voteItems}
              voteService={voteService}
            />
        : 
          progressStatus === IN_PROGRESS ?
            <Progress />
          :
            progressStatus === IN_FAIL &&
            <div>fail...</div>
      }
    </div>
  )
}

export default VoteDetail;