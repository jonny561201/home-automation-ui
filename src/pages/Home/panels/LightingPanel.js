import React, { useContext } from 'react';
import { Context } from '../../../state/Store';
import LightSwitch from '../../../components/controls/LightSwitch';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LightingIcon from '../../../resources/panelIcons/LightingIcon.png';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import './LightingPanel.css'


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
            <ExpansionPanel data-testid={"lighting-panel"} className="lighting-panel">
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="summary">
                        <div>
                            <img alt="lighting" className="logo-image" src={LightingIcon} />
                        </div>
                        <Typography className="panel-text panel-header-text">Lighting</Typography>
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