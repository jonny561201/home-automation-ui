import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { Context } from './Store';

export default function ClaimsInitializer({ children }) {
    const auth0 = useAuth0();
    const [_, dispatch] = useContext(Context)

    useEffect(() => {
        setClaims();
    }, [auth0.isLoading, auth0.isAuthenticated, dispatch]);

    const setClaims = async () => {
        const claims = await auth0.getIdTokenClaims();
        const userId = claims['https://soaringleafsolutions.com/user_id'];
        const roles = claims['https://soaringleafsolutions.com/roles'];
        const firstName = claims.given_name ?? claims.nickname;
        const lastName = claims.last_name ?? "";
        await dispatch({ type: 'SET_USER_DATA', payload: { userId: userId, firstName: firstName, lastName: lastName, roles: roles } });
    };

    return children
}