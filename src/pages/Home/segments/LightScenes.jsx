import React, { useContext, useState } from 'react';
import { Context } from '../../../state/Store';
import { Add } from '@mui/icons-material';
import { setLightGroupState, setLightState } from '../../../utilities/RestApi';
import { useAuth0 } from '@auth0/auth0-react';
import './LightScenes.scss';


export default function LightScenes() {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const [activeScene, setActiveScene] = useState(null);

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

    return (
        <div className="light-scenes">
            <p className="light-scenes-label text">Scenes</p>
            <div className="light-scenes-pills">
            {state.scenes.map(scene =>
                <button
                    key={scene.sceneId}
                    className={'scene-pill text' + (activeScene === scene.sceneId ? ' scene-pill-active' : '')}
                    onClick={() => activateScene(scene)}
                >
                    {scene.name}
                </button>
            )}
            <button className="scene-pill scene-pill-add text" onClick={() => {}}>
                <Add className="scene-pill-add-icon" />
            </button>
            </div>
        </div>
    );
}
