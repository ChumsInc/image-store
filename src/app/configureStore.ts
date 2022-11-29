import {configureStore} from '@reduxjs/toolkit';
import {alertsReducer} from 'chums-connected-components';
import {default as imagesReducer, initialImagesState} from '../ducks/images'
import {combineReducers} from "redux";
import {default as filtersReducer, initialFiltersState} from '../ducks/filters'
import {default as userProfileReducer, initialUserProfileState} from '../ducks/userProfile';
import {default as settingsReducer, initialSettingsState} from "../ducks/settings";

const preloadedState = {
    filters: initialFiltersState,
    images: initialImagesState,
    settings: initialSettingsState,
    userProfile: initialUserProfileState,
};

const rootReducer = combineReducers({
    alerts: alertsReducer,
    filters: filtersReducer,
    images: imagesReducer,
    settings: settingsReducer,
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
