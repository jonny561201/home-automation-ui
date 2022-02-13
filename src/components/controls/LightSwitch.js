import React, { useState, useContext } from 'react';
import { Context } from '../../state/Store';
import { debounchApi } from '../../utilities/Services';
import { CustomSlider } from '../../components/controls/Slider';
import { ButtonBase } from '@material-ui/core';
import SwitchSlider from '../../pages/Home/segments/SwitchSlider';
import { setLightGroupState } from '../../utilities/RestApi';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import './LightSwitch.css';
import { CSSTransition } from 'react-transition-group';


export default function LightSwitch(props) {
    const [state, dispatch] = useContext(Context);
    const [isOn, setIsOn] = useState(props.data.on);
    const [lights,] = useState(props.data.lights);
    const [groupId,] = useState(props.data.groupId);
    const [groupName,] = useState(props.data.groupName);
    const [brightness, setBrightness] = useState(Math.round(props.data.brightness / 2.55));
    const [areLightsOpen, setLightsOpen] = useState(false);

    const sliderToggleLightGroup = async (event, value) => {
        const newBrightness = Math.round(value * 2.55);
        debounchApi(() => setLightGroupState(state.auth.bearer, groupId, true, newBrightness));
        if (newBrightness > 0)
            setIsOn(true);
        setBrightness(value);
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, brightness: newBrightness, lights: x.lights.map(y => ({ ...y, brightness: newBrightness })) } : x);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
    };

    const toggleLightGroup = async () => {
        const newState = !isOn;
        setIsOn(!isOn);
        await setLightGroupState(state.auth.bearer, groupId, newState);
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
        <div data-testid="light-group">
            <div className="light-group text">
                <ButtonBase onClick={() => setLightsOpen(!areLightsOpen)} style={{ "borderRadius": "50%" }}>
                    <div className={`light-chevron ${areLightsOpen ? "expanded" : ""}`}>
                        <ChevronRightIcon data-testid={"expansion-chevron"} />
                    </div>
                <ButtonBase className="light-button" onClick={toggleLightGroup}>
                    <p className="light-text text">{groupName}</p>
                </ButtonBase>
                <CustomSlider data-testid={"light-group-switch"} onChange={sliderToggleLightGroup} value={brightness} valueLabelDisplay="auto" aria-label="slider" />
                <BrightnessMediumIcon className="brightness-icon text" />
            </div>
            <CSSTransition in={areLightsOpen} timeout={500} classNames="expansion" unmountOnExit appear >
                <div data-testid={"light-group-expansion"} className="light-group-expansion expansion">{getLightSwitches()}</div>
            </CSSTransition>
        </div>
    );
}