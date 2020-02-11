import classnames from 'classnames/bind';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import style from './VoteItemForm.scss';

const cx = classnames.bind(style);

function VoteItemFrom({
  order,
  value,
  deleteVoteItem,
  makeValueValidateCondition,
  updateVoteItem,
}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateValue, setUpdateValue] = useState(value);
  const [valueValidator, setValueValidator] = useState(true);

  const handleChangeUpdateValue =  ({target: { value }}) => {
    validateValue(value);
    setUpdateValue(value);
  }

  const handleClickActiveUpdate = () => {
    setIsUpdate(true);
  }

  const handleClickConfirmValue = () => {
    if (valueValidator) {
      setIsUpdate(false);
      updateVoteItem(updateValue, order);
    }
  };

  const handleClickDeleteVote = () => {
    deleteVoteItem(order);
  }

  const validateValue = (value) => {
    if (makeValueValidateCondition(value)) {
      setValueValidator(false);
      return false;
    } else {
      setValueValidator(true);
      return true;
    }
  }

  return (
    <div className={cx('vote_item_form')}>
      {
        isUpdate ?
        <>
          <TextField
            error={!valueValidator}
            helperText={'최소 2글자에서 최대 10글자입니다.'}
            value={updateValue}
            onChange={handleChangeUpdateValue}
          />
          <Button onClick={handleClickConfirmValue}>확인</Button>
        </>
        :
        <>
          <p className={cx('vote_item_form_vlaue')} >{updateValue}</p>
          <Button onClick={handleClickActiveUpdate}>항목 수정</Button>
          <Button color='secondary' onClick={handleClickDeleteVote}>항목 삭제</Button>
        </>
        
      }
    </div>
  )
}

export default VoteItemFrom;