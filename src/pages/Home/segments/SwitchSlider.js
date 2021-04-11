import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../../state/Store';
import { debounchApi } from '../../../utilities/Services';
import { setLightState } from '../../../utilities/RestApi';
import { CustomSlider } from '../../../components/controls/Slider';


export default function SwitchSlider(props) {
    const [state, dispatch] = useContext(Context);
    const [lightId,] = useState(props.lightId);
    const [light, setLight] = useState(props.data);

    useEffect(() => {
        setLight(state.userLights.find(x => x.lightId === props.lightId));
    });

    const toggleCheckedLight = (event, value) => {
        const newLight = { ...light, brightness: value * 2.55 };
        setLight(newLight);
        debounchApi(() => setLightState(lightId, true, value * 2.55));
        dispatch({ type: 'SET_USER_LIGHT', payload: newLight });
    }

    return (
        <div className="light-group">
            <p className="light-text-small text">{light.lightName}</p>
            <CustomSlider data-testid={"light-switch"} onChange={(event, val) => toggleCheckedLight(event, val)} value={Math.round(light.brightness / 2.55)} valueLabelDisplay="auto" aria-label="slider" />
            <div style={{ height: '16px', width: '16px' }} />
        </div>
    )
}