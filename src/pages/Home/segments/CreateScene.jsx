import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import { Dialog, TextField, Divider, Button, Checkbox } from '@mui/material';
import { Save, Delete } from '@mui/icons-material';
import { CustomSlider } from '../../../components/controls/Slider';
import './CreateScene.scss';


export default function CreateScene({ onSave, onCancel }) {
    const [state,] = useContext(Context);
    const [name, setName] = useState('');
    const [selections, setSelections] = useState({});

    const isGroupChecked = (groupId) => {
        return selections['group-' + groupId] !== undefined;
    };

    const isLightChecked = (lightId) => {
        return selections['light-' + lightId] !== undefined;
    };

    const getGroupBrightness = (groupId) => {
        const sel = selections['group-' + groupId];
        return sel !== undefined ? sel : 0;
    };

    const getLightBrightness = (lightId) => {
        const sel = selections['light-' + lightId];
        return sel !== undefined ? sel : 0;
    };

    const toggleGroup = (group) => {
        const key = 'group-' + group.groupId;
        if (isGroupChecked(group.groupId)) {
            const updated = { ...selections };
            delete updated[key];
            setSelections(updated);
        } else {
            setSelections({ ...selections, [key]: Math.round(group.brightness / 2.55) });
        }
    };

    const toggleLight = (light) => {
        const key = 'light-' + light.lightId;
        if (isLightChecked(light.lightId)) {
            const updated = { ...selections };
            delete updated[key];
            setSelections(updated);
        } else {
            setSelections({ ...selections, [key]: Math.round(light.brightness / 2.55) });
        }
    };

    const updateGroupBrightness = (groupId, value) => {
        setSelections({ ...selections, ['group-' + groupId]: value });
    };

    const updateLightBrightness = (lightId, value) => {
        setSelections({ ...selections, ['light-' + lightId]: value });
    };

    const buildDetails = () => {
        const details = [];
        Object.keys(selections).forEach(key => {
            const brightness = Math.round(selections[key] * 2.55);
            if (key.startsWith('group-')) {
                details.push({ groupId: key.replace('group-', ''), brightness: brightness });
            } else if (key.startsWith('light-')) {
                details.push({ lightId: key.replace('light-', ''), brightness: brightness });
            }
        });
        return details;
    };

    const handleSave = () => {
        if (!name.trim() || Object.keys(selections).length === 0) return;
        onSave({ name: name.trim(), details: buildDetails() });
    };

    return (
        <Dialog open={true} fullWidth maxWidth="sm">
            <div className="create-scene-dialog">
                <h2 className="create-scene-title panel-header-text">New Scene</h2>
                <div className="create-scene-name">
                    <TextField fullWidth variant="outlined" label="Scene Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <Divider />
                <div className="create-scene-tree">
                    {state.lights.map(group =>
                        <div key={group.groupId} className="create-scene-group">
                            <div className="create-scene-row">
                                <Checkbox checked={isGroupChecked(group.groupId)} onChange={() => toggleGroup(group)} size="small" />
                                <p className="create-scene-group-name text">{group.groupName}</p>
                                {isGroupChecked(group.groupId) &&
                                    <CustomSlider className="create-scene-slider" value={getGroupBrightness(group.groupId)} onChange={(e, val) => updateGroupBrightness(group.groupId, val)} valueLabelDisplay="auto" />
                                }
                            </div>
                            {group.lights && group.lights.map(light =>
                                <div key={light.lightId} className="create-scene-row create-scene-light-row">
                                    <Checkbox checked={isLightChecked(light.lightId)} onChange={() => toggleLight(light)} size="small" />
                                    <p className="create-scene-light-name text">{light.lightName}</p>
                                    {isLightChecked(light.lightId) &&
                                        <CustomSlider className="create-scene-slider" value={getLightBrightness(light.lightId)} onChange={(e, val) => updateLightBrightness(light.lightId, val)} valueLabelDisplay="auto" />
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <Divider />
                <div className="create-scene-actions">
                    <Button className="create-scene-cancel" onClick={onCancel} startIcon={<Delete />}>Cancel</Button>
                    <Button className="create-scene-save" onClick={handleSave} startIcon={<Save />}>Save</Button>
                </div>
            </div>
        </Dialog>
    );
}
