import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function Progress() {
  return (
    <div style={{
      alignItems: 'center',
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      position: 'fixed',
      top: 0,
      width: '100%'
    }}>
      <CircularProgress />
    </div>
  )
}

export default Progress;