import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import Button from '@material-ui/core/Button';

import style from './VoteResult.scss';
import { IN_INIT, IN_PROGRESS, IN_SUCCESS, IN_FAIL } from '../../constant/progress';
import Progress from '../../ui/Progress';

const cx = classnames.bind(style);

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
    <div className={cx('result_container')}>
      {
        resultProgressStatus === IN_SUCCESS ?
          <>
            {
              !!voteResult.results.length &&
              <ul className={cx('result_list')}>
                {
                  voteResult.results.map(({ id, value, votedUser}) => (
                    <li key={id} className={cx('result_item')}>
                      <div className={cx('result_item_wrp')}>
                        <p className={cx('result_item_value')}>{value}</p>
                      </div>
                      <div className={cx('result_item_proggress')}>
                        <div
                          className={cx('result_item_proggress_bar')}
                          style={{
                            width: `${votedUser.length / voteResult.totalCount * 100}%`
                          }}>
                        </div>
                        <div className={cx('result_item_proggress_value')} >{votedUser.length / voteResult.totalCount * 100}% ( {votedUser.length} 표 )</div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            }
            <Button size="large">
              <Link to='/'>투표 리스트</Link>
            </Button>
          </>
        :
          resultProgressStatus === IN_PROGRESS ?
            <Progress/>
        :
          resultProgressStatus === IN_FAIL &&
          <div>fail...</div>
      }
    </div>
  )
}

export default VoteResult;