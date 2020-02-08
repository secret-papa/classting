import React from 'react';

function LayerPopUp({ closePopUp, children }) {

  const handleClickClosePopUp = () => {
    closePopUp();
  }

  return (
    <div>
      <button type='button' onClick={handleClickClosePopUp}>X</button>
      { children }
    </div>
  )
}

export default LayerPopUp;