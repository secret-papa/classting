import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


function Progress() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <CircularProgress />
    </div>
  )
}

export default Progress;