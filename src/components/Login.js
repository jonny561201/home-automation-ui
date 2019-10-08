import React from 'react';
import './Login.css';
import './UserPass';
import LogoHeader from '../components/LogoHeader';
import UserPass from './UserPass';

function Login() {
    return (
        <div className="login-menu column">
            <div className="login-header">
                <LogoHeader />
                <h1>Member Login</h1>
            </div>
            <div className="login-body">
                <UserPass />
            </div>
        </div>
    );
}

export default Login;