import React, { useContext, useEffect, useState } from 'react';
import { addUserChildAccount, deleteUserChildAccount, getUserChildAccounts } from '../../utilities/RestApi';
import { Context } from '../../state/Store';
import { Checkbox, Divider, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { AddButton, RemoveButton } from '../../components/controls/Buttons';
import { useAuth0 } from '@auth0/auth0-react';
import './AccountChildUser.scss'


export default function AccountChildUser() {
    const auth0 = useAuth0();
    const [state, _] = useContext(Context);
    const roles = state.user.roles || [];
    const [selectedRole, setSelectedRole] = useState([]);
    const [email, setEmail] = useState("");
    const [childAccounts, setChildAccounts] = useState([]);
    const [isEmailInvalid, setIsEmailInvalid] = useState(undefined);
    const [isRoleInvalid, setIsRoleInvalid] = useState(undefined);

    useEffect(() => {
        const getData = async () => {
            const token = await auth0.getAccessTokenSilently();
            const response = await getUserChildAccounts(token);
            if (Array.isArray(response)) {
                setChildAccounts(response);
            }
        };
        getData();
    }, []);


    const submitChildAccount = async () => {
        if ((!isEmailInvalid && !isRoleInvalid) && (selectedRole.length !== 0 && email !== null && email !== "")) {
            const token = await auth0.getAccessTokenSilently();
            const response = await addUserChildAccount(token, email, selectedRole);
            setChildAccounts(response);
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
            setChildAccounts(childAccounts.filter(x => x.user_id !== childUserId));
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
        <div className="child-user-container">
            <h2 className="panel-header-text">Managed Accounts</h2>
            <div>
                <p className="small-text text">Grant access to your devices</p>
                <Divider />
                {childAccounts.map(x => (
                    <div className="row align-items-center child-user-row" key={`user-${x.user_name}`}>
                        <div className="col-sm">{x.user_name}</div>
                        <div className="col-sm">{x.roles.join(', ')}</div>
                        <div className="col-sm-auto">
                            <RemoveButton aria-label={`user-${x.user_name}`} onClick={() => deleteChildUser(x.user_id)}></RemoveButton>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <p className="small-text text">Add a new user</p>
                <Divider />
                <div className="row align-items-center child-user-row">
                    <div className="col-sm user-input">
                        <TextField error={isEmailInvalid} onChange={(input) => validateEmail(input)} value={email} label="Email" fullWidth />
                    </div>
                    <div className="col-sm user-input">
                        <FormControl error={isRoleInvalid} variant="outlined" fullWidth>
                            <InputLabel>Roles</InputLabel>
                            <Select labelId="mutiple-name-label" variant="outlined" multiple value={selectedRole} onChange={(input) => validateRole(input)} input={<OutlinedInput label="Roles" />}
                                    renderValue={(selectedRole) => (selectedRole.join(', '))}>
                                {roles.map((role) => (
                                    <MenuItem key={role.role_name} value={role.role_name}>
                                        <Checkbox checked={selectedRole.indexOf(role.role_name) > -1} />
                                        <ListItemText primary={role.role_name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-sm-auto user-input">
                        <AddButton onClick={() => { submitChildAccount() }}></AddButton>
                    </div>
                </div>
            </div>
        </div>
    );
}