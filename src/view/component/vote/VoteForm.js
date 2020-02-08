import React, { useState } from 'react';
import VoteItemForm from './VoteItemForm';

function VoteForm({
  title, 
  startTime,
  endTime,
  voteItems,
  changeVoteForm,
  setVoteItems,
  confirmVote
}) {
  
  const [addtionalVoteItemValue, setAddtionalVoteItemValue] = useState('');
  const [validator, setValidator] = useState({
    title: true,
    startTime: true,
    endTime: true,
    votItemSize: true,
    voteItemValue: true
  });

  const addVoteItem = () => {
    if (addtionalVoteItemValue && validator.voteItemValue) {
      if (voteItems.length > 1) setValidator((validator) => ({
        ...validator,
        votItemSize: true
      }));
      
      setVoteItems(voteItems.concat(addtionalVoteItemValue));
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
    }
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
    setVoteItems(voteItems.map((value, idx) => targetIdx === idx ? updateValue : value))
  }

  return (
    <div>
      <label>제목</label>
      <input name='title' value={title} onChange={handleChangeTitle} />
      { !validator.title && <span>2글자 ~ 30글자</span> }
      <label>시작 시간</label>
      <input name='startTime' type='datetime-local' value={startTime} onChange={handleChangeStartTime} />
      { !validator.startTime && <span>종료 시간 보다 이른 시간</span> }
      <label>종료 시간</label>
      <input name='endTime' type='datetime-local' value={endTime} onChange={handleChangeEndTime} />
      { !validator.endTime && <span>시작 시간 보다 늦은 시간</span> }
      <div>
        <ul>
          {
            voteItems.map((value, idx) => (
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
      <div>
        <input value={addtionalVoteItemValue} onChange={handleChangeVoteItemValue} />
        <button type='button' onClick={addVoteItem}>항목 추가</button>
        {
          !validator.votItemSize && <span>항목은 3개 이상</span>
        }
        {
          !validator.voteItemValue && <span>최소 2글자 최대 10글자</span>
        }
      </div>
      <div>
        <button type='button' onClick={handleClickConfirm}>확인</button>
      </div>
    </div>
  )
}

export default VoteForm;