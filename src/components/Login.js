import React from 'react';
import './Login.css';
import './UserPass';
import Logo from '../resources/CompanyLogo.png';
import UserPass from './UserPass';

function Login() {
    return (
        <div className="login-menu column">
            <div className="login-header">
                <div className="white-header">
                    <div className="logo-background">
                        <img alt="Logo" className="logo-image" src={Logo} />
                    </div>
                </div>
                <h1>Member Login</h1>
            </div>
            <div className="login-body">
                <UserPass />
            </div>
        </div>
    );
}

export default Login;