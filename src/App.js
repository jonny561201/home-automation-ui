import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import ApiRequests from './utilities/RestApi';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.apiRequests = new ApiRequests();
    this.authenticate = this.authenticate.bind(this);
    this.state = {
      isAuthenticated: false
    };
  }

  authenticate = () => {
    this.setState({ isAuthenticated: true });
  }

  render() {
    return (
      <Router>
        <header className="App-header">
          <Route exact path="/" render={() => <Login updateAuth={this.authenticate} apiRequests={this.apiRequests} />} />
          {this.state.isAuthenticated &&
            <Route exact path="/home" component={Home} />
          }
          <Route exact path="/settings" component={Home} />
        </header>
      </Router>
    );
  }
}