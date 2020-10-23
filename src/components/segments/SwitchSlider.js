import React, { useEffect, useState } from 'react';
import { debounchApi } from '../../utilities/Services';
import { setLightState } from '../../utilities/RestApi';
import { CustomSlider } from '../controls/Slider';


export default function SwitchSlider(props) {
    const [light, ] = useState(props.data);
    const [on, setOn] = useState(props.data.on);
    const [lightId, setLightId] = useState(props.data.lightId);
    const [lightName, setLightName] = useState(props.data.lightName);
    const [brightness, setBrightness] = useState(Math.round(props.data.brightness / 2.55));

    useEffect(() => {
        console.log(`Parent Brightness: ${props.parent}`)
        console.log(`Child Brightness: ${brightness }`)
        // setOn(props.data.on);
        // setLightId(lightId);
        // setLightName(lightName);
        // setBrightness(Math.round(props.data.brightness / 2.55));
    }, [brightness]);

    const toggleCheckedLight = (event, value) => {
        setBrightness(value);
        // console.log(`Value: ${value}`)
        // debounchApi(() => setLightState(lightId, true, value * 2.55));
    }

    return (
        <div className="light-group" key={`light-group-${lightId}`}>
            <p className="light-text">{lightName}</p>
            <CustomSlider key={`switch-${lightId}`} data-testid={"light-switch"} onChange={(event, val) => toggleCheckedLight(event, val)} value={brightness} valueLabelDisplay="auto" aria-label="slider" />
        </div>
    )
}