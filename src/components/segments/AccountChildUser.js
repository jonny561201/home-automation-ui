import React, { useState, useEffect } from 'react';
import { getStore } from '../../state/GlobalState';
import { addUserChildAccount, getUserChildAccounts, deleteUserChildAccount } from '../../utilities/RestApi';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Divider, MenuItem, Select, InputLabel, Input } from '@material-ui/core';
import "./AccountChildUser.css"

export default function AccountChildUser() {
    const [roles,] = useState(getStore().getUserRoles());
    const [selectedRole, setSelectedRole] = useState([]);
    const [email, setEmail] = useState("");
    const [test, setTest] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await getUserChildAccounts(getStore().getUserId());
            setTest(response);
        };
        getData();
    }, []);


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
                    <tbody>
                        <tr className="table-header" ><th>User</th><th>Roles</th><th></th></tr>
                        {test.map(x => (
                            <tr className="table-rows" key={`user-${x.user_name}`}>
                                <td>{x.user_name}</td><td>{x.roles.join(', ')}</td><td className="table-delete-user table-end-item"><CancelIcon onClick={() => deleteUserChildAccount(getStore().getUserId(), x.user_id)}/></td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <input data-testid="email-account-user" onChange={(input) => { setEmail(input.target.value) }} name="Email" placeholder="Email" />
                                {/* <TextField data-testid="email-account-user" className="email-account-user" variant="outlined" label="Email" value={email} onChange={(input) => { setEmail(input.target.value) }} /> */}
                            </td>
                            <td>
                                <InputLabel className="roles-account-user" id="demo-mutiple-name-label">Roles</InputLabel>
                                <Select data-testid="roles-account-user" multiple value={selectedRole} onChange={(input) => { setSelectedRole(input.target.value) }} input={<Input />} >
                                    {roles.map((role) => (
                                        <MenuItem key={role.role_name} value={role.role_name}>
                                            {role.role_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </td>
                            <td className="table-end-item">
                                <div onClick={(event) => {submitChildAccount(event)}}>
                                    <AddCircleIcon type="submit" className="table-add-user" data-testid="add-user-button" />
                                </div>
                                {/* <button data-testid="add-user-button">Add User</button> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}