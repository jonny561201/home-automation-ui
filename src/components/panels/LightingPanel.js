import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LightingIcon from '../../resources/panelIcons/LightingIcon.jpg';
import { getLightGroups } from '../../utilities/RestApi';
import { ExpansionPanelDetails, ExpansionPanel, Typography, ExpansionPanelSummary, Divider } from '@material-ui/core';
import LightSwitch from '../LightSwitch';


export default class LightingPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: null,
        };
    }
    componentDidMount = async () => {
        this.setState({ groups: await getLightGroups() });
    };

    renderGroups = () => {
        if (this.state.groups) {
            return this.state.groups.map(group => <LightSwitch data={group} />)
        }
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
                        <div>
                            {this.renderGroups()}
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}