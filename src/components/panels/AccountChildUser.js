import React, { useState } from 'react';
import { getStore } from '../../state/GlobalState';
import { addUserChildAccount } from '../../utilities/RestApi';
import { Divider, TextField, MenuItem, Select, InputLabel, Input, FormControl } from '@material-ui/core';

export default function AccountChildUser() {
    const [roles, ] = useState(getStore().getUserRoles());
    const [selectedRole, setSelectedRole] = useState([]);
    const [email, setEmail] = useState("");

    const submitChildAccount = async (event) => {
        event.preventDefault();
        await addUserChildAccount(getStore().getUserId(), email, selectedRole);
    }

    return (
        <div>
            <form onSubmit={submitChildAccount}>
                <h2>Account Users</h2>
                <Divider />
                <div className="account-row">
                    <TextField data-testid="email-account-user" className="email-account-user" variant="outlined" label="Email" value={email} onChange={(input) => { setEmail(input.target.value) }} />
                    <FormControl >
                        <InputLabel className="roles-account-user" id="demo-mutiple-name-label">Roles</InputLabel>
                        <Select data-testid="roles-account-user" multiple value={selectedRole} onChange={(input) => { setSelectedRole(input.target.value) }} input={<Input />} >
                            {roles.map((role) => (
                                <MenuItem key={role.role_name} value={role.role_name}>
                                    {role.role_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <button data-testid="add-user-button">Add User</button>
            </form>
        </div>
    );
}