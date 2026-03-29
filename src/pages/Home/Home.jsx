import React, { useContext, useEffect } from 'react';
import Header from '../../components/header/Header';
import DashboardPanel from './panels/DashboardPanels';
import './Home.css';
import { Context } from '../../state/Store';


export default function Home() {
    const [, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Home Automation' });
    }, [dispatch]);

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