import React from 'react';
import { Divider, TextField } from '@material-ui/core';

export default function RegisterDevice() {

    return (
        <div>
            <h2 data-testid={"data-add-device"}>Add Device</h2>
            <Divider />
            <form>
                <div className="account-row">
                    <TextField variant="outlined" label="Add Device" />
                </div>
                <button>Add</button>
            </form>
        </div>
    );
}