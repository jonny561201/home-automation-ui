import React from 'react';

function Login() {
    return (
        <div>
            <div className="login-header">
                <p>Sign In</p>
            </div>
            <div className="login-body">
                <input name="Username" />
                <input name="Password" />
            </div>
        </div>
    );
}

export default Login;