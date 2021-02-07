import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../state/Store';
import useSound from 'use-sound';
import dingSound from '../../resources/ding.mp3';
import CloseIcon from '@material-ui/icons/Close';
import { updateGarageState } from '../../utilities/RestApi';
import { useInterval } from '../../utilities/UseInterval';
import { calculateDistanceInMeters } from '../../utilities/Location';
import './UserLocation.css';

export default function UserLocation() {
    const [ding] = useSound(dingSound, {volume: 0.25});
    const [state, dispatch] = useContext(Context);
    const [cancel, setCancel] = useState(false);
    const [opened, setOpened] = useState(false);
    const [firstCheck, setFirstCheck] = useState(false);
    const [secondCheck, setSecondCheck] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);

    useEffect(() => {
        calculateDistance();
    }, []);

    //TODO: may not need this with watch position
    useInterval(() => {
        calculateDistance();
    }, 5000);

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
                ding();
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

    const calculateDistance = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            // navigator.geolocation.watchPosition((position) => {
            const userCoords = position.coords;
            dispatch({ type: "SET_USER_COORDS", payload: userCoords });
            if (state.garageCoords !== null) {
                const garageCoords = state.garageCoords;
                const userDistance = calculateDistanceInMeters(garageCoords.latitude, garageCoords.longitude, userCoords.latitude, userCoords.longitude);
                if (shouldOpenGarage(userDistance)) {
                    console.log('gonna open')
                    updateGarageState(true, state.userId, 1);
                }
            }
        }, (error) => { alert('Enable GPS position feature.') }, { enableHighAccuracy: true });
    }

    return (
        <div>
            {
                displayMenu &&
                <div className="auto-open-menu">
                    <CloseIcon className="location-close-icon" onClick={() => setDisplayMenu(false)} />
                    <div className="location-menu-group">
                        <p className="auto-open-menu-text reduce-margin">Garage opens in 250ft</p>
                        <button className="auto-open-menu-button reduce-margin" onClick={cancelDoorOpen}>Cancel</button>
                    </div>
                </div>
            }
        </div>
    )
}