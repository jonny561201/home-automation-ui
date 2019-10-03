import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className="login-menu column">
            <div className="login-header">
                <h1 className="header-text">Member Login</h1>
            </div>
            <div className="login-body">
                <div className="column">
                    <input type="text" name="Username" placeholder="Username" />
                </div>
                <div className="column">
                    <input type="password" name="Password" placeholder="Password" />
                </div>
                <div className="column">
                    <button>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;