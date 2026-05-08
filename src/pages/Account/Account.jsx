import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../state/Store';
import { SET_ACTIVE_PAGE } from '../../state/actions';
import Header from '../../components/header/Header';
import { Divider } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import { changeUserPassword } from '../../utilities/RestApi';
import AccountChildUser from '../../pages/Account/AccountChildUser';
import AccountNotifications from '../../pages/Account/AccountNotifications';
import { GreenButton } from '../../components/controls/Buttons';
import './Account.scss';


export default function Account() {
    const [state, dispatch] = useContext(Context);
    const [succeeded, setSucceeded] = useState(null);

    useEffect(() => {
        dispatch({ type: SET_ACTIVE_PAGE, payload: 'Account' });
    }, [dispatch]);

    useEffect(() => {
        if (succeeded === null) return;
        const timer = setTimeout(() => setSucceeded(null), 5000);
        return () => clearTimeout(timer);
    }, [succeeded]);

    const passwordMessage = () => {
        if (succeeded) {
            return <div className="account-message">
                <CheckCircle className="success-text" />
                <p className="success-text">Sent</p>
            </div>
        } else if (succeeded === false) {
            return <div className="account-message">
                <Error className="failure-text" />
                <p className="failure-text">Failed</p>
            </div>
        }
        return null;
    }

    const changePassword = async () => {
        const response = await changeUserPassword();
        setSucceeded(response.ok);
    }


    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="account-body body">
                <div className="account-wrapper account-text text">
                    <div className="account-group account-text panel-header-text">
                        <h2>User</h2>
                        <Divider />
                        <div className="account-row text">
                            <p className="account">Given Name:</p>
                            <p className="account">{state.user.firstName}</p>
                        </div>
                        <div className="account-row text">
                            <p className="account">Family Name:</p>
                            <p className="account">{state.user.lastName}</p>
                        </div>
                        <div className="account-row text">
                            <p className="account">Email:</p>
                            <p className="account">{state.user.email}</p>
                        </div>
                        <div className="account-row">
                            <GreenButton onClick={changePassword}>Send Password Reset Email</GreenButton>
                            { passwordMessage() }
                        </div>
                    </div>
                    <AccountNotifications />
                    <AccountChildUser />
                </div>
            </div>
        </div>
    );
}