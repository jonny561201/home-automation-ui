import React from 'react';
import './Login.css';
import '../components/header/UserPass';
import LogoHeader from '../components/header/LogoHeader';
import UserPass from '../components/header/UserPass';
import { getStore } from '../state/GlobalState';


export default function Login(props) {
    getStore().setActivePage('Login');

    return (
        <div className="login-menu column">
            <div data-testid={"login-header"} className="login-header">
                <LogoHeader />
                <h1>Member Login</h1>
            </div>
            <div className="login-body">
                <UserPass />
            </div>
        </div>
    );
}