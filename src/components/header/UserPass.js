import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './UserPass.css';
import { getBearerToken } from '../../utilities/RestApi'
import { getStore } from '../../GlobalState';


export default function UserPass() {
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isValidLogin, setIsValidLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const validateCredentials = async (event) => {
        event.preventDefault();
        username == null || username === '' ? setIsUsernameInvalid(true) : setIsUsernameInvalid(false);
        password == null || password === '' ? setIsPasswordInvalid(true) : setIsPasswordInvalid(false);
        await getBearerTokenFromLogin();
    };

    const getBearerTokenFromLogin = async () => {
        if (isUsernameInvalid === false && isPasswordInvalid === false) {
            const response = await getBearerToken(username, password);
            setIsValidLogin(response);
            if (response) {
                getStore().updateAuth(true);
                setIsAuthenticated(true);
            }
        }
    };
    
    if (isAuthenticated) {
        return <Redirect to='/home' />
    }
    return (
        <div>
            <form onSubmit={validateCredentials}>
                <div className="column">
                    <input onChange={(event) => setUsername(event.target.value)} type="text" name="Username" placeholder="Username" />
                </div>
                {isUsernameInvalid
                    ? <p className="error-text">Invalid username!</p>
                    : <p className="spacer"></p>
                }
                <div className="column">
                    <input onChange={(event) => setPassword(event.target.value)} type="password" name="Password" placeholder="Password" />
                </div>
                {isPasswordInvalid
                    ? <p className="error-text">Invalid password!</p>
                    : <p className="spacer"></p>
                }
                <div className="error-text">
                    {isValidLogin
                        ? <p></p>
                        : <p>ERROR: Username or Password is invalid!</p>
                    }
                </div>
                <button type="submit" className="column">Login</button>
            </form>
        </div>
    )
}   