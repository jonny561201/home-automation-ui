import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

export default function PrivateRoute({component: Component}) {
    const location = useLocation();
    const auth0 = useAuth0();

    return (
        <>
            {auth0.isLoading && <div />}
            {auth0.isAuthenticated && !auth0.isLoading
                ? <Component/>
                : <Navigate to="/" state={{from: location}} replace/>}
        </>
      )
}