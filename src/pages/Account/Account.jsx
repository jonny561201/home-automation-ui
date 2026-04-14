import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../state/Store';
import Header from '../../components/header/Header';
import { Divider } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import { changeUserPassword } from '../../utilities/RestApi';
import AccountChildUser from '../../pages/Account/AccountChildUser';
import { GreenButton } from '../../components/controls/Buttons';
import { useAuth0 } from '@auth0/auth0-react';
import './Account.scss';


export default function Account() {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const [succeeded, setSucceeded] = useState(null);

    useEffect(() => {
        dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Account' });
    }, [dispatch]);


    const passwordMessage = () => {
        if (succeeded) {
            return <div className="account-message">
                <CheckCircle className="success-text" />
                <p className="success-text">Password reset email sent</p>
            </div>
        } else if (succeeded === false) {
            return <div className="account-message">
                <Error className="failure-text" />
                <p className="failure-text">Password Reset Failed</p>
            </div>
        } else {
            return <div><p></p></div>
        }
    }

    const changePassword = async (_) => {
        const token = await auth0.getAccessTokenSilently();
        const response = await changeUserPassword(token)
        setSucceeded(response.ok)
    }


    return (
        <div>
            <div className="account-header">
                <Header />
            </div>
            <div className="account-body body">
                <div className="account-wrapper account-text text">
                    <div className="account-group account-text panel-header-text">
                        <h2>User</h2>
                        <Divider />
                        <div className="account-row text">
                            <p className="account measure-unit">Given Name:</p>
                            <p className="account measure-unit">{state.user.firstName}</p>
                        </div>
                        <div className="account-row text">
                            <p className="account measure-unit">Family Name:</p>
                            <p className="account measure-unit">{state.user.lastName}</p>
                        </div>
                        <div className="account-row text">
                            <p className="account measure-unit">Email:</p>
                            <p className="account measure-unit">{state.user.email}</p>
                        </div>
                        <GreenButton onClick={changePassword}>Change Password</GreenButton>
                        { passwordMessage() }
                    </div>
                    <AccountChildUser />
                </div>
            </div>
        </div>
    );
}