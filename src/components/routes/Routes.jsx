import React, { useContext } from 'react';
import Login from '../../pages/Login/Login';
import PrivateRoute from '../routes/PrivateRoutes';
import Home from '../../pages/Home/Home';
import Activities from '../../pages/Activities/Activities';
import Account from '../../pages/Account/Account';
import Settings from '../../pages/Settings/Settings';
import { Context } from '../../state/Store';
import { Routes as RouterRoutes, Route } from 'react-router-dom';


export default function Routes() {
  const [state,] = useContext(Context);

  return (
    <header className="App-header" data-testid="app-routes">
      <RouterRoutes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute authed={state.auth.isAuthenticated} component={Home} />} />
        <Route path="/activities" element={<PrivateRoute authed={state.auth.isAuthenticated} component={Activities} />} />
        <Route path="/settings" element={<PrivateRoute authed={state.auth.isAuthenticated} component={Settings} />} />
        <Route path="/account" element={<PrivateRoute authed={state.auth.isAuthenticated} component={Account} />} />
      </RouterRoutes>
    </header>
  );
}