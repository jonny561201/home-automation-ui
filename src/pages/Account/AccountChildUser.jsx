import React, { useState, useContext, useEffect } from 'react';
import { getStore } from '../../state/GlobalState';
import { addUserChildAccount, getUserChildAccounts, deleteUserChildAccount } from '../../utilities/RestApi';
import { Context } from '../../state/Store';
import { Divider, MenuItem, Select, InputLabel, OutlinedInput, FormControl, Checkbox, TextField, ListItemText } from '@mui/material';
import { AddButton, RemoveButton } from '../../components/controls/Buttons';
import "./AccountChildUser.css"

export default function AccountChildUser() {
    const [state, _] = useContext(Context);
    const [roles,] = useState(getStore().getUserRoles());
    const [selectedRole, setSelectedRole] = useState([]);
    const [email, setEmail] = useState("");
    const [test, setTest] = useState([]);
    const [isEmailInvalid, setIsEmailInvalid] = useState(undefined);
    const [isRoleInvalid, setIsRoleInvalid] = useState(undefined);

    useEffect(() => {
        const getData = async () => {
            const response = await getUserChildAccounts(state.auth.bearer);
            if (Array.isArray(response)) {
                setTest(response);
            }
        };
        getData();
    }, []);


    const submitChildAccount = async (event) => {
        event.preventDefault();
        if ((!isEmailInvalid && !isRoleInvalid) && (selectedRole.length !== 0 && email !== null && email !== "")) {
            const response = await addUserChildAccount(state.auth.bearer, email, selectedRole);
            setTest(response);
            setEmail("");
            setSelectedRole([]);
        } else {
            setIsEmailInvalid(email === "" || email === null);
            setIsRoleInvalid(selectedRole.length === 0);
        }
    }

    const deleteChildUser = async (childUserId) => {
        const response = await deleteUserChildAccount(state.auth.bearer, childUserId);
        if (response.ok)
            setTest(test.filter(x => x.user_id !== childUserId));
    }

    const validateEmail = (input) => {
        setEmail(input.target.value);
        setIsEmailInvalid(input.target.value === "");
    }

    const validateRole = (input) => {
        setSelectedRole(input.target.value);
        setIsRoleInvalid(input.target.value === "");
    }

    return (
        <div>
            <form onSubmit={submitChildAccount}>
                <h2 className="panel-header-text">Account Users</h2>
                <Divider />
                <table className="table-container">
                    <tbody>
                        {test.map(x => (
                            <tr className="table-rows" key={`user-${x.user_name}`}>
                                <td>{x.user_name}</td>
                                <td>{x.roles.join(', ')}</td>
                                <td className="table-end-item">
                                    <RemoveButton aria-label={`user-${x.user_name}`} onClick={() => deleteChildUser(x.user_id)}></RemoveButton>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <TextField error={isEmailInvalid} onChange={(input) => validateEmail(input)} value={email} label="Email" />
                            </td>
                            <td className="account-roles">
                                <FormControl error={isRoleInvalid} variant="outlined">
                                    <InputLabel className="child-user-label">Roles</InputLabel>
                                    <Select className="child-user-input" labelId="mutiple-name-label" variant="outlined" multiple value={selectedRole} onChange={(input) => validateRole(input)} input={<OutlinedInput label="Roles" />}
                                        renderValue={(selectedRole) => (selectedRole.join(', '))}>
                                        {roles.map((role) => (
                                            <MenuItem key={role.role_name} value={role.role_name}>
                                                <Checkbox checked={selectedRole.indexOf(role.role_name) > -1} />
                                                <ListItemText primary={role.role_name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </td>
                            <td className="table-end-item">
                                <AddButton onClick={(event) => { submitChildAccount(event) }}></AddButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div >
    );
}