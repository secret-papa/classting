import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import classnames from 'classnames/bind';
import VoteItemForm from './VoteItemForm';
import { IN_SUCCESS, IN_FAIL, IN_PROGRESS } from '../../constant/progress';
import TextField from '@material-ui/core/TextField';
import style from './VoteForm.scss';

const cx = classnames.bind(style);

function VoteForm({
  progressStatus,
  title, 
  startTime,
  endTime,
  voteItems,
  changeVoteForm,
  setVoteItems,
  confirmVote,
  closeForm
}) {
  
  const [addtionalVoteItemValue, setAddtionalVoteItemValue] = useState('');
  const [validator, setValidator] = useState({
    title: true,
    startTime: true,
    endTime: true,
    votItemSize: true,
    voteItemValue: true,
    voteItemUnique: true,
  });

  const validateVoteItemOverlap = () => {
    if (voteItems.some(({ value }) => value === addtionalVoteItemValue)) {
      setValidator((validator) => ({
        ...validator,
        voteItemUnique: false
      }));
      return false;
    } else {
      setValidator(() => ({
        ...validator,
        voteItemUnique: true
      }));
      return true;
    }
  }

  const addVoteItem = () => {
    if (addtionalVoteItemValue && validator.voteItemValue && validateVoteItemOverlap()) {
      if (voteItems.length > 1) setValidator((validator) => ({
        ...validator,
        votItemSize: true
      }));
      
      setVoteItems(voteItems.concat({value: addtionalVoteItemValue}));
      setAddtionalVoteItemValue('');
    }
  }

  const deleteVoteItem = (targetIndex) => {
    setVoteItems(voteItems.filter((_, idx) => idx !== targetIndex));
  }

  const handleChangeEndTime = (e) => {
    const endTime = e.target.value;
    validateStartTime(startTime, endTime);
    validateEndTime(startTime, endTime);
    changeVoteForm(e);
  }

  const handleChangeStartTime = (e) => {
    const startTime = e.target.value;
    validateStartTime(startTime, endTime);
    validateEndTime(startTime, endTime);
    changeVoteForm(e);
  }

  const handleChangeTitle = (e) => {
    validateTitle(e.target.value);
    changeVoteForm(e);
  }

  const handleChangeVoteItemValue = ({ target: { value } }) => {
    validateVoteItemValue(value);
    setAddtionalVoteItemValue(value);
  }

  const handleClickConfirm = () => {
    const isTitleVali = validateTitle(title);
    const isStartTimeVali = validateStartTime(startTime, endTime);
    const isEndTimeVali = validateEndTime(startTime, endTime)
    const isVoteItemVali = validateVoteItemSize();

    if (
        isTitleVali &&
        isStartTimeVali &&
        isEndTimeVali &&
        isVoteItemVali
      ) {
      confirmVote({ title, startTime, endTime, voteItems })
    }
  }

  const handleClickClose = () => {
    closeForm();
  }

  const makeValidaeVoteItemValueCondition = (value) => {
    return value.length < 2 || value.length > 10;
  }

  const validateTitle = (value) => {
    if (value.length < 2 || value.length > 30) {
      setValidator((validator) => ({
        ...validator,
        title: false
      }));
      return false;
    } else {
      setValidator((validator) => ({
        ...validator,
        title: true
      }));
      return true;
    }
  }

  const validateStartTime = (startTime, endTime) => {
    if (new Date(startTime) - new Date(endTime) > 0) {
      setValidator((validator) => ({
        ...validator,
        startTime: false
      }));
      return false;
    } else {
      setValidator((validator) => ({
        ...validator,
        startTime: true
      }));
      return true;
    }
  }

  const validateEndTime = (startTime, endTime) => {
    if (new Date(endTime) - new Date(startTime) < 0) {
      setValidator((validator) => ({
        ...validator,
        endTime: false
      }));
      return false;
    } else {
      setValidator((validator) => ({
        ...validator,
        endTime: true
      }));
      return true;
    }
  }

  const validateVoteItemSize = () => {
    if (voteItems.length < 3) {
      setValidator((validator) => ({
        ...validator,
        votItemSize: false
      }));
      return false;
    } else {
      setValidator((validator) => ({
        ...validator,
        votItemSize: true
      }));
      return true;
    }
  }

  const validateVoteItemValue = (value) => {
    if (value && makeValidaeVoteItemValueCondition(value)) {
      setValidator((validator) => ({
        ...validator,
        voteItemValue: false
      }));
      return false;
    } else {
      setValidator((validator) => ({
        ...validator,
        voteItemValue: true
      }));
      return true;
    }
  }

  const updateVoteItem = (updateValue, targetIdx) => {
    setVoteItems(voteItems.map((voteItem, idx) => targetIdx === idx ?
    {
      ...voteItem,
      value: updateValue
    } : voteItem));
  }

  return (
    <div>
      {
        progressStatus === IN_SUCCESS ?
        <div className={cx('vote_form')}>
          <TextField
            className={cx('vote_form_item')}
            label='제목' 
            name='title'
            value={title}
            error={!validator.title}
            helperText={'최소 2글자에서 최대 30글자입니다.'}
            onChange={handleChangeTitle}
          />
          <TextField
            className={cx('vote_form_item')}
            label="시작 시간"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            name='startTime'
            value={startTime}
            error={!validator.startTime}
            helperText={'종료 시간 보다 늦은 시간 선택 불가'}
            onChange={handleChangeStartTime}
          />
          <TextField
            className={cx('vote_form_item')}
            label="종료 시간"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            name='endTime'
            value={endTime}
            error={!validator.endTime}
            helperText={'시작 시간 보다 이른 시간 선택 불가'}
            onChange={handleChangeEndTime}
          />
          <div className={cx('vote_form_item_container')}>
            <p className={cx('vote_form_item_title')}>항목</p>
            <ul className={cx('vote_form_item_list')}>
              {
                voteItems.map(({ id, value }, idx) => (
                  <li key={idx} >
                    <VoteItemForm
                      order={idx}
                      value={value}
                      deleteVoteItem={deleteVoteItem}
                      makeValueValidateCondition={makeValidaeVoteItemValueCondition}
                      updateVoteItem={updateVoteItem}
                    />
                  </li>
                ))
              }
            </ul>
          </div>
          <div className={cx('vote_form_vote_item_contorl')}>
            <TextField
              className={cx('vote_itme_control_add')}
              error={!validator.title}
              value={addtionalVoteItemValue}
              error={
                !validator.voteItemValue ||
                !validator.voteItemUnique ||
                !validator.votItemSize
              }
              helperText={
                !validator.voteItemValue ?
                  '최소 2글자 최대 10글자'
                :
                  !validator.voteItemUnique ?
                    '중복된 값 사용 불가'
                  :
                    !validator.votItemSize ?
                      '항목은 3개 이상'
                    :
                      ''
              }
              onChange={handleChangeVoteItemValue}
            />
            <Button onClick={addVoteItem}>항목 추가</Button>
          </div>
          <div className={cx('vote_form_control')}>
            <Button color="primary" onClick={handleClickConfirm}>확인</Button>
            <Button onClick={handleClickClose}>닫기</Button>
          </div>
        </div>
        :
        progressStatus === IN_PROGRESS ?
          <div>Loading...</div>
          :
          progressStatus === IN_FAIL &&
            <div>FAIL</div>
      }
    </div>
  )
}

export default VoteForm;