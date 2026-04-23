import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import LightSwitch from '../../../components/controls/LightSwitch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightingIcon from '../../../resources/panelIcons/LightingIcon.png';
import { AccordionDetails, Accordion, Typography, AccordionSummary, Divider } from '@mui/material';
import Disconnected from '../../../components/controls/Disconnected';
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
                                    <p className="small-text text">Rooms:</p>
                                    <p className={"small-text text " + (getSummaryText() === 'All off' ? '' : 'healthy')}>{getSummaryText()}</p>
                                </div>
                            }
                        </div>
                    </div>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className="center">
                    <div className="light-panel-group">
                        {renderGroups()}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}