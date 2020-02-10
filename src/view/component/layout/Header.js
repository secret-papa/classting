import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Header({
  children
}) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to='/'>
              Classting
            </Link>
          </Typography>
          { children }
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;