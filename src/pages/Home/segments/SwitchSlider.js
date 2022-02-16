import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../../state/Store';
import { ButtonBase } from '@material-ui/core';
import { debounchApi } from '../../../utilities/Services';
import { setLightState } from '../../../utilities/RestApi';
import { CustomSlider } from '../../../components/controls/Slider';


export default function SwitchSlider(props) {
    const [state, dispatch] = useContext(Context);
    const [light, setLight] = useState(props.data);
    const [lightId,] = useState(props.data.lightId);
    const [groupId,] = useState(props.data.groupId);
    const [prevBrightness, setPrevBrightness] = useState(0);

    useEffect(() => {
        const group = state.lights.find(x => x.groupId === props.data.groupId)
        if (group.lights)
            setLight(group.lights.find(y => y.lightId === lightId));
    });

    const updateSlider = (event, value) => {
        const newLight = { ...light, brightness: value * 2.55, on: value > 0 };
        setLight(newLight);
        debounchApi(() => setLightState(state.auth.bearer, lightId, true, value * 2.55));
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, lights: x.lights.map(y => (y.lightId === lightId) ? newLight : y) } : x);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
    }

    const toggleLight = async () => {
        const newState = !light.on;
        const newBrightness = !newState ? 0 : prevBrightness;
        await setLightState(state.auth.bearer, lightId, newState, newBrightness)
        setPrevBrightness(light.brightness);

        const newLight = { ...light, brightness: newBrightness, on: newState };
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, lights: x.lights.map(y => (y.lightId === lightId) ? newLight : y) } : x);
        setLight(newLight);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
    }

    return (
        <div className="light-group">
            <div className="light-spacer-one"/>
            <ButtonBase className="light-button" onClick={toggleLight}>
                <p className="light-text-small text">{light.lightName}</p>
            </ButtonBase>
            <CustomSlider onChange={(event, val) => updateSlider(event, val)} value={Math.round(light.brightness / 2.55)} valueLabelDisplay="auto" aria-label="slider" />
            <div className="light-spacer-two"/>
        </div>
    )
}