import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Divider, Button, IconButton } from '@mui/material';
import { Save } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth0 } from '@auth0/auth0-react';
import { Context } from '../../../state/Store';
import { updateUserPreferences } from '../../../utilities/RestApi';
import './CityPrompt.scss';


export default function CityPrompt() {
    const auth0 = useAuth0();
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [city, setCity] = useState('');
    const [addrState, setAddrState] = useState('');

    useEffect(() => {
        if (!state.preferences) return;
        if (state.preferences.city) return;
        setOpen(true);
    }, [state.preferences]);

    const saveLocation = async () => {
        const request = { city: city, state: addrState, isFahrenheit: true, isImperial: true };
        const token = await auth0.getAccessTokenSilently();
        await updateUserPreferences(token, request);
        dispatch({ type: 'SET_USER_PREFERENCES', payload: { ...(state.preferences || {}), city: city } });
        setOpen(false);
    };

    return (
        <Dialog open={open}>
            <DialogTitle className="city-prompt-title text">
                Set Your Location
                <IconButton aria-label="Close" className="city-prompt-close" onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className="city-prompt-content">
                <p className="city-prompt-description text">Enter your city and state for weather data.</p>
                <TextField label="City" variant="outlined" fullWidth value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="city-prompt-field" />
                <TextField label="State" variant="outlined" fullWidth value={addrState}
                    onChange={(e) => setAddrState(e.target.value)}
                    className="city-prompt-field" />
            </DialogContent>
            <Divider />
            <div className="city-prompt-actions text">
                <Button className="city-prompt-save" onClick={saveLocation} disabled={!city} startIcon={<Save />}>Save</Button>
            </div>
        </Dialog>
    );
}
