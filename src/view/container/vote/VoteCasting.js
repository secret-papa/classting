import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IN_INIT, IN_PROGRESS, IN_SUCCESS, IN_FAIL } from '../../constant/progress';
import { castVoteAction } from '../../../redux/vote';

function VoteCasting({
  voteId,
  voteItems,
  setProgressStatus,
  setVoteInfo,
  voteService
}) {

  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [isSelectItem, setIsSelectItem] = useState(false);
  const [castProgressStatus, setCastProgressStatus] = useState(IN_INIT);

  const handleChagneCheck = (checkedId) => {
    setItems((items) => items.map(item => item.id === checkedId ? {...item, checked: true} : {...item, checked: false}));
    setIsSelectItem(true);
  };

  const handleClickCast = async () => {
    if (isSelectItem) {
      setProgressStatus(IN_PROGRESS);
      const { id } = items.filter(({ checked }) => checked)[0];
      const result = await voteService.castVote(id);
      setVoteInfo((voteInfo) => ({
        ...voteInfo,
        isViewerVote: true
      }));
      dispatch(castVoteAction(voteId));
      setProgressStatus(IN_SUCCESS);
    }
  };

  useEffect(() => {
    const componentDidMount = async () => {
      setCastProgressStatus(IN_PROGRESS);
      const promiseFindVoteItems = voteItems.map((voteItemId) => voteService.findVoteItemById(voteItemId));
      const findedVoteItems = await Promise.all(promiseFindVoteItems);
      const voteItemsInfo = findedVoteItems.map(({ id, value }) => ({ id, value, checked: false }));
      setItems(voteItemsInfo);
      setCastProgressStatus(IN_SUCCESS);
    };
    componentDidMount();
  }, []);

  return (
    <div>
      투표하기
      {
        castProgressStatus === IN_SUCCESS ?
        <>
            {
              !!items.length &&
              <ul>
                {
                  items.map(({ id, value, checked }) => (
                    <li key={id}>
                      <input type='checkbox' id={id} value={id} checked={checked} onChange={() => { handleChagneCheck(id) }} />
                      <label htmlFor={id}>{value}</label>
                    </li>
                  ))
                }
              </ul>
            }
            <button type='button' onClick={handleClickCast}>투표하기</button>
            <Link to='/'>취소</Link>
        </>
        :
        castProgressStatus === IN_PROGRESS ?
          <div>Casting...</div>
          :
          castProgressStatus === IN_FAIL && 
            <div>Fail...</div>
      }
      
    </div>
  )
}

export default VoteCasting;