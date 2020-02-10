import React, { useState } from 'react';
import classnames from 'classnames/bind';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import style from './SignInStyle.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IN_INIT, IN_SUCCESS, IN_PROGRESS, IN_FAIL } from '../../constant/progress';

const cx = classnames.bind(style);

function SignIn({ authService }) {
  const [progressStatus, setProgressStatus] = useState(IN_INIT);
  const [emailForm, setEmailForm] = useState({
    email: '',
    pwd: ''
  });

  const [formError, setFormError] = useState({
    email: {
      isError: false,
      message: ''
    },
    password: {
      isError: false,
      message: ''
    },
    etc: {
      isError: false,
      message: ''
    }
  });

  const controlErrorView = (error) => {
    if (error.code === 'auth/emailError') {
      setFormError((state) => ({
        ...state,
        email: {
          isError: true,
          message: error.message
        },
        etc: {
          isError: false,
          message: ''
        }
      }));
    } else if (error.code === 'auth/passwordError') {
      setFormError((state) => ({
        ...state,
        password: {
          isError: true,
          message: error.message
        },
        etc: {
          isError: false,
          message: ''
        }
      }));
    } else if (error.code === 'auth/etcError') {
      setFormError((state) => ({
        ...state,
        etc: {
          isError: true,
          message: error.message
        }
      }));
    }
  }

  const handleChangeEmailForm = ({ target: { name, value } }) => {
    setEmailForm({
      ...emailForm,
      [name]: value
    })
  };

  const handleClickSignInEmail = async () => {
    setProgressStatus(IN_PROGRESS);
    const result = await authService.signInEmail(emailForm.email, emailForm.pwd);
    if (!result.success) {
      controlErrorView(result);
      setProgressStatus(IN_FAIL);
    }
  };

  const handleClickSignUpEmail = async () => {
    setProgressStatus(IN_PROGRESS);
    const result = await authService.signUpEmail(emailForm.email, emailForm.pwd);
    if (!result.success) {
      controlErrorView(result);
      setProgressStatus(IN_FAIL);
    }
  }

  const handleClickSignInWithGoogle = () => {
    authService.signInWithGoogle();
  };

  return (
    <div className={`${cx('sign_container')}`}>
      <div className={`${cx('sign_box')}`}>
        <h1 className={`${cx('sign_title')}`}>Vote Classting</h1>
        <TextField
          className={`${cx('email_form')}`}
          type='email'
          label='Email'
          name='email'
          value={emailForm.email}
          autoComplete="off"
          onChange={handleChangeEmailForm}
          error={formError.email.isError}
          helperText={formError.email.message}
        />
        <TextField
          className={`${cx('email_form')}`}
          type='password'
          label='Password'
          name='pwd'
          value={emailForm.pwd}
          onChange={handleChangeEmailForm}
          error={formError.password.isError}
          helperText={formError.password.message}
        />
        {
          formError.etc.isError &&
          <span className={cx('login_error')}>{formError.etc.message}</span>
        }
        <Button className={cx('login_button')} onClick={handleClickSignUpEmail}>회원가입</Button>
        <Button className={cx('login_button')} color='primary' onClick={handleClickSignInEmail}>이메일 로그인</Button>
        <Button className={cx('login_button')} color='secondary' onClick={handleClickSignInWithGoogle}>구글 로그인</Button>
        {
          progressStatus === IN_PROGRESS &&
          <div className={cx('login_progress')}>
            <CircularProgress size={20} />
          </div>
        }
      </div>
    </div>
  )
}

export default SignIn;