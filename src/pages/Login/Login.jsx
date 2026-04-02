import React, {useEffect} from 'react';
import './Login.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom";


export default function Login() {
    const auth0 = useAuth0();
    const location = useLocation();

    useEffect(() => {
        if (!auth0.isLoading && !auth0.isAuthenticated) {
            auth0.loginWithRedirect({ appState: { returnTo: location.state?.from?.pathname || '/home' }});
        }
    }, [auth0.isLoading, auth0.isAuthenticated, auth0.loginWithRedirect, location.state]);

    return (
        <>
            {auth0.isLoading && <div>...Loading auth...</div>}
            {!auth0.isLoading && auth0.isAuthenticated && <Navigate to="/home" replace />}
            {!auth0.isLoading && !auth0.isAuthenticated && <div>...Redirection to sign in...</div>}
        </>
    )
}