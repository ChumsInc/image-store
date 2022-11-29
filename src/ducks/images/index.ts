import {EditableImage} from "../../types";
import {AnyAction, createReducer} from "@reduxjs/toolkit";
import {loadImages, setCurrentImage, saveImage, tagImage, saveAltItemCode, removeImage} from "./actions";
import {imageSort} from "./utils";
import {SortProps} from "chums-components";

export interface ImagesState {
    list: EditableImage[],
    loading: boolean;
    loaded: boolean;
    current: EditableImage | null;
    sort: SortProps<EditableImage>;
    selectedForAction: {
        list: string[];
        saving: boolean;
    };
}

export const initialImagesState: ImagesState = {
    list: [],
    loading: false,
    loaded: false,
    current: null,
    sort: {field: 'filename', ascending: true},
    selectedForAction: {
        list: [],
        saving: false,
    }
}

const listReducer = (list:EditableImage[], filename?:string, image?:EditableImage|null):EditableImage[] => {
    const newList = [
        ...list.filter(img => img.filename !== filename),
    ];
    if (image) {
        return [...newList, image]
    }
    return newList;
}

const imagesReducer = createReducer(initialImagesState, (builder) => {
    builder
        .addCase(loadImages.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loadImages.fulfilled, (state, action) => {
            state.loading = false;
            state.loaded = true;
            state.list = action.payload.sort(imageSort(state.sort));
        })
        .addCase(loadImages.rejected, (state) => {
            state.loading = false;
        })
        .addCase(setCurrentImage.pending, (state, action) => {
            const [current] = state.list.filter(img => img.filename === action.meta.arg);
            state.current = current ?? null;
            if (current) {
                state.current.loading = true;
            }
        })
        .addCase(setCurrentImage.fulfilled, (state, action) => {
            state.current = action.payload;
            state.list = listReducer(state.list, action.payload?.filename, action.payload)
                .sort(imageSort(state.sort));
        })
        .addCase(saveImage.pending, (state, action) => {
            if (state.current && state.current?.filename === action.meta.arg?.filename) {
                state.current.saving = true;
            }
        })
        .addCase(saveImage.fulfilled, (state, action) => {
            if (state.current && state.current?.filename === action.meta.arg?.filename) {
                state.current = action.payload;
            }
            if (action.meta.arg.preferred_image !== undefined) {
                state.list.filter(img => img.item_code === action.payload?.item_code).forEach(img => img.preferred_image = false);
            }
            state.list = listReducer(state.list, action.payload?.filename, action.payload)
                .sort(imageSort(state.sort))
        })
        .addCase(saveImage.rejected, (state, action) => {
            if (state.current && state.current?.filename === action.meta.arg?.filename) {
                state.current.saving = false;
            }
        })
        .addCase(saveAltItemCode.pending, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current.saving = true;
            }
        })
        .addCase(saveAltItemCode.fulfilled, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current.saving = false;
                state.current.item_codes = action.payload;
            }
        })
        .addCase(saveAltItemCode.rejected, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current.saving = false;
            }
        })
        .addCase(tagImage.pending, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current.saving = true;
            }
        })
        .addCase(tagImage.fulfilled, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current = action.payload;
            }
            state.list = listReducer(state.list, action.meta.arg.filename, action.payload).sort(imageSort(state.sort));
        })
        .addCase(tagImage.rejected, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current.saving = false;
            }
        })
        .addCase(removeImage.pending, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg) {
                state.current.saving = true;
            }
        })
        .addCase(removeImage.fulfilled, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg) {
                state.current = null;
            }
            state.list = listReducer(state.list, action.meta.arg);
        })
        .addCase(removeImage.rejected, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg) {
                state.current.saving = false;
            }
        })
});

export default imagesReducer;
