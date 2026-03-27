import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function PrivateRoute({component: Component, authed}) {
    const location = useLocation();
    return (
        authed === true
            ? <Component />
            : <Navigate to="/" state={{ from: location }} replace />
      )
}