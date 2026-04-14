import React, { useContext, useEffect, useState } from 'react';
import { addUserChildAccount, deleteUserChildAccount, getUserChildAccounts } from '../../utilities/RestApi';
import { Context } from '../../state/Store';
import { Checkbox, Divider, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { AddButton, RemoveButton } from '../../components/controls/Buttons';
import './AccountChildUser.scss'
import { useAuth0 } from '@auth0/auth0-react';

export default function AccountChildUser() {
    const auth0 = useAuth0();
    const [state, _] = useContext(Context);
    const roles = state.user.roles || [];
    const [selectedRole, setSelectedRole] = useState([]);
    const [email, setEmail] = useState("");
    const [test, setTest] = useState([]);
    const [isEmailInvalid, setIsEmailInvalid] = useState(undefined);
    const [isRoleInvalid, setIsRoleInvalid] = useState(undefined);

    useEffect(() => {
        const getData = async () => {
            const token = await auth0.getAccessTokenSilently();
            const response = await getUserChildAccounts(token);
            if (Array.isArray(response)) {
                setTest(response);
            }
        };
        getData();
    }, []);


    const submitChildAccount = async (event) => {
        event.preventDefault();
        if ((!isEmailInvalid && !isRoleInvalid) && (selectedRole.length !== 0 && email !== null && email !== "")) {
            const token = await auth0.getAccessTokenSilently();
            const response = await addUserChildAccount(token, email, selectedRole);
            setTest(response);
            setEmail("");
            setSelectedRole([]);
        } else {
            setIsEmailInvalid(email === "" || email === null);
            setIsRoleInvalid(selectedRole.length === 0);
        }
    }

    const deleteChildUser = async (childUserId) => {
        const token = await auth0.getAccessTokenSilently();
        const response = await deleteUserChildAccount(token, childUserId);
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