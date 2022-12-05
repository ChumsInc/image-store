import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {ProductAltItem, ProductImage} from "chums-types/product-image";
import {
    deleteAltItemCode,
    deleteImage,
    deleteImageTag,
    fetchImage,
    fetchImages,
    postAltItemCode,
    postPreferredImage,
    postTagImage,
    putImageUpdate
} from "../../api/image";
import {ProductFilter} from "../filters";
import {EditableImage, ProductAltItemKey} from "../../types";

export const setCurrentImage = createAsyncThunk<ProductImage | null, string|null>(
    'images/setCurrent',
    async (arg, thunkApi) => {
        return await fetchImage(arg);
    }
)
export const loadImages = createAsyncThunk<ProductImage[], ProductFilter>(
    'images/load',
    async (arg, thunkApi) => {
        return await fetchImages(arg);
    }
)
export const tagImage = createAsyncThunk<ProductImage | null, { tag: string, filename: string, action?: 'tag' | 'untag' }>(
    'images/tagImage',
    async (arg, thunkApi) => {
        if (arg.action === 'untag') {
            return await deleteImageTag(arg.filename, arg.tag);
        }
        return await postTagImage(arg.filename, arg.tag);
    }
)

export const saveImage = createAsyncThunk<ProductImage | null, Partial<ProductImage>>(
    'images/saveImage',
    async (arg) => {
        if (arg.item_code && arg.filename && arg.preferred_image) {
            return await postPreferredImage(arg.filename, arg.item_code);
        }
        return await putImageUpdate(arg);
    }
)

export const saveAltItemCode = createAsyncThunk<ProductImage|null, ProductAltItemKey>(
    'images/saveAltItemCode',
    async (arg, thunkAPI) => {
        if (!arg.item_code) {
            return deleteAltItemCode(arg.filename, arg.item_code);
        }
        return postAltItemCode(arg.filename, arg.item_code);
    }
)

export const removeImage = createAsyncThunk<ProductImage[], string>(
    'images/removeImage',
    async (arg) => {
        return await deleteImage(arg);
    }
)

export const selectAdditionalImage = createAction<EditableImage>('images/selected/selectImage');
export const clearAdditionalImages = createAction('images/selected/clear');
