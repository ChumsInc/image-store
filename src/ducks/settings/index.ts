import {getPreference, localStorageKeys} from "../../api/preferences";
import {createAction, createReducer} from "@reduxjs/toolkit";
import {RootState} from "../../app/configureStore";
import {ImageSizePath} from "chums-types/product-image";

export interface SettingsState {
    imagesPerPage: number;
    page: number;
    imagePath: ImageSizePath;
}

export const initialSettingsState:SettingsState = {
    imagesPerPage: getPreference(localStorageKeys.imagesPerPage, 10),
    page: 0,
    imagePath: '250',
}

export const setImagesPerPage = createAction<number>('settings/imagesPerPage');
export const setPage = createAction<number>('settings/page');
export const setImagePath = createAction<ImageSizePath>('settings/imagePath');

export const selectImagesPerPage = (state:RootState) => state.settings.imagesPerPage;
export const selectPage = (state:RootState) => state.settings.page;
export const selectImagePath = (state:RootState) => state.settings.imagePath;

const settingsReducer = createReducer(initialSettingsState, (builder) => {
    builder
        .addCase(setImagesPerPage, (state, action) => {
            state.imagesPerPage = action.payload;
            state.page = 0;
        })
        .addCase(setPage, (state, action) => {
            state.page = action.payload;
        })
        .addCase(setImagePath, (state, action) => {
            state.imagePath = action.payload;
        });
});

export default settingsReducer;
