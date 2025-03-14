import {configureStore} from '@reduxjs/toolkit';
import imageListSlice from '@/ducks/images/imageListSlice'
import {combineReducers} from "redux";
import {default as userProfileReducer} from '../ducks/userProfile';
import {default as settingsReducer} from "../ducks/settings";
import alertsReducer from "../ducks/alerts";
import currentImagesSlice from "@/ducks/images/currentImagesSlice";
import imageStatusSlice from "@/ducks/images/imageStatusSlice";
import baseSKUSlice from "@/ducks/filters/baseSKUSlice";
import productCategorySlice from "@/ducks/filters/productCategorySlice";
import productCollectionSlice from "@/ducks/filters/productCollectionSlice";
import productLineSlice from "@/ducks/filters/productLineSlice";
import filtersSlice from "@/ducks/filters/filtersSlice";

const rootReducer = combineReducers({
    alerts: alertsReducer,
    [baseSKUSlice.reducerPath]: baseSKUSlice.reducer,
    [productCategorySlice.reducerPath]: productCategorySlice.reducer,
    [productCollectionSlice.reducerPath]: productCollectionSlice.reducer,
    [productLineSlice.reducerPath]: productLineSlice.reducer,
    [filtersSlice.reducerPath]: filtersSlice.reducer,
    [imageListSlice.reducerPath]: imageListSlice.reducer,
    [currentImagesSlice.reducerPath]: currentImagesSlice.reducer,
    [imageStatusSlice.reducerPath]: imageStatusSlice.reducer,
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
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
