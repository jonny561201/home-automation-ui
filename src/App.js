import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Account from './pages/Account'
import Settings from './pages/Settings';
import { getStore } from './GlobalState';


export default function App() {
  return (
    <Router>
      <header className="App-header">
        <Route exact path="/" render={() => <Login />} />
        {getStore().isAuthenticated &&
          <div>
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/settings" render={() => <Settings />} />
            <Route exact path="/account"render={() => <Account />} />
          </div>
        }
      </header>
    </Router>
  );
}