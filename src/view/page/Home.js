import React, { useState } from 'react';
import LayerPopUp from '../ui/LayerPopUp';
import VoteCreator from '../container/vote/VoteCreateor';

function Home({ authService, voteService }) {
  const [createVotePopUpStatus, setCreateVotePopUpStatus] = useState(false);

  const closeCreateVotePopUp = () => setCreateVotePopUpStatus(false);
  const openCreateVotePopUp = () => setCreateVotePopUpStatus(true);
  
  const handleClickCreateVote = () => {
    openCreateVotePopUp()
  };

  const handleClickSignOut = () => {
    authService.signOut();
  };

  return (
    <div>
      <button type='button' onClick={handleClickCreateVote}>투표 만들기</button>
      <button type='button' onClick={handleClickSignOut}>로그아웃</button>
      {
        createVotePopUpStatus && (
          <LayerPopUp closePopUp={closeCreateVotePopUp}>
            <VoteCreator voteService={voteService} />
          </LayerPopUp>
        )
      }
    </div>
  )
}

export default Home;