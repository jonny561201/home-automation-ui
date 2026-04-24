import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import LightSwitch from '../../../components/controls/LightSwitch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { WbSunny, DarkMode } from '@mui/icons-material';
import LightingIcon from '../../../resources/panelIcons/LightingIcon.png';
import { AccordionDetails, Accordion, Typography, AccordionSummary, Divider } from '@mui/material';
import Disconnected from '../../../components/controls/Disconnected';
import LightScenes from '../segments/LightScenes';
import { isDayLight } from '../../../utilities/Services';
import './LightingPanel.scss'


export default function LightingPanel() {
    const [state,] = useContext(Context);
    const [open, setOpen] = useState(false);

    const renderGroups = () => {
        if (state.lights && state.lights.length) {
            return state.lights.map(group => <LightSwitch key={`switch-${group.groupId}`} data={group} />)
        }
        return <Disconnected message="Light groups unavailable" />
    };

    const getDaylightIcon = () => {
        const coords = state.garageCoords || state.userCoords;
        if (!coords) return null;
        if (isDayLight(coords)) return <WbSunny className="daylight-icon daylight-sun" />;
        return <DarkMode className="daylight-icon daylight-moon" />;
    };

    const getSummaryText = () => {
        if (!state.lights || !state.lights.length) return null;
        const onCount = state.lights.filter(x => x.on).length;
        if (onCount === 0) return 'All off';
        if (onCount === state.lights.length) return 'All on';
        return onCount + ' of ' + state.lights.length + ' on';
    };

    return (
        <div>
            <Accordion className="lighting-panel">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => setOpen(!open)}>
                    <div className="summary">
                        <img alt="lighting" className="logo-image" src={LightingIcon} />
                        <div>
                            <Typography className="panel-text panel-header-text">Lighting</Typography>
                            {!open && getSummaryText() &&
                                <div className="small-text-group">
                                    {getDaylightIcon()}
                                    <p className="small-text text">Rooms:</p>
                                    <p className={"small-text text " + (getSummaryText() === 'All off' ? '' : 'healthy')}>{getSummaryText()}</p>
                                </div>
                            }
                        </div>
                    </div>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className="center">
                    {state.lights && state.lights.length > 0 && <LightScenes />}
                    <p className="light-section-label text">Rooms</p>
                    <div className="light-panel-group">
                        {renderGroups()}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}