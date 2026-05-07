import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../state/Store';
import CloseIcon from '@mui/icons-material/Close';
import { updateGarageState } from '../../../utilities/RestApi';
import { calculateDistanceInMeters } from '../../../utilities/Location';
import './UserLocation.scss';
import { RedButton } from '../../../components/controls/Buttons';

export default function UserLocation() {
    const [state, dispatch] = useContext(Context);
    const [cancel, setCancel] = useState(false);
    const [opened, setOpened] = useState(false);
    const [firstCheck, setFirstCheck] = useState(false);
    const [secondCheck, setSecondCheck] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);
    const watchIdRef = useRef(null);

    useEffect(() => {
        watchIdRef.current = navigator.geolocation.watchPosition(onPositionUpdate, onPositionError, { enableHighAccuracy: true });
        return () => {
            if (watchIdRef.current !== null)
                navigator.geolocation.clearWatch(watchIdRef.current);
        };
    }, []);

    const onPositionUpdate = async (position) => {
        dispatch({ type: 'SET_LOCATION', payload: { granted: true, notified: state.location.notified } });
        const userCoords = position.coords;
        dispatch({ type: "SET_USER_COORDS", payload: userCoords });
        if (state.garageCoords !== null) {
            const garageCoords = state.garageCoords;
            const userDistance = calculateDistanceInMeters(garageCoords.latitude, garageCoords.longitude, userCoords.latitude, userCoords.longitude);
            if (shouldOpenGarage(userDistance)) {
                updateGarageState(true, (state.preferences || {}).garage_id);
            }
        }
    }

    const onPositionError = () => {
        if (!state.location.notified) {
            alert('Enable GPS position feature.');
            dispatch({ type: "SET_LOCATION", payload: { notified: true, granted: false } });
        }
    }

    const cancelDoorOpen = () => {
        setCancel(true);
        setDisplayMenu(false);
    }

    const shouldOpenGarage = (distance) => {
        // DISTANCE COMES IN AS MILES!!!
        // not in garage
        if (distance >= 0.02 && distance < 0.35) {
            if (distance > 0.1 && distance <= 0.3 && !firstCheck && !secondCheck) {
                setFirstCheck(true);
                return false;
            } else if (distance > 0.06 && distance <= 0.1 && firstCheck && !secondCheck) {
                setSecondCheck(true);
                setDisplayMenu(true);
                return false;
            } else if (distance <= 0.04 && secondCheck && firstCheck && !cancel && !opened) {
                setDisplayMenu(false);
                setOpened(true);
                return true;
            }
        } else {
            setFirstCheck(false);
            setSecondCheck(false);
            setDisplayMenu(false);
            setCancel(false);
            setOpened(false)
            return false;
        }
    }

    return (
        <div>
            {
                displayMenu &&
                <div className="auto-open-menu">
                    <CloseIcon className="location-close-icon" onClick={() => setDisplayMenu(false)} />
                    <div className="location-menu-group">
                        <p className="auto-open-text text reduce-margin">Garage will open in 250ft</p>
                        <RedButton className="auto-open-button" onClick={cancelDoorOpen}>Cancel</RedButton>
                    </div>
                </div>
            }
        </div>
    )
}