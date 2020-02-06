import React, { useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from './page/Home';
import SignIn from './page/sign/SignIn';
import NotFound from './page/error/NotFound';
import { createSetUserAction } from '../redux/user';

function App({ service }) {

  useEffect(() => {
    service.auth.authStateChange(createSetUserAction);
  }, [ service.auth ]);
  
  return (
    <div>
      <Switch>
        <Route exact path={'/'}>
          <Home authService={service.auth} />
        </Route>
        <Route path={'/signIn'}>
          <SignIn authService={service.auth} />
        </Route>
        <Route path={'*'}>
          <NotFound/>
        </Route>
      </Switch>
    </div>
  )
}

export default App;