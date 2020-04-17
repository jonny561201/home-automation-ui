import React from 'react';
import GaragePanel from './GaragePanel';
import BasementPanel from './BasementPanel';
import TemperaturePanel from './TemperaturePanel';
import LightingPanel from './LightingPanel';
import SecurityPanel from './SecurityPanel';
import { getStore } from '../../GlobalState';


export default function DashboardPanel() {

    const roles = getStore().getUserRoles();
    const roleNames = roles.map(x => x.role_name);
    
    return (
        <div>
            {roleNames.includes("garage_door") ?
                <div className="panel">
                    <GaragePanel />
                </div>
                : null
            }
            {roleNames.includes("sump_pump") ?
                <div className="panel">
                    <BasementPanel />
                </div>
                : null
            }
            {roleNames.includes("thermostat") ?
                <div className="panel">
                    <TemperaturePanel />
                </div>
                : null
            }
            {roleNames.includes("lighting") ?
                <div className="panel">
                    <LightingPanel />
                </div>
                : null
            }
            {roleNames.includes("security") ?
                <div className="panel">
                    <SecurityPanel />
                </div>
                : null
            }
        </div>
    );
}