import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import DeviceRegistration from '../segments/DeviceRegistration';
import GarageIcon from '../../../resources/panelIcons/GarageDoorIcon.png';
import { AccordionDetails, Accordion, Typography, AccordionSummary, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { WarningAmber } from '@mui/icons-material';
import GarageDoor from '../segments/GarageDoor';
import Disconnected from '../../../components/controls/Disconnected';
import './GaragePanel.scss';


export default function GaragePanel() {
    const [open, setOpen] = useState(false);
    const [state] = useContext(Context);
    const devicesToRegister = (state.devices || []).filter(x => !x.registered && x.type === 'garage_door');

    const isDoorExceeded = (door) => {
        const alertMinutes = state.preferences ? state.preferences.garageAlertTime : 0;
        const diffMs = door.isOpen && door.duration ? new Date() - new Date(door.duration) : 0;
        return door.isOpen && alertMinutes > 0 && (diffMs / 60000) >= alertMinutes;
    }

    const renderDoorStatus = () => {
        return state.garageDoors.map(x => {
            return <div className="small-text-group" key={`door-notify-${x.doorName}`}>
                <p className="small-text text">{x.doorName}:</p>
                <p className={"small-text text " + (x.isOpen ? 'alert' : 'healthy')}>
                    {x.isOpen ? 'Open' : 'Closed'}
                </p>
                {isDoorExceeded(x) && <WarningAmber className="garage-header-alert-icon" />}
            </div>
        });
    }

    const renderDoors = () => {
        const doors = state.garageDoors;
        if (doors && doors.length > 0) {
            return doors.map(x => <GarageDoor key={`door-${x.doorName}`} device={x} />);
        }
        return <Disconnected message="Garage doors unavailable" />
    }

    return (
        <div>
            <Accordion className="garage-panel">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => { setOpen(!open) }}>
                    <div className="summary">
                        <img alt="garage" className="logo-image" src={GarageIcon} />
                        <div>
                            <Typography className="panel-text panel-header-text">Garage</Typography>
                            <div className="small-text-container">
                                {!open && devicesToRegister.length > 0 &&
                                    <div className="small-text-group">
                                        <p className="small-text text alert">Registration Needed</p>
                                    </div>
                                }
                                {!open && devicesToRegister.length === 0 && renderDoorStatus()}
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails>
                    {devicesToRegister.length > 0
                        ? <DeviceRegistration device={devicesToRegister[0]}/>
                        : <div className="door-groups">{renderDoors()}</div>
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
