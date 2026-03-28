import React from 'react';
import './Login.css';
import LogoHeader from '../../components/header/LogoHeader';
import UserPass from './UserPass';
import { getStore } from '../../state/GlobalState';


export default function Login() {
    getStore().setActivePage('Login');

    return (
        <div className="login-menu column">
            <div data-testid={"login-header"} className="login-header header-text">
                <LogoHeader />
                <h1>Member Login</h1>
            </div>
            <div className="login-body body">
                <UserPass />
            </div>
        </div>
    );
}