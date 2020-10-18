import React, { useContext, useEffect, useState } from 'react';
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import { Context } from '../../state/Store';
import { calculateDistanceInMeters } from '../../utilities/Location';

export default function UserLocation() {
    const [state, dispatch] = useContext(Context);
    const [distance, setDistance] = useState();
    const [firstCheck, setFirstCheck] = useState(false);
    const [secondCheck, setSecondCheck] = useState(false);
    const [inGarage, setInGarage] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            calculateDistance();
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    });

    const shouldOpenGarage = () => {
        //within 100M of Garage
        //then within 50M of Garage within 10s
        //then within 20M of Garage within 20s

        //if garage door already in garage shouldnt open
        //time duration to reset location checks
        if (distance <= 5 && !firstCheck) {
            setInGarage(true);
        } else if (distance <= 15 && secondCheck && firstCheck && !inGarage) {
            setInGarage(true);
            return true;
        } else if (distance <= 50 && firstCheck && !inGarage) {
            setSecondCheck(true);
            return false;
        } else if (distance <= 100 && !inGarage) {
            setFirstCheck(true);
            return false;
        } else {
            setInGarage(false);
            setFirstCheck(false);
            setSecondCheck(false);
            return false;
        }
    }

    const calculateTimeOfDay = (userCoords) => {
        const today = new Date();
        const now = new Date();
        const tomorrow = new Date(now.setTime(now.getTime() + 1 * 86400000));
        const sunrise = getSunrise(userCoords.latitude, userCoords.longitude, tomorrow);
        const sunset = getSunset(userCoords.latitude, userCoords.longitude);
        const night = today >= sunset && today < sunrise;
        dispatch({ type: "SET_IS_NIGHT", payload: night });
    }

    const calculateDistance = () => {
        if (state.garageCoords !== null) {
            navigator.geolocation.watchPosition((position) => {
                console.log("updated location")
                const coords = position.coords;
                const currentCoords = state.garageCoords;
                const userDistance = calculateDistanceInMeters(currentCoords.latitude, currentCoords.longitude, coords.latitude, coords.longitude);
                setDistance(userDistance);
                dispatch({ type: "SET_USER_COORDS", payload: userDistance });
                calculateTimeOfDay(currentCoords);
            }, (error) => { alert('Enable GPS position feature.') }, { enableHighAccuracy: true });
        }
    }

    return (
        <>
            <p>Distance: {distance} Miles</p>
            <p>IsNight: {String(state.isNight)}</p>
        </>
    )
}