import React, { useContext } from 'react';
import Login from '../../pages/Login';
import PrivateRoute from '../routes/PrivateRoutes';
import Home from '../../pages/Home';
import Account from '../../pages/Account'
import Settings from '../../pages/Settings';
import { Context } from '../../state/Store';
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default function Routes() {
    const [state, ] = useContext(Context);
    
    return (
        <Router>
        <header className="App-header">
          <Route exact path="/" render={() => <Login />} />
            <div>
              <PrivateRoute authed={state.isAuthenticated} path='/home' component={Home} />
              <PrivateRoute authed={state.isAuthenticated} path='/settings' component={Settings} />
              <PrivateRoute authed={state.isAuthenticated} path='/account' component={Account} />
            </div>
        </header>
      </Router>
    );
}