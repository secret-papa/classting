import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import style from './VoteCasting.scss';
import { IN_INIT, IN_PROGRESS, IN_SUCCESS, IN_FAIL } from '../../constant/progress';
import { castVoteAction } from '../../../redux/vote';

const cx = classnames.bind(style);

function VoteCasting({
  voteId,
  voteItems,
  voteService,
  setProgressStatus,
  setVoteInfo
}) {

  const dispatch = useDispatch();
  const [castProgressStatus, setCastProgressStatus] = useState(IN_INIT);
  const [items, setItems] = useState([]);
  const [isSelectItem, setIsSelectItem] = useState(false);

  const handleChagneCheck = (checkedId) => {
    setItems((items) => items.map(item => item.id === checkedId ? {...item, checked: true} : {...item, checked: false}));
    setIsSelectItem(true);
  };

  const handleClickCast = async () => {
    if (isSelectItem) {
      setProgressStatus(IN_PROGRESS);
      const { id } = items.filter(({ checked }) => checked)[0];
      await voteService.castVote(id);
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
  }, [ voteItems, voteService ]);

  return (
    <div className={cx('vote_cast_container')} >
      {
        castProgressStatus === IN_SUCCESS ?
        <div  className={cx('vote_coast_list_wrp')}>
            {
              !!items.length &&
              <List>
                {
                  items.map(({ id, value, checked })=> (
                    <ListItem key={id} dense button onClick={() => { handleChagneCheck(id) }}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText id={id} primary={value} />
                    </ListItem>
                  ))
                }
                
              </List>
            }
            <Button color='primary' onClick={handleClickCast}>투표하기</Button>
            <Button>
              <Link to='/'>취소</Link>
            </Button>
        </div>
        :
        castProgressStatus === IN_PROGRESS ?
          <div>Loading...</div>
          :
          castProgressStatus === IN_FAIL && 
            <div>Fail...</div>
      }
    </div>
  )
}

export default VoteCasting;