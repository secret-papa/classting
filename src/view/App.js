import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Home from './page/Home';
import NotFound from './page/error/NotFound';
import SignIn from './page/auth/SignIn';
import { createSetUserAction } from '../redux/user';
import { useSelectUser } from './hook/redux/user'

function App({ service }) {

  const { isLoadedUser, user } = useSelectUser();

  useEffect(() => {
    service.auth.authStateChange(createSetUserAction);
  }, [ service.auth ]);
  
  return (
    <div>
      {
        isLoadedUser ?
        <Switch>
          <Route path={'/'} exact>
            { user ? <Home authService={service.auth} voteService={service.vote} /> : <Redirect to="/signIn" /> }
          </Route>
          <Route path={'/signIn'}>
            { !user ? <SignIn authService={service.auth} /> : <Redirect to="/" />  }
          </Route>
          <Route path={'*'}>
            <NotFound />
          </Route>
        </Switch>
        :
        <div>로딩중...</div>
      }
    </div>
  )
}

export default App;