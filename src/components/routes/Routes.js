import React, { useContext } from 'react';
import Login from '../../pages/Login';
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
          {state.isAuthenticated &&
            <div>
              <Route exact path="/home" render={() => <Home />} />
              <Route exact path="/settings" render={() => <Settings />} />
              <Route exact path="/account" render={() => <Account />} />
            </div>
          }
        </header>
      </Router>
    );
}