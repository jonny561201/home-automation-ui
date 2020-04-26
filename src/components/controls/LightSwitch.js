import React, { useState } from 'react';
import { FormControlLabel, Switch, ButtonBase } from '@material-ui/core';
import { setLightGroupState, setLightState } from '../../utilities/RestApi';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './LightSwitch.css';

export default function LightSwitch (props) {
    const [on, setOn] = useState(props.data.on);
    const [lights, ] = useState(props.data.lights);
    const [groupId, ] = useState(props.data.groupId);
    const [groupName, ] = useState(props.data.groupName);
    const [brightness, ] = useState(props.data.brightness);
    const [areLightsOpen, setLightsOpen] = useState(false);

    const toggleChecked = async () => {
        await setLightGroupState(groupId, !on, brightness);
        setOn(!on);
    };

    const getLightSwitches = () => {
        return lights.map(x => <FormControlLabel className="light-switches" control={<Switch checked={x.on} onChange={() => toggleCheckedLight(x)} />}
            label={x.lightName} />)
    };

    const toggleCheckedLight = async (light) => {
        // this.setState({ lights: ...this.state.lights,{ lightId: light.lightId, lightName: light.lightName, on: !light.on, brightness: light.brightness });
        light = { ...light.on = !light.on };
        await setLightState(light.lightId, light.on, light.brightness);
    };

    return (
        <div>
            <div className="light-group">
                <ButtonBase onClick={() => setLightsOpen(!areLightsOpen)} style={{ "borderRadius": "50%" }}>
                    <div className={`light-chevron ${areLightsOpen ? "expanded" : ""}`}>
                        <ChevronRightIcon />
                    </div>
                </ButtonBase>
                <FormControlLabel
                    control={<Switch className="test-something" checked={on} onChange={toggleChecked} color="primary" />}
                    label={groupName}
                />
            </div>
            {areLightsOpen ?
                <div className="light-group-expansion">{getLightSwitches()}</div>
                :
                null}
        </div>
    );
}