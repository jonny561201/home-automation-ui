import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LightingIcon from '../../resources/panelIcons/LightingIcon.jpg';
import { getLightGroups } from '../../utilities/RestApi';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';


export default class LightingPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount = async () => {
        await getLightGroups();
    };


    render() {
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
                        <Typography>Test Detail line 2</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}