import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import store from "./app/configureStore";
import App from "./app/App";
import {BrowserRouter} from "react-router";

window.localStorage.setItem('debug', '*');
const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
