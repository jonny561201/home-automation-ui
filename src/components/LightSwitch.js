import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { setLightGroupState } from '../utilities/RestApi';

export default class LightSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            on: this.props.data.on,
            groupId: this.props.data.groupId,
            groupName: this.props.data.groupName,
            brightness: this.props.data.brightness
        }
    }

    toggleChecked = async () => {
        await this.setState({ on: !this.state.on });
        this.test();
    };

    test = () => {
        setLightGroupState(this.state.groupId, this.state.on, this.state.brightness);
    }

    render() {
        return (
            <div>
                <FormControlLabel
                    control={<Switch checked={this.state.on} onChange={this.toggleChecked} color="primary"/>}
                    label={this.state.groupName}
                />
            </div>
        );
    }
}