import React, { useState } from 'react';
import { CustomSlider } from '../../components/controls/Slider';
import { ButtonBase } from '@material-ui/core';
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

    const sliderToggleLightGroup = async () => {
        const lightGroupState = !on;
        setLightGroupState(groupId, lightGroupState, brightness);
        lights.forEach(x => { x.on = lightGroupState });
        setOn(lightGroupState);
    };

    const getLightSwitches = () => {
        if (lights && lights.length > 0) {
            return lights.map(x => (
                <div className="light-group" key={`light-group-${x.lightId}`}>
                    <p className="light-text">{x.lightName}</p>
                    <CustomSlider key={`switch-${x.lightId}`} data-testid={"light-switches"} onChange={() => toggleCheckedLight(x)} value={x.on ? 100 : 0} valueLabelDisplay="auto" aria-label="slider" />
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
                <p className="light-text">{groupName}</p>
                <CustomSlider data-testid={"form-control"} onChange={sliderToggleLightGroup} value={on ? 100 : 0} valueLabelDisplay="auto" aria-label="slider" />
            </div>
            {areLightsOpen
                ? <div data-testid={"light-group-expansion"} className="light-group-expansion">{getLightSwitches()}</div>
                : null}
        </div>
    );
}