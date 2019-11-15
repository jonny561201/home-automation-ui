import React from 'react';
import Header from '../components/header/Header';
import './Settings.css'
import { Switch } from '@material-ui/core';

export default function Settings() {
    return (
        <div>
            <div className="settings-header">
                <Header />
            </div>
            <div className="settings-body">
                <div>
                    <Switch className="fahrenheit-toggle" />
                    <p className="settings-text">Fahrenheit</p>
                </div>
            </div>
        </div>
    )
}