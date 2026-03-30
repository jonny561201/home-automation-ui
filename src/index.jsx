import React, {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Auth0Provider} from "@auth0/auth0-react";


const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <Auth0Provider domain="dev-mx0anv661qiyofk8.us.auth0.com" clientId="HCu5saPrukQyCYzcXYANtVKzjg9gpIU5" authorizationParams={{redirect_uri: window.location.origin}}>
            <App/>
        </Auth0Provider>
    </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();