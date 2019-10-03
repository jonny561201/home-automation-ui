import React from 'react';
import './Login.css';
import './UserPass';
import UserPass from './UserPass';

function Login() {
    return (
        <div className="login-menu column">
            <div className="login-header">
                <h1 className="header-text">Member Login</h1>
            </div>
            <div className="login-body">
                <UserPass />
                <div className="column">
                    <button>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;