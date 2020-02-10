import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IN_INIT, IN_PROGRESS, IN_SUCCESS, IN_FAIL } from '../../constant/progress';

function VoteResult({
  voteItems,
  voteService
}) {
  const [voteResult, setVoteResult] = useState({});
  const [resultProgressStatus, setResultProgressStatus] = useState(IN_INIT);

  useEffect(() => {
    const componentDidMount = async () => {
      setResultProgressStatus(IN_PROGRESS);
      const promiseFindVoteItems = voteItems.map((voteItemId) => voteService.findVoteItemById(voteItemId));
      const findedVoteItems = await Promise.all(promiseFindVoteItems);
      const totalCount = findedVoteItems.reduce((acc, { votedUser }) => acc + votedUser.length, 0)

      setVoteResult({
        totalCount,
        results: findedVoteItems
      });
      setResultProgressStatus(IN_SUCCESS);
    };
    componentDidMount();

  }, [ voteItems, voteService ]);

  return (
    <div>
      결과
      {
        resultProgressStatus === IN_SUCCESS ?
          <div>
            {
              !!voteResult.results.length &&
              <ul>
                {
                  voteResult.results.map(({ id, value, votedUser}) => (
                    <li key={id}>
                      <div>{value}</div>
                      <div>{votedUser.length / voteResult.totalCount * 100}% ({votedUser.length})</div>
                    </li>
                  ))
                }
              </ul>
            }
            <Link to='/' >홈으로</Link>
          </div>
        :
          resultProgressStatus === IN_PROGRESS ?
          <div>결과 로딩중</div>
        :
          resultProgressStatus === IN_FAIL &&
          <div>fail...</div>
      }
    </div>
  )
}

export default VoteResult;