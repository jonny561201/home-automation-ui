import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import { Add, Close } from '@mui/icons-material';
import { setLightGroupState, setLightState, createScene, deleteScene } from '../../../utilities/RestApi';
import { useAuth0 } from '@auth0/auth0-react';
import CreateScene from './CreateScene';
import './LightScenes.scss';


export default function LightScenes() {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const [activeScene, setActiveScene] = useState(null);
    const [showCreate, setShowCreate] = useState(false);

    const activateScene = async (scene) => {
        setActiveScene(scene.sceneId);
        const token = await auth0.getAccessTokenSilently();
        for (const detail of scene.details) {
            const isOn = detail.brightness > 0;
            if (detail.groupId) {
                await setLightGroupState(token, detail.groupId, isOn, detail.brightness);
            } else if (detail.lightId) {
                await setLightState(token, detail.lightId, isOn, detail.brightness);
            }
        }
        updateLightsFromScene(scene);
    };

    const updateLightsFromScene = (scene) => {
        let updated = state.lights.map(g => ({ ...g, lights: g.lights ? [...g.lights] : [] }));
        for (const detail of scene.details) {
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
        const token = await auth0.getAccessTokenSilently();
        const response = await createScene(token, scene);
        dispatch({ type: 'ADD_SCENE', payload: response });
        setShowCreate(false);
    };

    const handleDelete = async (sceneId) => {
        const token = await auth0.getAccessTokenSilently();
        const response = await deleteScene(token, sceneId);
        if (response.ok) {
            dispatch({ type: 'DELETE_SCENE', payload: sceneId });
            if (activeScene === sceneId) setActiveScene(null);
        }
    };

    return (
        <div className="light-scenes">
            <p className="light-scenes-label text">Scenes</p>
            <div className="light-scenes-pills">
            {(state.scenes || []).map(scene =>
                <div key={scene.id} className={'scene-pill' + (activeScene === scene.id ? ' scene-pill-active' : '')}>
                    <button className="scene-pill-label text" onClick={() => activateScene(scene)}>
                        {scene.name}
                    </button>
                    <Close className="scene-pill-delete" onClick={() => handleDelete(scene.id)} />
                </div>
            )}
            <button className="scene-pill scene-pill-add text" onClick={() => setShowCreate(true)}>
                <Add className="scene-pill-add-icon" />
            </button>
            </div>
            {showCreate && <CreateScene onSave={handleCreateSave} onCancel={() => setShowCreate(false)} />}
        </div>
    );
}
