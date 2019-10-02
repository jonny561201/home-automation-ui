import React from 'react';

function Login() {
    return (
        <div>
            <div className="login-header">
                <h1 className="header-text">Member Login</h1>
            </div>
            <div className="login-body">
                <input name="Username" />
                <input name="Password" />
                <button>Login</button>
            </div>
        </div>
    );
}

export default Login;