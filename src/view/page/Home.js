import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LayerPopUp from '../ui/LayerPopUp';
import VoteCreator from '../container/vote/VoteCreateor';
import VoteList from '../container/vote/VoteList';

function Home({ authService, voteService }) {
  const [createVotePopUpStatus, setCreateVotePopUpStatus] = useState(false);

  const closeCreateVotePopUp = () => setCreateVotePopUpStatus(false);
  const openCreateVotePopUp = () => setCreateVotePopUpStatus(true);

  const handleClickSignOut = () => {
    authService.signOut();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Classting
          </Typography>
          <Button color='inherit' onClick={handleClickSignOut}>로그아웃</Button>
        </Toolbar>
      </AppBar>
      {
        createVotePopUpStatus && (
          <LayerPopUp>
            <VoteCreator closeForm={closeCreateVotePopUp} voteService={voteService} />
          </LayerPopUp>
        )
      }
      <VoteList voteService={voteService} openCreatorVoteForm={openCreateVotePopUp} />
    </div>
  )
}

export default Home;