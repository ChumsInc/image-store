import {EditableImage} from "../../types";
import {createReducer} from "@reduxjs/toolkit";
import {
    clearAdditionalImages,
    loadImages, removeAltItemCode,
    removeImage,
    saveAltItemCode,
    saveImage,
    selectAdditionalImage,
    setCurrentImage,
    tagImage
} from "./actions";
import {imageSort, isSavingReducer} from "./utils";
import {SortProps} from "chums-components";

export interface ImagesState {
    list: EditableImage[],
    loading: boolean;
    loaded: boolean;
    current: EditableImage | null;
    sort: SortProps<EditableImage>;
    selected: {
        list: EditableImage[];
        saving: boolean;
    };
}

export const initialImagesState: ImagesState = {
    list: [],
    loading: false,
    loaded: false,
    current: null,
    sort: {field: 'filename', ascending: true},
    selected: {
        list: [],
        saving: false,
    }
}

const listReducer = (list: EditableImage[], filename?: string, image?: EditableImage | null): EditableImage[] => {
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
        .addCase(selectAdditionalImage, (state, action) => {
            if (state.selected.list.map(img => img.filename).includes(action.payload.filename)) {
                state.selected.list = state.selected.list.filter(img => img.filename !== action.payload.filename);
            } else {
                state.selected.list.push(action.payload);
            }
        })
        .addCase(clearAdditionalImages, (state) => {
            state.selected.list = [];
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
            if (state.selected.list.map(img => img.filename).includes(action.meta.arg.filename)) {
                const [image] = state.selected.list.filter(img => img.filename === action.meta.arg.filename);
                state.selected.list = listReducer(state.selected.list, action.meta.arg.filename, {
                    ...image,
                    saving: true
                }).sort(imageSort(state.sort));
                state.selected.saving = state.selected.list.reduce(isSavingReducer, false);
            }

        })
        .addCase(saveAltItemCode.fulfilled, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current = action.payload;
            }
            if (state.selected.list.map(img => img.filename).includes(action.meta.arg.filename)) {
                const [image] = state.selected.list.filter(img => img.filename === action.meta.arg.filename);
                state.selected.list = listReducer(state.selected.list, action.meta.arg.filename, action.payload).sort(imageSort(state.sort));
                state.selected.saving = state.selected.list.reduce(isSavingReducer, false);
            }
            state.list = listReducer(state.list, action.meta.arg.filename, action.payload);
        })
        .addCase(saveAltItemCode.rejected, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current.saving = false;
            }
            if (state.selected.list.map(img => img.filename).includes(action.meta.arg.filename)) {
                const [image] = state.selected.list.filter(img => img.filename === action.meta.arg.filename);
                state.selected.list = listReducer(state.selected.list, action.meta.arg.filename, {
                    ...image,
                    saving: false
                }).sort(imageSort(state.sort));
                state.selected.saving = state.selected.list.reduce(isSavingReducer, false);
            }
        })
        .addCase(removeAltItemCode.pending, (state) => {
            if (state.current) {
                state.current.saving = true;
            }
        })
        .addCase(removeAltItemCode.fulfilled, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current = action.payload;
            }
            state.list = listReducer(state.list, action.meta.arg.filename, action.payload);
        })
        .addCase(removeAltItemCode.rejected, (state) => {
            if (state.current) {
                state.current.saving = false;
            }
        })
        .addCase(tagImage.pending, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current.saving = true;
            }
            if (state.selected.list.map(img => img.filename).includes(action.meta.arg.filename)) {
                const [image] = state.selected.list.filter(img => img.filename === action.meta.arg.filename);
                state.selected.list = listReducer(state.selected.list, action.meta.arg.filename, {
                    ...image,
                    saving: true
                }).sort(imageSort(state.sort));
                state.selected.saving = state.selected.list.reduce(isSavingReducer, false);
            }
        })
        .addCase(tagImage.fulfilled, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current = action.payload;
            }
            if (state.selected.list.map(img => img.filename).includes(action.meta.arg.filename)) {
                state.selected.list = listReducer(state.selected.list, action.meta.arg.filename, action.payload).sort(imageSort(state.sort));
                state.selected.saving = state.selected.list.reduce(isSavingReducer, false);
            }
            state.list = listReducer(state.list, action.meta.arg.filename, action.payload).sort(imageSort(state.sort));
        })
        .addCase(tagImage.rejected, (state, action) => {
            if (state.current && state.current.filename === action.meta.arg.filename) {
                state.current.saving = false;
            }
            if (state.selected.list.map(img => img.filename).includes(action.meta.arg.filename)) {
                const [image] = state.selected.list.filter(img => img.filename === action.meta.arg.filename);
                state.selected.list = listReducer(state.selected.list, action.meta.arg.filename, {
                    ...image,
                    saving: false
                }).sort(imageSort(state.sort));
                state.selected.saving = state.selected.list.reduce(isSavingReducer, false);
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
