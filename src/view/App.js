import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Progress from './ui/Progress';
import Button from '@material-ui/core/Button';
import Home from './page/Home';
import Header from './component/layout/Header'
import NotFound from './page/error/NotFound';
import SignIn from './page/auth/SignIn';
import VoteDetail from './page/VoteDetail';
import { createSetUserAction } from '../redux/user';
import { useSelectUser } from './hook/redux/user';
import './styles/style.scss';

function App({ service }) {

  const { isLoadedUser, user } = useSelectUser();

  const handleClickSignOut = () => {
    service.auth.signOut();
  }

  useEffect(() => {
    service.auth.authStateChange(createSetUserAction);
  }, [ service.auth ]);

  return (
    <div id={'main'}>
      <Header>
        {user && <Button color='inherit' onClick={handleClickSignOut}>로그아웃</Button>}
      </Header>
      {
        isLoadedUser ?
          <Switch>
            <Route path={'/'} exact>
              { user ? <Home authService={service.auth} voteService={service.vote} /> : <Redirect to="/signIn" /> }
            </Route>
            <Route path={'/vote/:voteId'} render={(props) => <VoteDetail {...props} voteService={service.vote} />} />
            <Route path={'/signIn'}>
              { !user ? <SignIn authService={service.auth} /> : <Redirect to="/" />  }
            </Route>
            <Route path={'*'}>
              <NotFound />
            </Route>
          </Switch>
        :
          <Progress/>
      }
    </div>
  )
}

export default App;