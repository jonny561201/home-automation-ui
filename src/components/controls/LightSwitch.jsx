import React, { useState, useContext } from 'react';
import { Context } from '../../state/Store';
import { CustomSlider } from '../../components/controls/Slider';
import { ButtonBase } from '@mui/material';
import SwitchSlider from '../../pages/Home/segments/SwitchSlider';
import { setLightGroupState } from '../../utilities/RestApi';
import { ExpandButton } from './Buttons';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import './LightSwitch.scss';
import {useAuth0} from "@auth0/auth0-react";


export default function LightSwitch(props) {
    const auth0 = useAuth0();
    const initalBrightness = Math.round(props.data.brightness / 2.55);
    const [state, dispatch] = useContext(Context);
    const [isOn, setIsOn] = useState(props.data.on);
    const [lights,] = useState(props.data.lights);
    const [groupId,] = useState(props.data.groupId);
    const [groupName,] = useState(props.data.groupName);
    const [brightness, setBrightness] = useState(initalBrightness);
    const [prevBrightness, setPrevBrightness] = useState(initalBrightness);
    const [areLightsOpen, setLightsOpen] = useState(false);

    const sliderToggleLightGroup = (event, value) => {
        if (value > 0) setIsOn(true);
        setBrightness(value);
    };

    const commitSliderLightGroup = async (event, value) => {
        const newBrightness = Math.round(value * 2.55);
        const token = await auth0.getAccessTokenSilently();
        setLightGroupState(token, groupId, true, newBrightness);
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, brightness: newBrightness, lights: x.lights.map(y => ({ ...y, brightness: newBrightness })) } : x);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
    };

    const toggleLightGroup = async () => {
        const newState = !isOn;
        setIsOn(!isOn);
        const token = await auth0.getAccessTokenSilently();
        await setLightGroupState(token, groupId, newState);
        if (!newState) {
            setPrevBrightness(brightness);            
            setBrightness(0);
            const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, brightness: 0, lights: x.lights.map(y => ({ ...y, brightness: 0 })) } : x);
            dispatch({ type: 'SET_LIGHTS', payload: newList });
        } else {
            setBrightness(prevBrightness);
            const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, brightness: prevBrightness, lights: x.lights.map(y => ({ ...y, brightness: Math.round(prevBrightness * 2.55) })) } : x);
            dispatch({ type: 'SET_LIGHTS', payload: newList });
        }
    }

    const getLightSwitches = () => {
        if (lights && lights.length > 0) {
            return lights.map(x => (
                <SwitchSlider key={`switch-${x.lightId}`} data={x} />
            ));
        }
        return <p className="panel-text text">No lights assigned to group</p>
    };

    return (
        <div>
            <div className="light-group text">
                <ExpandButton className={`light-chevron ${areLightsOpen ? "expanded" : ""}`} onClick={() => setLightsOpen(!areLightsOpen)}></ExpandButton>
                <ButtonBase className="light-button" onClick={toggleLightGroup}>
                    <p className="light-text text">{groupName}</p>
                </ButtonBase>
                <CustomSlider onChange={sliderToggleLightGroup} onChangeCommitted={commitSliderLightGroup} value={brightness} valueLabelDisplay="auto" aria-label="slider" />
                <BrightnessMediumIcon className="brightness-icon text" />
            </div>
            {areLightsOpen && (
                <div className="light-group-expansion">{getLightSwitches()}</div>
            )}
        </div>
    );
}