import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {ProductAltItem, ProductImage} from "chums-types";
import {
    deleteAltItemCode,
    deleteImage,
    deleteImageTag,
    fetchImage,
    fetchImages,
    postAltItemCode,
    postPreferredImage,
    postTagImage, putImageActive,
    putImageUpdate
} from "../../api/image";
import {ProductFilter} from "../filters";
import {EditableImage, ProductAltItemKey} from "../../types";
import {RootState} from "../../app/configureStore";
import {selectCurrentLoading, selectCurrentSaving, selectImagesLoading} from "./selectors";
import {TagImageArgs} from "./types";

export const setCurrentImage = createAsyncThunk<ProductImage | null, string|null, {state:RootState}>(
    'images/setCurrent',
    async (arg) => {
        return await fetchImage(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectCurrentLoading(state);
        }
    }
)

export const loadImages = createAsyncThunk<ProductImage[], ProductFilter, {state:RootState}>(
    'images/load',
    async (arg) => {
        return await fetchImages(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectImagesLoading(state);
        }
    }
)

export const tagImage = createAsyncThunk<ProductImage | null, TagImageArgs, {state:RootState}>(
    'images/tagImage',
    async (arg) => {
        if (arg.action === 'untag') {
            return await deleteImageTag(arg.filename, arg.tag);
        }
        return await postTagImage(arg.filename, arg.tag);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectCurrentSaving(state);
        }
    }
)

export const saveImage = createAsyncThunk<ProductImage | null, Partial<ProductImage>, {state:RootState}>(
    'images/saveImage',
    async (arg) => {
        if (arg.item_code && arg.filename && arg.preferred_image) {
            return await postPreferredImage(arg.filename, arg.item_code);
        }
        return await putImageUpdate(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectCurrentSaving(state);
        }
    }
)

export const saveAltItemCode = createAsyncThunk<ProductImage|null, ProductAltItemKey, {state:RootState}>(
    'images/saveAltItemCode',
    async (arg, thunkAPI) => {
        return postAltItemCode(arg.filename, arg.item_code);
    }
    ,
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectCurrentSaving(state);
        }
    }
);

export const removeAltItemCode = createAsyncThunk<ProductImage|null, ProductAltItemKey, {state:RootState}>(
    'images/removeAltItemCode',
    async (arg) => {
        return deleteAltItemCode(arg.filename, arg.item_code);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectCurrentSaving(state);
        }
    }
)

export const removeImage = createAsyncThunk<ProductImage[], string, {state:RootState}>(
    'images/removeImage',
    async (arg) => {
        return await deleteImage(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectCurrentSaving(state);
        }
    }
)

export const addAdditionalImage = createAction<EditableImage>('images/selected/selectImage');
export const clearAdditionalImages = createAction('images/selected/clear');

export const setImageActive = createAsyncThunk<ProductImage|null, Partial<ProductImage>, {state:RootState}>(
    'images/saveActive',
    async (arg) => {
        return await putImageActive(arg.filename, arg.active)
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectCurrentSaving(state);
        }
    }
)

export const setSearch = createAction<string>(`images/filters/search`);
export const toggleFilterUnassigned = createAction<boolean | undefined>(`images/filter/toggleFilterUnassigned`);
