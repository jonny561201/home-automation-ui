import React, { useState, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import './UserPass.css';
import { Context } from '../../state/Store';
import { getBearerToken } from '../../utilities/RestApi';


export default function UserPass() {
    const [state, dispatch] = useContext(Context);
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isValidLogin, setIsValidLogin] = useState(true);

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
                const decodedToken = jwt_decode(response.bearerToken);
                dispatch({type: 'SET_AUTHENTICATION', payload: true});
                dispatch({type: 'SET_BEARER_TOKEN', payload: response.bearerToken})
                dispatch({type: 'SET_ROLES', payload: decodedToken.user.roles})
                dispatch({type: 'SET_USER_ID', payload: decodedToken.user.user_id})
                dispatch({type: 'SET_FIRST_NAME', payload: decodedToken.user.first_name})
                dispatch({type: 'SET_LAST_NAME', payload: decodedToken.user.last_name})
            }
        }
    };
    
    if (state.isAuthenticated) {
        return <Redirect to='/home' />
    }
    return (
        <div>
            <form onSubmit={validateCredentials}>
                <div className="column">
                    <input data-testid={"user-name"} onChange={(event) => setUsername(event.target.value)} type="text" name="Username" placeholder="Username" />
                </div>
                {isUsernameInvalid
                    ? <p className="error-text">Invalid username!</p>
                    : <p className="spacer"></p>
                }
                <div className="column">
                    <input data-testid={"password"} onChange={(event) => setPassword(event.target.value)} type="password" name="Password" placeholder="Password" />
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