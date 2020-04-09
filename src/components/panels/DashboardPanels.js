import React from 'react';
import GaragePanel from './GaragePanel';
import BasementPanel from './BasementPanel';
import TemperaturePanel from './TemperaturePanel';
import LightingPanel from './LightingPanel';
import SecurityPanel from './SecurityPanel';
import { getStore } from '../../GlobalState';


export default function DashboardPanel() {
    const store = getStore();
    return (
        <div>
            {store.getUserRoles().includes("garage_door") ?
                <div className="panel">
                    <GaragePanel />
                </div>
                : null
            }
            <div className="panel">
                <BasementPanel />
            </div>
            <div className="panel">
                <TemperaturePanel />
            </div>
            <div className="panel">
                <LightingPanel />
            </div>
            {/* <div className="panel">
                <SecurityPanel />
            </div> */}
        </div>
    );
}