import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../../state/Store';
import { debounchApi } from '../../../utilities/Services';
import { setLightState } from '../../../utilities/RestApi';
import { CustomSlider } from '../../../components/controls/Slider';


export default function SwitchSlider(props) {
    const [state, dispatch] = useContext(Context);
    const [light, setLight] = useState(props.data);
    const [lightId,] = useState(props.data.lightId);
    const [groupId,] = useState(props.data.groupId);

    useEffect(() => {
        const group = state.lights.find(x => x.groupId === props.data.groupId)
        if (group.lights)
            setLight(group.lights.find(y => y.lightId === lightId));
    });

    const updateSlider = (event, value) => {
        const newLight = { ...light, brightness: value * 2.55 };
        setLight(newLight);
        debounchApi(() => setLightState(state.auth.bearer, lightId, true, value * 2.55));
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, lights: x.lights.map(y => (y.lightId === lightId) ? newLight : y) } : x);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
    }

    return (
        <div className="light-group">
            <p className="light-text-small text">{light.lightName}</p>
            <CustomSlider onChange={(event, val) => updateSlider(event, val)} value={Math.round(light.brightness / 2.55)} valueLabelDisplay="auto" aria-label="slider" />
            <div style={{ height: '18px', width: '18px' }} />
        </div>
    )
}