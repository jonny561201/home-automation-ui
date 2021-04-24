import React from 'react';
import './App.css';
import Store from './state/Store';
import Routes from './components/routes/Routes';


export default function App() {

  function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }

  (function () {
    localStorage.getItem('theme') === 'theme-dark'
      ? setTheme('theme-dark')
      : setTheme('theme-light')
  })()
  
  return (
    <Store>
      <Routes />
    </Store>
  );
}