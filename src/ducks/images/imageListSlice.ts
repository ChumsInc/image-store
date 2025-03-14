import {EditableImage} from "../../types";
import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    loadImage,
    loadImages,
    removeAltItemCode,
    removeImage,
    saveAltItemCode,
    saveImage,
    setImageActive,
    tagImage
} from "./actions";
import {SortProps} from "chums-types";
import {selectSearch, selectShowOnlyUnassigned} from "@/ducks/filters/filtersSlice";

const imagesAdapter = createEntityAdapter<EditableImage, string>({
    selectId: (arg) => arg.filename,
    sortComparer: (a, b) => a.filename.localeCompare(b.filename),
})

const imagesSelectors = imagesAdapter.getSelectors();

export interface ImagesState {
    status: 'idle' | 'loading' | 'rejected';
    current: EditableImage | null;
    sort: SortProps<EditableImage>;
}

export const extraState: ImagesState = {
    status: 'idle',
    current: null,
    sort: {field: 'filename', ascending: true},
}

const imagesSlice = createSlice({
    name: 'image-list',
    initialState: imagesAdapter.getInitialState(extraState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadImages.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(loadImages.fulfilled, (state, action) => {
                state.status = 'idle';
                imagesAdapter.setAll(state, action.payload);
            })
            .addCase(loadImages.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(loadImage.fulfilled, (state, action) => {
                if (action.payload) {
                    imagesAdapter.setOne(state, action.payload);
                    return;
                }
                imagesAdapter.removeOne(state, action.meta.arg.filename)
            })
            .addCase(saveImage.fulfilled, (state, action) => {
                if (action.payload) {
                    imagesAdapter.setOne(state, action.payload)
                    return;
                }
                imagesAdapter.removeOne(state, action.meta.arg.filename);
            })

            .addCase(saveAltItemCode.fulfilled, (state, action) => {
                if (action.payload) {
                    imagesAdapter.setOne(state, action.payload);
                    return;
                }
                imagesAdapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(removeAltItemCode.fulfilled, (state, action) => {
                if (action.payload) {
                    imagesAdapter.setOne(state, action.payload);
                    return;
                }
                imagesAdapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(removeAltItemCode.rejected, (state) => {
                if (state.current) {
                    state.current.saving = false;
                }
            })
            .addCase(tagImage.fulfilled, (state, action) => {
                if (action.payload) {
                    imagesAdapter.setOne(state, action.payload);
                    return;
                }
                imagesAdapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(removeImage.fulfilled, (state, action) => {
                imagesAdapter.removeOne(state, action.meta.arg);
            })

            .addCase(setImageActive.fulfilled, (state, action) => {
                if (action.payload) {
                    imagesAdapter.setOne(state, action.payload);
                    return;
                }
                imagesAdapter.removeOne(state, action.meta.arg.filename);
            })
    },
    selectors: {
        selectImageList: (state) => imagesSelectors.selectAll(state),
        selectImagesStatus: (state) => state.status,
    }
})

export const {selectImageList, selectImagesStatus} = imagesSlice.selectors;


export const selectFilteredImages = createSelector(
    [selectImageList, selectSearch, selectShowOnlyUnassigned],
    (list, search, showOnlyUnassigned) => {
        let reSearch = /^/;
        try {
            reSearch = new RegExp(search, 'i');
        } catch (err: unknown) {
        }
        return list
            .filter(img => !search
                || reSearch.test(img.ItemCode ?? '')
                || reSearch.test(img.filename)
                || img.item_codes?.map(item => item.item_code).includes(search)
            )
            .filter(img => !showOnlyUnassigned || !(img.ItemCode || img.item_codes?.length))
    }
);


export default imagesSlice;
