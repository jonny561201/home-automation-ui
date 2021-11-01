import React, { useState, useContext, useEffect } from 'react';
import { getStore } from '../../state/GlobalState';
import { addUserChildAccount, getUserChildAccounts, deleteUserChildAccount } from '../../utilities/RestApi';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Context } from '../../state/Store';
import { Divider, MenuItem, Select, InputLabel, Input, FormControl, Checkbox, TextField, ListItemText } from '@material-ui/core';
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
            const response = await getUserChildAccounts(state.user.userId, state.auth.bearer);
            setTest(response);
        };
        getData();
    }, []);


    const submitChildAccount = async (event) => {
        event.preventDefault();
        if ((!isEmailInvalid && !isRoleInvalid) && (selectedRole.length !== 0 && email !== null && email !== "")) {
            const response = await addUserChildAccount(state.user.userId, state.auth.bearer, email, selectedRole);
            setTest(response);
            setEmail("");
            setSelectedRole([]);
        } else {
            setIsEmailInvalid(email === "" || email === null);
            setIsRoleInvalid(selectedRole.length === 0);
        }
    }

    const deleteChildUser = async (childUserId) => {
        const response = await deleteUserChildAccount(state.user.userId, state.auth.bearer, childUserId);
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
                                    <div className="user-button-border">
                                        <div className="table-delete-user cancel-ripple">
                                            <RemoveIcon data-testid={`user-${x.user_name}`} className="table-delete-user-minus" onClick={() => deleteChildUser(x.user_id)} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <TextField inputProps={{ "data-testid": "email-account-user" }} error={isEmailInvalid} onChange={(input) => validateEmail(input)} value={email} label="Email" />
                            </td>
                            <td className="account-roles">
                                <FormControl error={isRoleInvalid}>
                                    <InputLabel className="child-user-label" id="demo-mutiple-name-label">Roles</InputLabel>
                                    <Select className="child-user-input" data-testid="roles-account-user" multiple value={selectedRole} onChange={(input) => validateRole(input)} input={<Input />}
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
                                <div className="user-button-border" onClick={(event) => { submitChildAccount(event) }}>
                                    <div className="table-add-user success-ripple">
                                        <AddIcon type="submit" data-testid="add-user-button" className="table-add-user-plus" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div >
    );
}