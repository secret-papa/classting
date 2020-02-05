import React, { useCallback } from 'react';

function SignIn({ authService }) {
  const handleClickSignInWithGoogle = useCallback(async () => {
    const user = await authService.signInWithGoogle();
    console.log(user);
  }, [ authService ]);
  return (
    <div>
      <button type='button' onClick={handleClickSignInWithGoogle}>구글 로그인</button>
    </div>
  )
}

export default SignIn;