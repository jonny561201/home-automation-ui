import React, { useState, useContext } from 'react';
import useSound from 'use-sound';
import jwt_decode from 'jwt-decode';
import clickSound from '../../resources/click.mp3';
import { Redirect } from 'react-router-dom';
import { Context } from '../../state/Store';
import { getBearerToken } from '../../utilities/RestApi';
import { TextField } from '@material-ui/core';
import './UserPass.css';


export default function UserPass() {
    const [click] = useSound(clickSound, {volume: 0.25});
    const [state, dispatch] = useContext(Context);
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(undefined);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(undefined);
    const [isValidLogin, setIsValidLogin] = useState(true);

    const validateCredentials = async (event) => {
        event.preventDefault();
        click();
        const userInvalid = username == null || username === '';
        const passInvalid = password == null || password === '';
        setIsUsernameInvalid(userInvalid);
        setIsPasswordInvalid(passInvalid)
        await getBearerTokenFromLogin(userInvalid, passInvalid);
    };

    const getBearerTokenFromLogin = async (userInvalid, passInvalid) => {
        if (userInvalid === false && passInvalid === false) {
            const response = await getBearerToken(username, password);
            setIsValidLogin(response);
            if (response) {
                const decodedToken = jwt_decode(response.bearerToken);
                await dispatch({ type: 'SET_BEARER_TOKEN', payload: response.bearerToken });
                await dispatch({ type: 'SET_USER_ID', payload: decodedToken.user.user_id });
                await dispatch({ type: 'SET_ROLES', payload: decodedToken.user.roles });
                const garageRole = decodedToken.user.roles.find(x => x.role_name === 'garage_door');
                await dispatch({ type: 'SET_GARAGE_ROLE', payload: garageRole });
                await dispatch({ type: 'SET_FIRST_NAME', payload: decodedToken.user.first_name });
                await dispatch({ type: 'SET_LAST_NAME', payload: decodedToken.user.last_name });
                await dispatch({ type: 'SET_DEVICES_TO_REGISTER', payload: unregisteredDevices(decodedToken.user.roles) });
                await dispatch({ type: 'SET_AUTHENTICATION', payload: true });
                await dispatch({ type: 'SET_STARTED_GARAGE_REGISTRATION', payload: garageRole && garageRole.device_id ? true : false });
                await dispatch({ type: 'SET_DEVICE_ID', payload: garageRole && garageRole.device_id ? garageRole.device_id : null })
            }
        }
    };

    const unregisteredDevices = (roles) => {
        const garageRole = roles.find(x => x.role_name === 'garage_door');
        if (garageRole) {
            if (!garageRole.devices || garageRole.devices.length === 0) {
                return true;
            }
        }
        return false;
    };

    if (state.isAuthenticated) {
        return <Redirect to='/home-automation-ui/home' />
    }
    return (
        <div>
            <form onSubmit={validateCredentials} className="user-pass-body">
                <div className="column">
                    <TextField inputProps={{"data-testid": "user-name"}} className="user-pass-input" error={isUsernameInvalid} onChange={(event) => setUsername(event.target.value)} value={username} variant="outlined" label="Username"/>
                </div>
                <div className="column">
                    <TextField inputProps={{"data-testid":"password"}} className="user-pass-input" error={isPasswordInvalid} onChange={(event) => setPassword(event.target.value)} value={password} variant="outlined" label="Password" type="password"/>
                </div>
                <div className="error-text">
                    {isValidLogin
                        ? <p></p>
                        : <p>ERROR: Username or Password is invalid!</p>
                    }
                </div>
                <button type="submit" className="column success-ripple">Login</button>
            </form>
        </div>
    )
}   