import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  render() {
    return (
      <Router>
        <header className="App-header">
          <Route exact path="/" component={Login} />
          {this.state.isAuthenticated &&
            <Route exact path="/home" component={Home} />
          }
          <Route exact path="/settings" component={Home} />
        </header>
      </Router>
    );
  }
}