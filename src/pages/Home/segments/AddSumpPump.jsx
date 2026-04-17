import React, { useState, useEffect, useContext } from 'react';
import { Divider, Button } from '@mui/material';
import { CheckCircle, Save, Delete } from '@mui/icons-material';
import { addUserDeviceNode, getSumpLevels, getDevices } from '../../../utilities/RestApi';
import { useAuth0 } from '@auth0/auth0-react';
import { Context } from '../../../state/Store';
import './AddSumpPump.scss';


export default function AddSumpPump({ device, onComplete }) {
    const auth0 = useAuth0();
    const [, dispatch] = useContext(Context);
    const [succeeded, setSucceeded] = useState(false);

    useEffect(() => {
        if (!succeeded) return;
        const timer = setTimeout(() => onComplete(), 5000);
        return () => clearTimeout(timer);
    }, [succeeded]);

    const savePump = async (event) => {
        event.preventDefault();
        const token = await auth0.getAccessTokenSilently();
        const response = await addUserDeviceNode(token, device.deviceId, []);
        setSucceeded(response.ok);
        if (response.ok) {
            await auth0.getAccessTokenSilently({ cacheMode: 'off' });
            const claims = await auth0.getIdTokenClaims();
            const roles = claims['https://soaringleafsolutions.com/roles'];
            const userId = claims['https://soaringleafsolutions.com/user_id'];
            const firstName = claims.given_name ?? claims.nickname;
            const lastName = claims.last_name ?? '';
            const email = claims.email ?? '';
            dispatch({ type: 'SET_USER_DATA', payload: { userId, firstName, lastName, email, roles } });
            const freshToken = await auth0.getAccessTokenSilently();
            const devices = await getDevices(freshToken);
            dispatch({ type: 'SET_DEVICES', payload: devices.devices });
            const sump = await getSumpLevels(freshToken);
            dispatch({ type: 'SET_SUMP_DATA', payload: sump });
        }
    };

    return (
        <>
            {succeeded
                ? <>
                    <div className="success-group">
                        <div className="border-success-icon">
                            <CheckCircle className="sump-success-text" />
                        </div>
                        <h2 className="text sump-success-text">Successfully Added</h2>
                    </div>
                </>
                : <>
                    <div className="device-group">
                        <h2 className="device-text text">Add Sump Pump</h2>
                    </div>
                    <form onSubmit={savePump}>
                        <p className="device-text text add-sump-confirm">Confirm registration of this sump pump device?</p>
                        <Divider style={{marginTop: '1rem'}}/>
                        <div className="add-sump-actions text">
                            <div className="add-sump-action" onClick={(e) => { e.preventDefault(); onComplete(); }}>
                                <Button className="add-sump-cancel" startIcon={<Delete />}>Cancel</Button>
                            </div>
                            <div className="add-sump-action">
                                <Button className="add-sump-save" type="submit" startIcon={<Save />}>Save</Button>
                            </div>
                        </div>
                    </form>
                </>
            }
        </>
    );
}
