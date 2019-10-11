import React from 'react';
import './Login.css';
import '../components/UserPass';
import LogoHeader from '../components/LogoHeader';
import UserPass from '../components/UserPass';

export default function Login() {
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