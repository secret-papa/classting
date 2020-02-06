import React, { useCallback } from 'react';

function Home({ authService }) {
  const handleClickSignOut = useCallback(() => {
    authService.signOut();
  }, [ authService ])
  return <div>
    Home
    <button type='button' onClick={handleClickSignOut}>로그아웃</button>
  </div>
}

export default Home;