import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducer from './ducks';
import App from "./components/App";

const preloadedState = window.__PRELOADED_STATE__ || {
    settings: {},
};
const params = new URLSearchParams(window.location.search);
if (params.has('pl')) {
    preloadedState.settings.productLine = params.get('pl');
}
if (params.has('cat')) {
    preloadedState.settings.itemCategory = params.get('cat');
}
if (params.has('sku')) {
    preloadedState.settings.itemBaseSKU = params.get('sku');
}
if (params.has('q')) {
    preloadedState.settings.filter = params.get('q');
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
const store = createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(thunk)));



render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
