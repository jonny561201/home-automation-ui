import React, { useState, useContext } from 'react';
import { Context } from '../../state/Store';
import { debounchApi } from '../../utilities/Services';
import { CustomSlider } from '../../components/controls/Slider';
import { ButtonBase } from '@material-ui/core';
import SwitchSlider from '../../pages/Home/segments/SwitchSlider';
import { setLightGroupState } from '../../utilities/RestApi';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BrightnessIcon from '../../resources/panelIcons/BrightnessHigh.png';
import './LightSwitch.css';

export default function LightSwitch(props) {
    const [state, dispatch] = useContext(Context);
    const [lights,] = useState(props.data.lights);
    const [groupId,] = useState(props.data.groupId);
    const [groupName,] = useState(props.data.groupName);
    const [brightness, setBrightness] = useState(Math.round(props.data.brightness / 2.55));
    const [areLightsOpen, setLightsOpen] = useState(false);

    const sliderToggleLightGroup = async (event, value) => {
        const newBrightness = Math.round(value * 2.55);
        const updatedLights = state.userLights.map(x => x.groupId === groupId ? { ...x, brightness: newBrightness } : x);
        debounchApi(() => setLightGroupState(groupId, true, newBrightness));
        dispatch({ type: 'SET_ALL_USER_LIGHTS', payload: updatedLights });
        setBrightness(value)
    };

    const getLightSwitches = () => {
        if (lights && lights.length > 0) {
            return lights.map(x => (
                <SwitchSlider key={`switch-${x.lightId}`} data={x} lightId={x.lightId} />
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
                </ButtonBase>
                <p className="light-text text">{groupName}</p>
                <CustomSlider data-testid={"light-group-switch"} onChange={sliderToggleLightGroup} value={brightness} valueLabelDisplay="auto" aria-label="slider" />
                <img alt="brightness" className="brightness-image" src={BrightnessIcon} />
            </div>
            {areLightsOpen
                ? <div data-testid={"light-group-expansion"} className="light-group-expansion">{getLightSwitches()}</div>
                : null}
        </div>
    );
}