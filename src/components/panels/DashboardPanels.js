import React from 'react';
import GaragePanel from './GaragePanel';
import BasementPanel from './BasementPanel';
import TemperaturePanel from './TemperaturePanel';
import LightingPanel from './LightingPanel';
import SecurityPanel from './SecurityPanel';
import { getStore } from '../../GlobalState';


export default function DashboardPanel() {
    const roles = getStore().getUserRoles();
    return (
        <div>
            {roles.includes("garage_door") ?
                <div className="panel">
                    <GaragePanel />
                </div>
                : null
            }
            {roles.includes("sump_pump") ?
                <div className="panel">
                    <BasementPanel />
                </div>
                : null
            }
            {roles.includes("thermostat") ?
                <div className="panel">
                    <TemperaturePanel />
                </div>
                : null
            }
            <div className="panel">
                <LightingPanel />
            </div>
            {/* <div className="panel">
                <SecurityPanel />
            </div> */}
        </div>
    );
}