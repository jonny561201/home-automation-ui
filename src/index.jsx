import React, {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';


const root = createRoot(document.getElementById('root'));
const authParams = { redirect_uri: window.location.origin, audience: "http://localhost:5000" };

root.render(
    <StrictMode>
        <Auth0Provider domain="dev-mx0anv661qiyofk8.us.auth0.com" clientId="HCu5saPrukQyCYzcXYANtVKzjg9gpIU5" authorizationParams={authParams}>
            <App/>
        </Auth0Provider>
    </StrictMode>
);