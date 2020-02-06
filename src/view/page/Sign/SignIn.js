import React, { useState } from 'react';

function SignIn({ authService }) {
  const [emailForm, setEmailForm] = useState({
    email: '',
    pwd: ''
  });

  const handleChangeEmailForm = ({ target: { name, value } }) => {
    setEmailForm({
      ...emailForm,
      [name]: value
    })
  };

  const handleClickSignInEmail = () => {
    authService.signInEmail(emailForm.email, emailForm.pwd);
  };

  const handleClickSignInWithGoogle = () => {
    authService.signInWithGoogle();
  };

  return (
    <div>
      <div>
        <input name='email' type='email' value={emailForm.email} onChange={handleChangeEmailForm} />
        <input name='pwd' type='password' value={emailForm.pwd} onChange={handleChangeEmailForm} />
        <button type='button' onClick={handleClickSignInEmail}>이메일 로그인</button>
      </div>
      <button type='button' onClick={handleClickSignInWithGoogle}>구글 로그인</button>
    </div>
  )
}

export default SignIn;