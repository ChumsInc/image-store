import {configureStore} from '@reduxjs/toolkit';
import {alertsReducer, pageSetsReducer} from 'chums-connected-components';
import Settings, {default as settingsReducer} from '../reducers/settings'
import {default as imagesReducer} from '../reducers/images'
import {default as filtersReducer} from '../reducers/filters'
import {default as userReducer} from '../reducers/user'
import {combineReducers} from "redux";
import {productFiltersReducer} from '../ducks/filters'
import {default as userProfileReducer} from '../ducks/userProfile';

const settings = {
    productLine: '',
    itemCategory: '',
    itemBaseSKU: '',
    filter: '',
};

const params = new URLSearchParams(window.location.search);
if (params.has('pl')) {
    settings.productLine = params.get('pl') ?? '';
}
if (params.has('cat')) {
    settings.itemCategory = params.get('cat') ?? '';
}
if (params.has('sku')) {
    settings.itemBaseSKU = params.get('sku') ?? '';
}
if (params.has('q')) {
    settings.filter = params.get('q') ?? '';
}

const preloadedState = {
    settings,
};

const rootReducer = combineReducers({
    alerts: alertsReducer,
   'productFilters': productFiltersReducer,
    pageSets: pageSetsReducer,
    settings: settingsReducer,
    images: imagesReducer,
    filters: filtersReducer,
    user: userReducer,
    userProfile: userProfileReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.error'],
        }
    }),
    preloadedState,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
