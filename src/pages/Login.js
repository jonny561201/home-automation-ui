import React from 'react';
import './Login.css';
import '../components/header/UserPass';
import LogoHeader from '../components/header/LogoHeader';
import UserPass from '../components/header/UserPass';
import { useState } from '../TestState';


export default function Login(props) {
    useState().setActivePage('Login');
    return (
        <div className="login-menu column">
            <div className="login-header">
                <LogoHeader />
                <h1>Member Login</h1>
            </div>
            <div className="login-body">
                <UserPass apiRequests={props.apiRequests} />
            </div>
        </div>
    );
}