import React, { useEffect } from 'react';
import Store from './state/Store';
import Routes from './components/routes/Routes';
import { setTheme } from './utilities/Services';
import { BrowserRouter } from 'react-router-dom';
import ClaimsInitializer from './state/ClaimsInitializer';
import './App.css';
import ApiInterval from './utilities/ApiInterval';


export default function App() {

    useEffect(() => {
        const theme = localStorage.hasOwnProperty('theme') ? localStorage.getItem('theme') : 'theme-light';
        setTheme(theme);
    }, []);

    return (
        <BrowserRouter>
            <Store>
                <ClaimsInitializer>
                    <ApiInterval>
                        <Routes/>
                    </ApiInterval>
                </ClaimsInitializer>
            </Store>
        </BrowserRouter>
    );
}