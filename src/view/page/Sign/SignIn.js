import React, { useState } from 'react';

function SignIn({ authService }) {
  const [emailForm, setEmailForm] = useState({
    email: '',
    pwd: ''
  });

  const handleClickSignInWithGoogle = () => {
    authService.signInWithGoogle();
  };

  const handleClickSignInEmail = () => {
    authService.signInEmail(emailForm.email, emailForm.pwd);
  };

  const handleChangeEmailForm = ({ target: { name, value }}) => {
    setEmailForm({
      ...emailForm,
      [name]: value
    })
  };

  return (
    <div>
      <div>
        <input type='email' value={emailForm.email} name='email' onChange={handleChangeEmailForm} />
        <input type='password' value={emailForm.pwd} name='pwd' onChange={handleChangeEmailForm} />
        <button type='button' onClick={handleClickSignInEmail}>이메일 로그인</button>
      </div>
      <button type='button' onClick={handleClickSignInWithGoogle}>구글 로그인</button>
    </div>
  )
}

export default SignIn;