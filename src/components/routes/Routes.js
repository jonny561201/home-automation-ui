import React, { useContext } from 'react';
import Login from '../../pages/Login';
import PrivateRoute from '../routes/PrivateRoutes';
import Home from '../../pages/Home/Home';
import Activities from '../../pages/Activities/Activities';
import Account from '../../pages/Account/Account';
import Settings from '../../pages/Settings';
import { Context } from '../../state/Store';
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default function Routes() {
    const [state, ] = useContext(Context);
    
    return (
        <Router>
        <header className="App-header" data-testid="app-routes">
          <Route exact path="/home-automation-ui" render={() => <Login />} />
            <div>
              <PrivateRoute authed={state.isAuthenticated} path='/home-automation-ui/home' component={Home} />
              <PrivateRoute authed={state.isAuthenticated} path='/home-automation-ui/activities' component={Activities} />
              <PrivateRoute authed={state.isAuthenticated} path='/home-automation-ui/settings' component={Settings} />
              <PrivateRoute authed={state.isAuthenticated} path='/home-automation-ui/account' component={Account} />
            </div>
        </header>
      </Router>
    );
}