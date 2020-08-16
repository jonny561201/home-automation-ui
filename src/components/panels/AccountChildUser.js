import React, { useState } from 'react';
import { getStore } from '../../state/GlobalState';
import { addUserChildAccount } from '../../utilities/RestApi';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Divider, TextField, MenuItem, Select, InputLabel, Input, FormControl } from '@material-ui/core';
import "./AccountChildUser.css"

export default function AccountChildUser() {
    const [roles,] = useState(getStore().getUserRoles());
    const [selectedRole, setSelectedRole] = useState([]);
    const [email, setEmail] = useState("");
    const test = [{ user_name: 'Jon Graf', roles: ['garage_door', 'lighting'] }, { user_name: 'Kalynn Dawn', roles: ['garage_door'] }];

    const submitChildAccount = async (event) => {
        event.preventDefault();
        await addUserChildAccount(getStore().getUserId(), email, selectedRole);
    }

    return (
        <div>
            <form onSubmit={submitChildAccount}>
                <h2>Account Users</h2>
                <Divider />
                <table className="table-container">
                    <tr className="table-header" ><th>User</th><th>Roles</th><th></th></tr>
                    {test.map(x => (
                        <tr className="table-rows">
                            <td>{x.user_name}</td><td>{x.roles.join(', ')}</td><td><HighlightOffIcon className="table-delete-user"/></td>
                        </tr>
                    ))}
                </table>
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