import React, {useEffect} from 'react';
import './App.css';
import Store from './state/Store';
import Routes from './components/routes/Routes';
import { setTheme } from './utilities/Services';
import { BrowserRouter } from 'react-router-dom';


export default function App() {
    
    useEffect(() => {
        const theme = localStorage.hasOwnProperty('theme') ? localStorage.getItem('theme') : 'theme-light';
        setTheme(theme);
    }, []);

  return (
    <BrowserRouter>
      <Store>
        <Routes />
      </Store>
    </BrowserRouter>
  );
}