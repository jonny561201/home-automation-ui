import React, { Suspense, lazy, useContext } from 'react';
import PrivateRoute from '../routes/PrivateRoutes';
import Activities from '../../pages/Activities/Activities';
import { Context } from '../../state/Store';
import { Routes as RouterRoutes, Route } from 'react-router-dom';

const Login = lazy(() => import('../../pages/Login/Login'));
const Home = lazy(() => import('../../pages/Home/Home'));
const Account = lazy(() => import('../../pages/Account/Account'));
const Settings = lazy(() => import('../../pages/Settings/Settings'));


export default function Routes() {
  const [state,] = useContext(Context);

  return (
    <header className="App-header" data-testid="app-routes">
      <Suspense fallback={<div data-testid="route-loading" />}>
        <RouterRoutes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute authed={state.auth.isAuthenticated} component={Home} />} />
          <Route path="/activities" element={<PrivateRoute authed={state.auth.isAuthenticated} component={Activities} />} />
          <Route path="/settings" element={<PrivateRoute authed={state.auth.isAuthenticated} component={Settings} />} />
          <Route path="/account" element={<PrivateRoute authed={state.auth.isAuthenticated} component={Account} />} />
        </RouterRoutes>
      </Suspense>
    </header>
  );
}