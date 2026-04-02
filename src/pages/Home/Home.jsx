import React, { useContext, useEffect } from 'react';
import Header from '../../components/header/Header';
import DashboardPanel from './panels/DashboardPanels';
import './Home.css';
import { Context } from '../../state/Store';
import {useAuth0} from "@auth0/auth0-react";


export default function Home() {
    const auth0 = useAuth0();
    const [_, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Home Automation' });
    }, [dispatch]);

    useEffect(() => {
        setClaims();
    }, []);

    const setClaims = async () => {
        const claims = await auth0.getIdTokenClaims();
        const userId = claims['https://soaringleafsolutions.com/user_id'];
        const roles = claims['https://soaringleafsolutions.com/roles'];
        const firstName = claims.given_name ?? claims.nickname;
        const lastName = claims.last_name ?? "";
        await dispatch({ type: 'SET_USER_DATA', payload: { userId: userId, firstName: firstName, lastName: lastName, roles: roles } });
    };

    return (
        <div className="home-main" >
            <Header />
            <main className="home-body body">
                <div className="center">
                    <DashboardPanel />
                </div>
            </main>
        </div>
    );
}