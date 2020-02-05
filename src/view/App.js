import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './page/Home';
import SignIn from './page/Sign/SignIn';
import NotFound from './page/error/NotFound';

function App({ service }) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={'/'}>
            <Home/>
          </Route>
          <Route path={'/signIn'}>
            <SignIn authService={service.auth} />
          </Route>
          <Route path={'*'}>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App;