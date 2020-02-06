import React, { useCallback } from 'react';

function SignIn({ authService }) {
  const handleClickSignInWithGoogle = useCallback(() => {
    authService.signInWithGoogle();
  }, [ authService ]);


  const email = 'lsh41319kr@naver.com';
  const pwd = 'clfwjsehd566@';
  const handleClickSignInEmail = useCallback(() => {
    authService.signInEmail(email, pwd);
  }, [ authService ]);

  return (
    <div>
      <button type='button' onClick={handleClickSignInEmail}>이메일 회원가입</button>
      <button type='button' onClick={handleClickSignInWithGoogle}>구글 로그인</button>
    </div>
  )
}

export default SignIn;