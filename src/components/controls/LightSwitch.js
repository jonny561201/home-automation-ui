import React, { useState } from 'react';
import { CustomSlider } from '../../components/controls/Slider';
import { FormControlLabel, Switch, ButtonBase } from '@material-ui/core';
import { setLightGroupState, setLightState } from '../../utilities/RestApi';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './LightSwitch.css';

export default function LightSwitch(props) {
    const [on, setOn] = useState(props.data.on);
    const [groupId,] = useState(props.data.groupId);
    const [groupName,] = useState(props.data.groupName);
    const [brightness,] = useState(props.data.brightness);
    const [lights, setLights] = useState(props.data.lights);
    const [areLightsOpen, setLightsOpen] = useState(false);

    const toggleLightGroup = async () => {
        setLightGroupState(groupId, !on, brightness);
        lights.forEach(x => { x.on = !x.on });
        setOn(!on);
    };

    const sliderToggleLightGroup = async () => {
        setLightGroupState(groupId, !on, brightness);
        lights.forEach(x => { x.on = !x.on });
        setOn(!on);
    };

    const getLightSwitches = () => {
        if (lights && lights.length > 0) {
            // return lights.map(x => <FormControlLabel data-testid={"light-switches"} key={`label-${x.lightId}`} className="light-switches" control={<Switch key={`switch-${x.lightId}`} checked={x.on} onChange={() => toggleCheckedLight(x)} />}
            //     label={x.lightName} />)
            return lights.map(x => (
                <div className="light-group" key={`light-group-${x.lightId}`}>
                    <p>{x.lightName}</p>
                    {/* <Switch key={`switch-${x.lightId}`} checked={x.on} onChange={() => toggleCheckedLight(x)} /> */}
                    <CustomSlider key={`switch-${x.lightId}`} onChange={() => toggleCheckedLight(x)} value={x.on ? 100 : 0} valueLabelDisplay="auto" aria-label="slider" />
                </div>
            ));
        }
        return <p className="panel-text">No lights assigned to group</p>
    };

    const toggleCheckedLight = async (light) => {
        const filteredLights = lights.filter(x => x.lightId !== light.lightId);
        const newLight = { lightId: light.lightId, lightName: light.lightName, on: !light.on, brightness: light.brightness };
        filteredLights.push(newLight);
        setLights(filteredLights);
        setLightState(light.lightId, !light.on, 255);
    };

    return (
        <div data-testid={"light-group"}>
            <div className="light-group">
                <ButtonBase onClick={() => setLightsOpen(!areLightsOpen)} style={{ "borderRadius": "50%" }}>
                    <div className={`light-chevron ${areLightsOpen ? "expanded" : ""}`}>
                        <ChevronRightIcon data-testid={"expansion-chevron"} />
                    </div>
                </ButtonBase>
                <p>{groupName}</p>
                <CustomSlider onChange={sliderToggleLightGroup} value={on ? 100 : 0} valueLabelDisplay="auto" aria-label="slider" />
                {/* <FormControlLabel data-testid={"form-control"}
                    control={<CustomSlider onChange={sliderToggleLightGroup} value={on ? 100 : 0} valueLabelDisplay="auto" aria-label="slider" />}
                    // control={<Switch checked={on} onChange={toggleLightGroup} color="primary" />}
                    label={groupName}
                /> */}
            </div>
            {areLightsOpen
                ? <div data-testid={"light-group-expansion"} className="light-group-expansion">{getLightSwitches()}</div>
                : null}
        </div>
    );
}