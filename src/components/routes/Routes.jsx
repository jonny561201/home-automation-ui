import React, { lazy, Suspense } from 'react';
import PrivateRoute from '../routes/PrivateRoutes';
import Activities from '../../pages/Activities/Activities';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

const Login = lazy(() => import('../../pages/Login/Login'));
const Home = lazy(() => import('../../pages/Home/Home'));
const Account = lazy(() => import('../../pages/Account/Account'));
const Settings = lazy(() => import('../../pages/Settings/Settings'));


export default function Routes() {

  return (
    <header className="App-header">
      <Suspense fallback={<div />}>
        <RouterRoutes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute component={Home} />} />
          <Route path="/activities" element={<PrivateRoute component={Activities} />} />
          <Route path="/settings" element={<PrivateRoute component={Settings} />} />
          <Route path="/account" element={<PrivateRoute component={Account} />} />
        </RouterRoutes>
      </Suspense>
    </header>
  );
}