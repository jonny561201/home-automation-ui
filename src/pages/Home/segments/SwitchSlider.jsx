import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../../../state/Store';
import {ButtonBase} from '@mui/material';
import {setLightState} from '../../../utilities/RestApi';
import {CustomSlider} from '../../../components/controls/Slider';
import {useAuth0} from "@auth0/auth0-react";


export default function SwitchSlider(props) {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const [light, setLight] = useState(props.data);
    const [lightId,] = useState(props.data.lightId);
    const [groupId,] = useState(props.data.groupId);
    const [prevBrightness, setPrevBrightness] = useState(0);

    useEffect(() => {
        const group = state.lights.find(x => x.groupId === props.data.groupId);
        if (group && group.lights) {
            const found = group.lights.find(y => y.lightId === lightId);
            if (found) setLight(found);
        }
    }, [state.lights]);

    const updateSlider = (event, value) => {
        setLight({ ...light, brightness: value * 2.55, on: value > 0 });
    };

    const commitSlider = async (event, value) => {
        const newBrightness = value * 2.55;
        const token = await auth0.getAccessTokenSilently();
        setLightState(token, lightId, true, newBrightness);
        const newLight = { ...light, brightness: newBrightness, on: value > 0 };
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, lights: x.lights.map(y => (y.lightId === lightId) ? newLight : y) } : x);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
    };

    const toggleLight = async () => {
        const newState = !light.on;
        const newBrightness = !newState ? 0 : prevBrightness;
        const token = await auth0.getAccessTokenSilently();
        await setLightState(token, lightId, newState, newBrightness)
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
            <CustomSlider onChange={updateSlider} onChangeCommitted={commitSlider} value={Math.round(light.brightness / 2.55)} valueLabelDisplay="auto" aria-label="slider" />
            <div className="light-spacer-two"/>
        </div>
    )
}