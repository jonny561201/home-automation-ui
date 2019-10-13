import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateAuthenticated = this.updateAuthenticated.bind(this);
    this.state = {
      isAuthenticated: true
    };
  }

  updateAuthenticated = () => {
    this.setState({ isAuthenticated: !this.state.isAuthenticated });
    console.log('Auth State: ' + this.state.isAuthenticated);
  }

  render() {
    return (
      <Router>
        <header className="App-header">
          <Route exact path="/" render={() => <Login updateAuth={this.updateAuthenticated} />} />
          {this.state.isAuthenticated &&
            <Route exact path="/home" component={Home} />
          }
          <Route exact path="/settings" component={Home} />
        </header>
      </Router>
    );
  }
}