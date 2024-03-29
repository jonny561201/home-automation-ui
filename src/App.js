import React from 'react';
import './App.css';
import Store from './state/Store';
import Routes from './components/routes/Routes';
import { setTheme } from './utilities/Services';


export default function App() {
  const theme = localStorage.hasOwnProperty('theme') ? localStorage.getItem('theme') : 'theme-light';
  setTheme(theme);

  return (
    <Store>
      <Routes />
    </Store>
  );
}