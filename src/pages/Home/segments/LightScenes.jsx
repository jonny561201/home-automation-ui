import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import { Add, Close } from '@mui/icons-material';
import { setLightGroupState, setLightState, createScene, deleteScene } from '../../../utilities/RestApi';
import CreateScene from './CreateScene';
import './LightScenes.scss';


export default function LightScenes() {
    const [state, dispatch] = useContext(Context);
    const [activeScene, setActiveScene] = useState(null);
    const [showCreate, setShowCreate] = useState(false);

    const activateScene = async (scene) => {
        setActiveScene(scene.id);
        for (const light of scene.lights) {
            const isOn = light.brightness > 0;
            if (light.groupId) {
                await setLightGroupState(light.groupId, isOn, light.brightness);
            } else if (light.lightId) {
                await setLightState(light.lightId, isOn, light.brightness);
            }
        }
        updateLightsFromScene(scene);
        await new Promise(r => setTimeout(r, 800));
        setActiveScene(null);
    };

    const updateLightsFromScene = (scene) => {
        let updated = state.lights.map(g => ({ ...g, lights: g.lights ? [...g.lights] : [] }));
        for (const detail of scene.lights) {
            if (detail.groupId) {
                updated = updated.map(g => g.groupId === detail.groupId
                    ? { ...g, brightness: detail.brightness, on: detail.brightness > 0, lights: g.lights.map(l => ({ ...l, brightness: detail.brightness, on: detail.brightness > 0 })) }
                    : g
                );
            } else if (detail.lightId) {
                updated = updated.map(g => ({
                    ...g,
                    lights: g.lights.map(l => l.lightId === detail.lightId
                        ? { ...l, brightness: detail.brightness, on: detail.brightness > 0 }
                        : l
                    )
                }));
            }
        }
        dispatch({ type: 'SET_LIGHTS', payload: updated });
    };

    const handleCreateSave = async (scene) => {
        const response = await createScene(scene);
        dispatch({ type: 'ADD_SCENE', payload: response });
        setShowCreate(false);
    };

    const handleDelete = async (sceneId) => {
        const response = await deleteScene(sceneId);
        if (response.ok) {
            dispatch({ type: 'DELETE_SCENE', payload: sceneId });
        }
    };

    return (
        <div className="light-scenes">
            <p className="light-scenes-label text">Scenes</p>
            <div className="light-scenes-pills">
            {(state.scenes || []).map(scene =>
                <div key={scene.id} className={'scene-pill' + (activeScene === scene.id ? ' scene-pill-active' : '')}>
                    <button type="button" className="scene-pill-label text" onClick={() => activateScene(scene)}>
                        {scene.name}
                    </button>
                    <Close className="scene-pill-delete" onClick={() => handleDelete(scene.id)} />
                </div>
            )}
            <button type="button" className="scene-pill scene-pill-add text" onClick={() => setShowCreate(true)} aria-label="Add scene">
                <Add className="scene-pill-add-icon" />
            </button>
            </div>
            {showCreate && <CreateScene onSave={handleCreateSave} onCancel={() => setShowCreate(false)} />}
        </div>
    );
}
