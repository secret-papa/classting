import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames/bind';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import style from './LayerPopUp.scss';

const cx = classnames.bind(style);
const useStyles = makeStyles(() => ({
  page: {
    padding: 30
  }
}));

function LayerPopUp({ children }) {
  const classes = useStyles();

  return (
    ReactDOM.createPortal(
      <div className={cx('layer_popUp')}>
        <Paper className={classes.page} elevation={3} variant="outlined">{children}</Paper>
      </div>,
      document.getElementById('popUp')
    )
  )
}

export default LayerPopUp;