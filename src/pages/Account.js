import React from 'react';
import Header from '../components/header/Header';
import {Divider} from '@material-ui/core';

export default function Account() {

    return (
        <div>
            <div className="settings-header">
                <Header />
            </div>
            <div className="settings-body">
                <div className="settings-wrapper">
                    <div className="settings-group settings-text">
                        <h2>Change Password</h2>
                        <Divider />
                    </div>
                </div>

            </div>
        </div>
    );
}