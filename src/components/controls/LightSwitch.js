import React, { useEffect, useState } from 'react';
import { debounchApi } from '../../utilities/Services';
import { CustomSlider } from '../../components/controls/Slider';
import { ButtonBase } from '@material-ui/core';
import SwitchSlider from '../segments/SwitchSlider';
import { setLightGroupState, setLightState } from '../../utilities/RestApi';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './LightSwitch.css';

export default function LightSwitch(props) {
    // const [on, setOn] = useState(props.data.on);
    const [groupId,] = useState(props.data.groupId);
    const [groupName,] = useState(props.data.groupName);
    const [brightness, setBrightness] = useState(Math.round(props.data.brightness / 2.55));
    const [lights, setLights] = useState(props.data.lights);
    const [areLightsOpen, setLightsOpen] = useState(false);

    const sliderToggleLightGroup = async (event, value) => {
        const newBrightness = Math.round(value * 2.55);
        //probably wont need on anymore
        // const lightGroupState = !on;
        debounchApi(() => setLightGroupState(groupId, true, newBrightness));
        lights.forEach(x => { x.brightness = newBrightness });
        // const test = lights.map(x => {return {...x, brightness: newBrightness}});
        // console.log(test)
        // setLights(test);
        // setOn(lightGroupState);
        setBrightness(value)
    };

    const getLightSwitches = () => {
        if (lights && lights.length > 0) {
            return lights.map(x => (
                <SwitchSlider data={x} parent={brightness}/>
                // <div className="light-group" key={`light-group-${x.lightId}`}>
                //     <p className="light-text">{x.lightName}</p>
                //     <CustomSlider key={`switch-${x.lightId}`} data-testid={"light-switches"} onChange={(ev, val) => {toggleCheckedLight(x, val)}} value={Math.round(x.brightness / 2.55)} valueLabelDisplay="auto" aria-label="slider" />
                // </div>
            ));
        }
        return <p className="panel-text">No lights assigned to group</p>
    };

    const toggleCheckedLight = async (light, value) => {
        const filteredLights = lights.filter(x => x.lightId !== light.lightId);
        const newLight = { lightId: light.lightId, lightName: light.lightName, on: !light.on, brightness: light.brightness };
        filteredLights.push(newLight);
        setLights(filteredLights);
        debounchApi(() => setLightState(light.lightId, true, Math.round(value * 2.55)));
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
                <CustomSlider data-testid={"form-control"} onChange={sliderToggleLightGroup} value={brightness} valueLabelDisplay="auto" aria-label="slider" />
            </div>
            {areLightsOpen
                ? <div data-testid={"light-group-expansion"} className="light-group-expansion">{getLightSwitches()}</div>
                : null}
        </div>
    );
}