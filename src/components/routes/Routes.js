import React, { useContext } from 'react';
import Login from '../../pages/Login/Login';
import PrivateRoute from '../routes/PrivateRoutes';
import Home from '../../pages/Home/Home';
import Activities from '../../pages/Activities/Activities';
import Account from '../../pages/Account/Account';
import Settings from '../../pages/Settings/Settings';
import { Context } from '../../state/Store';
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default function Routes() {
  const [state,] = useContext(Context);

  return (
    <Router>
      <header className="App-header" data-testid="app-routes">
        <Route exact path="/" render={() => <Login />} />
        <div>
          <PrivateRoute authed={state.auth.isAuthenticated} path='/home' component={Home} />
          <PrivateRoute authed={state.auth.isAuthenticated} path='/activities' component={Activities} />
          <PrivateRoute authed={state.auth.isAuthenticated} path='/settings' component={Settings} />
          <PrivateRoute authed={state.auth.isAuthenticated} path='/account' component={Account} />
        </div>
      </header>
    </Router>
  );
}