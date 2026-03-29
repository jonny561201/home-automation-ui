import React, { useContext, useEffect } from 'react';
import './Login.css';
import LogoHeader from '../../components/header/LogoHeader';
import UserPass from './UserPass';
import { Context } from '../../state/Store';


export default function Login() {
    const [, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Login' });
    }, [dispatch]);

    return (
        <div className="login-menu column">
            <div className="login-header header-text">
                <LogoHeader />
                <h1>Member Login</h1>
            </div>
            <div className="login-body body">
                <UserPass />
            </div>
        </div>
    );
}