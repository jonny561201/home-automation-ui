import React from 'react';

function Login() {
    return (
        <div>
            <div className="login-header">
                <h1 className="header-text">Sign In</h1>
            </div>
            <div className="login-body">
                <input name="Username" />
                <input name="Password" />
            </div>
        </div>
    );
}

export default Login;