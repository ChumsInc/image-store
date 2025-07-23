import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ProductImage} from "chums-types";
import {
    deleteAltItemCode,
    deleteImage,
    deleteImageTag,
    fetchImage,
    fetchImages,
    postAltItemCode,
    postPreferredImage,
    postTagImage,
    putImageActive,
    putImageUpdate
} from "@/api/image";
import {type ProductFilter} from "../filters";
import {type ProductAltItemKey} from "../../types";
import {type RootState} from "@/app/configureStore";
import {type TagImageArgs} from "./types";
import {selectStatusById} from "@/ducks/images/imageStatusSlice";
import {selectImagesStatus} from "@/ducks/images/imageListSlice";

export const loadImage = createAsyncThunk<ProductImage | null, ProductImage, { state: RootState }>(
    'images/loadImage',
    async (arg) => {
        return await fetchImage(arg.filename);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !arg || selectStatusById(state, arg.filename) === 'idle';
        }
    }
)

export const loadAdditionalImage = createAsyncThunk<ProductImage | null, ProductImage, { state: RootState }>(
    'images/loadAdditionalImage',
    async (arg) => {
        return await fetchImage(arg.filename);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !arg || selectStatusById(state, arg.filename) === 'idle';
        }
    }
)

export const loadImages = createAsyncThunk<ProductImage[], ProductFilter, { state: RootState }>(
    'images/loadImages',
    async (arg) => {
        return await fetchImages(arg);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectImagesStatus(state) === 'idle';
        }
    }
)

export const tagImage = createAsyncThunk<ProductImage | null, TagImageArgs, { state: RootState }>(
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
            return selectStatusById(state, arg.filename) === 'idle'
        }
    }
)

export const saveImage = createAsyncThunk<ProductImage | null, Partial<ProductImage> & Pick<ProductImage, 'filename'>, {
    state: RootState
}>(
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
            return selectStatusById(state, arg.filename) === 'idle'
        }
    }
)

export const saveAltItemCode = createAsyncThunk<ProductImage | null, ProductAltItemKey, { state: RootState }>(
    'images/saveAltItemCode',
    async (arg) => {
        return postAltItemCode(arg.filename, arg.item_code);
    }
    ,
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectStatusById(state, arg.filename) === 'idle'
        }
    }
);

export const removeAltItemCode = createAsyncThunk<ProductImage | null, ProductAltItemKey, { state: RootState }>(
    'images/removeAltItemCode',
    async (arg) => {
        return deleteAltItemCode(arg.filename, arg.item_code);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectStatusById(state, arg.filename) === 'idle'
        }
    }
)

export const removeImage = createAsyncThunk<ProductImage[], string, { state: RootState }>(
    'images/removeImage',
    async (arg) => {
        return await deleteImage(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectStatusById(state, arg) === 'idle'
        }
    }
)

export const setImageActive = createAsyncThunk<ProductImage | null, Partial<ProductImage> & Pick<ProductImage, 'filename'>, {
    state: RootState
}>(
    'images/saveActive',
    async (arg) => {
        return await putImageActive(arg.filename, arg.active)
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectStatusById(state, arg.filename) === 'idle'
        }
    }
)
