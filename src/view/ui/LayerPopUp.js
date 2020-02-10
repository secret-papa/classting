import React from 'react';
import ReactDOM from 'react-dom';

function LayerPopUp({ children }) {
  return (
    ReactDOM.createPortal(
      <div>
        { children }
      </div>,
      document.getElementById('popUp')
    )
  )
}

export default LayerPopUp;