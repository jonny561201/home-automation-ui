import React, { useContext } from 'react';
import { Context } from '../../../state/Store';
import LightSwitch from '../../../components/controls/LightSwitch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightingIcon from '../../../resources/panelIcons/LightingIcon.png';
import { AccordionDetails, Accordion, Typography, AccordionSummary, Divider } from '@mui/material';
import './LightingPanel.scss'


export default function LightingPanel() {
    const [state,] = useContext(Context);

    const renderGroups = () => {
        if (state.lights && state.lights.length) {
            return state.lights.map(group => <LightSwitch key={`switch-${group.groupId}`} data={group} />)
        }
        return <p className="text">No Light Groups were found</p>
    };

    return (
        <div>
            <Accordion className="lighting-panel">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img alt="lighting" className="logo-image" src={LightingIcon} />
                        </div>
                        <Typography className="panel-text panel-header-text">Lighting</Typography>
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