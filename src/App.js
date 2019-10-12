import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';



const MainMenu = () => {
  return (
    <div>
      <Link to="/">
        <button>Login</button>
      </Link>
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <header className="App-header">
          {/* <Home /> */}
          <MainMenu />
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </header>
      </Router>
    );
  }
}