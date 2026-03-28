import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '../../../resources/panelIcons/SecurityIcon.png';
import { AccordionDetails, Accordion, Typography, AccordionSummary, Divider } from '@mui/material';


export default function SecurityPanel() {
    return (
        <div>
            <Accordion data-testid={"security-panel"} className="security-panel">
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
                    <Typography className="text">Test Detail line 2</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}