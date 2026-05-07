import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { Context } from './Store';
import { initRestApi } from '../utilities/RestApi';

export default function ClaimsInitializer({ children }) {
    const auth0 = useAuth0();
    const [_, dispatch] = useContext(Context)

    useEffect(() => {
        initRestApi(auth0);
        setClaims();
    }, [auth0.isLoading, auth0.isAuthenticated, dispatch]);

    const setClaims = async () => {
        await auth0.getAccessTokenSilently();
        const claims = await auth0.getIdTokenClaims();
        const userId = claims['https://soaringleafsolutions.com/user_id'];
        const roles = claims['https://soaringleafsolutions.com/roles'];
        const firstName = claims.given_name ?? claims.nickname;
        const lastName = claims.last_name ?? "";
        const email = claims.email ?? "";

        await dispatch({ type: 'SET_USER_DATA', payload: { userId: userId, firstName: firstName, lastName: lastName, email: email, roles: roles } });
    };

    return children
}

