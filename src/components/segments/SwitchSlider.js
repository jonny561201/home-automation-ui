import React, { useState } from 'react';
import { debounchApi } from '../../utilities/Services';
import { setLightState } from '../../utilities/RestApi';
import { CustomSlider } from '../controls/Slider';


export default function SwitchSlider(props) {
    const [on, ] = useState(props.data.on);
    const [lightId, ] = useState(props.data.lightId);
    const [lightName, ] = useState(props.data.lightName);
    const [brightness, setBrightness] = useState(Math.round(props.data.brightness / 2.55));

    const toggleCheckedLight = (event, value) => {
        setBrightness(value);
        debounchApi(() => setLightState(lightId, true, value * 2.55));
    }

    return (
        <div className="light-group">
            <p className="light-text">{lightName}</p>
            <CustomSlider data-testid={"light-switch"} onChange={(event, val) => toggleCheckedLight(event, val)} value={brightness} valueLabelDisplay="auto" aria-label="slider" />
        </div>
    )
}