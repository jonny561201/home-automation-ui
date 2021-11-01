import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../state/Store';
import { getStore } from '../../state/GlobalState';
import useSound from 'use-sound';
import clickSound from '../../resources/click.mp3';
import Header from '../../components/header/Header';
import { Divider, TextField } from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';
import { updateUserAccount } from '../../utilities/RestApi';
import AccountChildUser from '../../pages/Account/AccountChildUser';
import './Account.css';


export default function Account() {
    getStore().setActivePage('Account');
    const [click] = useSound(clickSound, { volume: 0.25 });
    const [state,] = useContext(Context);
    const [arePasswordsMismatched, setPasswordsMismatched] = useState(null);
    const [changed, setChanged] = useState(false);
    const [oldPasswordError, setPasswordError] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [firstNewPassword, setFirstPassword] = useState("");
    const [secondNewPassword, setSecondPassword] = useState("");
    const [succeeded, setSucceeded] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (firstNewPassword !== "" && secondNewPassword !== "") {
            setPasswordsMismatched(secondNewPassword !== firstNewPassword);
        }

        if (changed && oldPassword === "") {
            setPasswordError(true);
        } else if (changed && oldPassword !== "") {
            setPasswordError(false)
        } else if (submitted && oldPassword === "") {
            setPasswordError(true);
        }
    }, [firstNewPassword, secondNewPassword, changed, oldPassword, submitted]);

    const onOldPasswordChange = async (input) => {
        setOldPassword(input.target.value);
        setChanged(true);
    }

    const submitAccountChange = async (event) => {
        event.preventDefault();
        click();
        setSubmitted(true);
        if (!oldPasswordError && !arePasswordsMismatched && changed) {
            const response = await updateUserAccount(state.user.userId, state.auth.bearer, oldPassword, secondNewPassword);
            setSucceeded(response.ok);
        }
    }

    const passwordMessage = () => {
        if (succeeded) {
            return <div className="account-message">
                <CheckCircle className="success-text" />
                <p className="success-text">Updated Successfully!</p>
            </div>
        } else if (succeeded === false) {
            return <div className="account-message">
                <Error className="failure-text" />
                <p className="failure-text">Password Update Failed</p>
            </div>
        } else {
            return <div><p></p></div>
        }
    }


    return (
        <div>
            <div className="account-header">
                <Header />
            </div>
            <div className="account-body body">
                <div className="account-wrapper account-text text">
                    <form className="account-group account-text panel-header-text" onSubmit={submitAccountChange}>
                        <h2>Change Password</h2>
                        <Divider />
                        <div className="account-row">
                            <TextField data-testid={"old-pass"} error={oldPasswordError} value={oldPassword} variant="outlined" label="Old Password" type="password" onChange={onOldPasswordChange} />
                        </div>
                        <div className="account-row">
                            <TextField data-testid={"new-pass"} error={arePasswordsMismatched} value={firstNewPassword} variant="outlined" label="New Password" type="password" onChange={(input) => setFirstPassword(input.target.value)} />
                        </div>
                        <div className="account-row">
                            <TextField data-testid={"confirm-pass"} error={arePasswordsMismatched} value={secondNewPassword} variant="outlined" label="Confirm New Password" type="password" onChange={(input) => setSecondPassword(input.target.value)} />
                        </div>
                        {passwordMessage()}
                        <button data-testid="password-submit" className="success-ripple" type="submit">Submit</button>
                    </form>
                    <AccountChildUser />
                </div>
            </div>
        </div>
    );
}