import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '../../../resources/panelIcons/SecurityIcon.png';
import { AccordionDetails, Accordion, Typography, AccordionSummary, Divider } from '@mui/material';
import Disconnected from '../../../components/controls/Disconnected';
import './SecurityPanel.scss'


export default function SecurityPanel() {
    return (
        <div>
            <Accordion className="security-panel">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img alt="security" className="logo-image" src={SecurityIcon} />
                        </div>
                        <Typography className="panel-text panel-header-text">Security</Typography>
                    </div>
                </AccordionSummary>
                <Divider />
                <AccordionDetails className="center">
                    <Disconnected message="Security unavailable" />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}