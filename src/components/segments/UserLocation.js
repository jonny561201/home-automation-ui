import React, { useContext, useEffect, useState } from 'react';
import { updateGarageState } from '../../utilities/RestApi';
import { useInterval } from '../../utilities/UseInterval';
import { Context } from '../../state/Store';
import { calculateDistanceInMeters } from '../../utilities/Location';
import './UserLocation.css';

export default function UserLocation() {
    const [state, dispatch] = useContext(Context);
    const [cancel, setCancel] = useState(false);
    const [wrapperRef, setWrapperRef] = useState(null);
    const [firstCheck, setFirstCheck] = useState(false);
    const [secondCheck, setSecondCheck] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        calculateDistance();
    }, [wrapperRef]);

    //TODO: may not need this with watch position
    useInterval(() => {
        calculateDistance();
    }, 5000);

    
    const handleClickOutside = (event) => {
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            setDisplayMenu(false);
        }
    }

    const cancelDoorOpen = () => {
        setCancel(true);
        setDisplayMenu(false);
    }

    const shouldOpenGarage = (distance) => {
        // DISTANCE COMES IN AS MILES!!!
        // not in garage
        if (distance >= 0.04 && distance < 0.35) {
            if (distance <= 0.3 && !firstCheck && !secondCheck) {
                setFirstCheck(true);
                return false;
            } else if (distance <= 0.2 && firstCheck && !secondCheck) {
                setSecondCheck(true);
                setDisplayMenu(true);
                return false;
            } else if (distance <= 0.05 && secondCheck && firstCheck && !cancel) {
                setDisplayMenu(false);
                return true;
            }
        } else {
            setFirstCheck(false);
            setSecondCheck(false);
            setDisplayMenu(false);
            setCancel(false);
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
                <div className="auto-open-menu" ref={(node) => { setWrapperRef(node) }}>
                    <p className="auto-open-menu-text">Garage opens in 250ft</p>
                    <button className="auto-open-menu-button" onClick={cancelDoorOpen}>Cancel</button>
                </div>
            }
        </div>
    )
}