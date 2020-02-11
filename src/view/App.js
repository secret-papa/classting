import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';

import Home from './page/Home';
import VoteDetail from './page/VoteDetail';
import Progress from './ui/Progress';
import Header from './component/layout/Header'
import { useSelectUser } from './hook/redux/user';
import SignIn from './page/auth/SignIn';
import NotFound from './page/error/NotFound';
import { createSetUserAction } from '../redux/user';
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
        { user && <Button color='inherit' onClick={handleClickSignOut}>로그아웃</Button> }
      </Header>
      {
        isLoadedUser ?
          <Switch>
            <Route exact path={'/'}>
              {
                user ?
                  <Home authService={service.auth} voteService={service.vote} />
                :
                  <Redirect to="/signIn" />
                  }
            </Route>
            <Route
              path={'/vote/:voteId'}
              render={
                (props) => user ?
                  <VoteDetail {...props} voteService={service.vote} />
                :
                  <Redirect to="/signIn" />
              }
              exact
            />
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