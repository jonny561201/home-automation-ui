import React from 'react';
import './App.css';
import Store from './state/Store';
import Routes from './components/routes/Routes';


export default function App() {
  return (
    <Store>
      <Routes />
    </Store>
  );
}