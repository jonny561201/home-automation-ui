import React, { useState, useContext, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Divider, Button, IconButton, MenuItem, CircularProgress } from '@mui/material';
import { Save, MyLocation, CheckCircle, ErrorOutline } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Context } from '../../../state/Store';
import { SET_USER_PREFERENCES } from '../../../state/actions';
import { reverseGeocode, updateUserPreferences } from '../../../utilities/RestApi';
import { captureCurrentPosition } from '../../../utilities/Location';
import { usStates } from '../../../utilities/USStates';
import './CityPrompt.scss';


const ACCURACY_THRESHOLD_METERS = 100;

export default function CityPrompt() {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [city, setCity] = useState('');
    const [addrState, setAddrState] = useState('');
    const [coords, setCoords] = useState(null);
    const [capturing, setCapturing] = useState(false);
    const [gpsError, setGpsError] = useState('');
    const prompted = useRef(false);

    useEffect(() => {
        if (prompted.current) return;
        if (!state.preferences) return;
        if (state.preferences.city) return;
        prompted.current = true;
        setOpen(true);
    }, [state.preferences]);

    const captureLocation = async () => {
        setGpsError('');
        setCapturing(true);
        try {
            const position = await captureCurrentPosition();
            const place = await reverseGeocode(position.latitude, position.longitude);
            if (!place.city || !place.state) {
                throw new Error('Could not determine your city and state — enter manually.');
            }
            setCoords(position);
            setCity(place.city);
            setAddrState(place.state);
        } catch (error) {
            setGpsError(error.message || "Couldn't get your location — enter your city manually.");
            setCoords(null);
        } finally {
            setCapturing(false);
        }
    };

    const saveLocation = async () => {
        const request = { city: city, state: addrState, isFahrenheit: true, isImperial: true };
        if (coords) {
            request.latitude = coords.latitude;
            request.longitude = coords.longitude;
        }
        await updateUserPreferences(request);
        dispatch({ type: SET_USER_PREFERENCES, payload: { ...(state.preferences || {}), ...request } });
        setOpen(false);
    };

    const canSave = () => city.length > 0 && addrState.length > 0;
    const isLowAccuracy = () => coords !== null && coords.accuracy > ACCURACY_THRESHOLD_METERS;

    return (
        <Dialog open={open}>
            <DialogTitle className="city-prompt-title text">
                Set Your Location
                <IconButton aria-label="Close" className="city-prompt-close" onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className="city-prompt-content">
                <p className="city-prompt-description text">Used to fetch your local weather forecast — stays on your account.</p>

                <Button className="city-prompt-gps" variant="outlined" fullWidth disabled={capturing} onClick={captureLocation}
                    startIcon={capturing ? <CircularProgress size={18} /> : <MyLocation />}>
                    {capturing ? 'Getting location…' : 'Use My Location'}
                </Button>
                <p className="city-prompt-gps-hint text">Best on a phone, near your home.</p>

                {coords &&
                    <div className={'city-prompt-status ' + (isLowAccuracy() ? 'city-prompt-status-warn' : 'city-prompt-status-ok')}>
                        <CheckCircle fontSize="small" />
                        <span className="text">Captured ±{coords.accuracy} m{isLowAccuracy() ? ' — try again outdoors for better accuracy' : ''}</span>
                    </div>
                }
                {gpsError &&
                    <div className="city-prompt-status city-prompt-status-error">
                        <ErrorOutline fontSize="small" />
                        <span className="text">{gpsError}</span>
                    </div>
                }

                <div className="city-prompt-divider">
                    <span className="text">or enter manually</span>
                </div>

                <TextField label="City" variant="outlined" fullWidth value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="city-prompt-field" />
                <TextField label="State" variant="outlined" select fullWidth value={addrState}
                    onChange={(e) => setAddrState(e.target.value)}
                    className="city-prompt-field">
                    {usStates.map(s =>
                        <MenuItem key={s.abbrev} value={s.abbrev}>{s.name} ({s.abbrev})</MenuItem>
                    )}
                </TextField>
            </DialogContent>
            <Divider />
            <div className="city-prompt-actions text">
                <Button className="city-prompt-save" onClick={saveLocation} disabled={!canSave()} startIcon={<Save />}>Save</Button>
            </div>
        </Dialog>
    );
}
