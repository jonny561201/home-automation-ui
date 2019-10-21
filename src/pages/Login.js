import React from 'react';
import './Login.css';
import '../components/header/UserPass';
import LogoHeader from '../components/header/LogoHeader';
import UserPass from '../components/header/UserPass';


export default function Login(props) {
    return (
        <div className="login-menu column">
            <div className="login-header">
                <LogoHeader />
                <h1>Member Login</h1>
            </div>
            <div className="login-body">
                <UserPass updateAuth={props.updateAuth} apiRequests={props.apiRequests} />
            </div>
        </div>
    );
}