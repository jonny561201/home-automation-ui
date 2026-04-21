import React, { useContext, useEffect } from 'react';
import Header from '../../components/header/Header';
import DashboardPanel from './panels/DashboardPanels';
import CityPrompt from './segments/CityPrompt';
import { Context } from '../../state/Store';
import './Home.scss';


export default function Home() {
    const [_, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Home' });
    }, [dispatch]);

    return (
        <div>
            <Header />
            <CityPrompt />
            <main className="home-body body">
                <div className="center">
                    <DashboardPanel />
                </div>
            </main>
        </div>
    );
}