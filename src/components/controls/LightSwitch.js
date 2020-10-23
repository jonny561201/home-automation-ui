import React, { useState } from 'react';
import { debounchApi } from '../../utilities/Services';
import { CustomSlider } from '../../components/controls/Slider';
import { ButtonBase } from '@material-ui/core';
import SwitchSlider from '../segments/SwitchSlider';
import { setLightGroupState } from '../../utilities/RestApi';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './LightSwitch.css';

export default function LightSwitch(props) {
    const [lights, ] = useState(props.data.lights);
    const [groupId,] = useState(props.data.groupId);
    const [groupName,] = useState(props.data.groupName);
    const [brightness, setBrightness] = useState(Math.round(props.data.brightness / 2.55));
    const [areLightsOpen, setLightsOpen] = useState(false);

    const sliderToggleLightGroup = async (event, value) => {
        const newBrightness = Math.round(value * 2.55);
        debounchApi(() => setLightGroupState(groupId, true, newBrightness));
        setBrightness(value)
    };

    const getLightSwitches = () => {
        if (lights && lights.length > 0) {
            return lights.map(x => (
                <SwitchSlider key={`switch-${x.lightId}`}  data={x} parent={brightness} />
            ));
        }
        return <p className="panel-text">No lights assigned to group</p>
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