import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import DeviceRegistration from '../segments/DeviceRegistration';
import GarageIcon from '../../../resources/panelIcons/GarageDoorIcon.png';
import { AccordionDetails, Accordion, Typography, AccordionSummary, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GarageDoor from '../segments/GarageDoor';
import './GaragePanel.css';


export default function GaragePanel() {
    const [open, setOpen] = useState(false);
    const [state] = useContext(Context);
    const devicesToRegister = (state.devices || []).filter(x => !x.registered && x.type === 'garage_door');

    const renderDoors = () => {
        const doors = state.garageDoors;
        if (doors && doors.length > 0) {
            return doors.map(x => <GarageDoor key={`door-${x.doorName}`} device={x} />);
        }
        return <p>No Garage devices have been registered</p>
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
                                {!open &&
                                    state.garageDoors.map(x => {
                                        return <div className="small-text-group" key={`door-notify-${x.doorName}`}>
                                            <p className="small-text text">{x.doorName}:</p>
                                            <p className={"small-text text " + (x.isOpen ? 'alert' : 'healthy')}>{x.isOpen ? 'Open' : 'Closed'}</p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                <Divider />
                {devicesToRegister.length > 0
                    ? <AccordionDetails>
                        <DeviceRegistration device={devicesToRegister[0]} />
                    </AccordionDetails>
                    : <AccordionDetails>
                        <div className="door-groups">{renderDoors()}</div>
                    </AccordionDetails>
                }
            </Accordion>
        </div>
    );
}
