import React from 'react';
import GaragePanel from './GaragePanel';
import BasementPanel from './BasementPanel';
import TemperaturePanel from './TemperaturePanel';

export default function DashboardPanel() {
    return (
        <div>
            <div className="panel">
                <GaragePanel />
            </div>
            <div className="panel">
                <BasementPanel />
            </div>
            <div className="panel">
                <TemperaturePanel />
            </div>
        </div>
    );
}