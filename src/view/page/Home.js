import React, { useState } from 'react';

import LayerPopUp from '../ui/LayerPopUp';
import VoteCreator from '../container/vote/VoteCreateor';
import VoteList from '../container/vote/VoteList';

function Home({ voteService }) {
  const [createVotePopUpStatus, setCreateVotePopUpStatus] = useState(false);

  const closeCreateVotePopUp = () => setCreateVotePopUpStatus(false);
  const openCreateVotePopUp = () => setCreateVotePopUpStatus(true);

  return (
    <div>
      {
        createVotePopUpStatus && (
          <LayerPopUp>
            <VoteCreator voteService={voteService} closeForm={closeCreateVotePopUp} />
          </LayerPopUp>
        )
      }
      <VoteList voteService={voteService} openCreatorVoteForm={openCreateVotePopUp} />
    </div>
  )
}

export default Home;