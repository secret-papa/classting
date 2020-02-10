import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Home from './page/Home';
import NotFound from './page/error/NotFound';
import SignIn from './page/auth/SignIn';
import VoteDetail from './page/VoteDetail';
import { createSetUserAction } from '../redux/user';
import { useSelectUser } from './hook/redux/user';
import './styles/style.scss';

function App({ service }) {

  const { isLoadedUser, user } = useSelectUser();

  useEffect(() => {
    service.auth.authStateChange(createSetUserAction);
  }, [ service.auth ]);

  return (
    <div id={'main'}>
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
        <div className={'main_progress'}>
          <CircularProgress />
        </div>
      }
    </div>
  )
}

export default App;