import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { setLightGroupState, setLightState } from '../../utilities/RestApi';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ButtonBase from '@material-ui/core/ButtonBase';
import './LightSwitch.css';

export default class LightSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areLightsOpen: false,
            on: this.props.data.on,
            groupId: this.props.data.groupId,
            groupName: this.props.data.groupName,
            brightness: this.props.data.brightness,
            lights: this.props.data.lights,
        }
    }

    toggleChecked = async () => {
        await this.setState({ on: !this.state.on });
        await setLightGroupState(this.state.groupId, this.state.on, this.state.brightness);
    };

    toggleOpen = () => {
        this.setState({ areLightsOpen: !this.state.areLightsOpen });
    };

    getLightSwitches = () => {
        return this.state.lights.map(x => <FormControlLabel className="light-switches" control={<Switch checked={x.on} onChange={() => this.toggleCheckedLight(x)} />}
            label={x.lightName} />)
    };

    // TODO: extract light as separate component
    toggleCheckedLight = async (light) => {
        // this.setState({ lights: ...this.state.lights,{ lightId: light.lightId, lightName: light.lightName, on: !light.on, brightness: light.brightness });
        light = { ...light.on = !light.on };
        await setLightState(light.lightId, light.on, light.brightness);
    };

    render() {
        return (
            <div>
                <div className="light-group">
                    <ButtonBase onClick={() => this.toggleOpen()} style={{ "border-radius": "50%" }}>
                        <div className={`light-chevron ${this.state.areLightsOpen ? "expanded" : ""}`}>
                            <ChevronRightIcon />
                        </div>
                    </ButtonBase>
                    <FormControlLabel
                        control={<Switch checked={this.state.on} onChange={this.toggleChecked} color="primary" />}
                        label={this.state.groupName}
                    />
                </div>
                {this.state.areLightsOpen ?
                    <div className="light-group-expansion">{this.getLightSwitches()}</div>
                    :
                    null}
            </div>
        );
    }
}