import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LightingIcon from '../../resources/panelIcons/LightingIcon.jpg';
import { getLightGroups } from '../../utilities/RestApi';
import './LightingPanel.css'
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import LightSwitch from '../controls/LightSwitch';


export default function LightingPanel() {
    const [groups, setGroups] = useState(null);
    
    useEffect(() => {
        const getData = async () => {
            const groups = await getLightGroups();
            setGroups(groups);
        };
        getData();
    }, []);

    const renderGroups = () => {
        console.log('Groups:', groups)
        if (groups) {
            return groups.map(group => <LightSwitch data={group} />)
        }
    };

    return (
        <div>
            <ExpansionPanel className="lighting-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img alt="lighting" className="logo-image" src={LightingIcon} />
                        </div>
                        <Typography className="panel-text">Lighting</Typography>
                    </div>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className="center">
                    <div>
                        {renderGroups()}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}