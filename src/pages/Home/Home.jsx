import React from 'react';
import Header from '../../components/header/Header';
import DashboardPanel from './panels/DashboardPanels';
import './Home.css';
import { getStore } from '../../state/GlobalState';


export default function Home() {
    getStore().setActivePage('Home Automation');

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