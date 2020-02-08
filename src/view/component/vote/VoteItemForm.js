import React, { useState } from 'react';

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
    <>
      {
        isUpdate ?
        <>
          <input value={updateValue} onChange={handleChangeUpdateValue} />
          <button type='button' onClick={handleClickConfirmValue}>확인</button>
          {
            !valueValidator && <span>최소 2글자 최대 10글자</span>
          }
        </>
        :
        <>
          <p>{updateValue}</p>
          <button type='button' onClick={handleClickActiveUpdate}>항목 수정</button>
          <button type='button' onClick={handleClickDeleteVote}>항목 삭제</button>
        </>
        
      }
    </>
    
  )
}

export default VoteItemFrom;