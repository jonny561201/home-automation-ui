import React from 'react';
import Header from '../components/header/Header';
import { Divider, TextField } from '@material-ui/core';
import { getStore } from '../GlobalState';

export default function Account() {
    getStore().setActivePage('Account')

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
                        <div className="settings-row">
                            <TextField variant="outlined" label="Old Password" type="password"/>
                        </div>
                        <div className="settings-row">
                            <TextField variant="outlined" label="New Password" type="password"/>
                        </div>
                        <div className="settings-row">
                            <TextField variant="outlined" label="Confirm New Password" type="password"/>
                        </div>
                        <Divider />
                        <button>Submit</button>
                    </div>
                </div>

            </div>
        </div>
    );
}