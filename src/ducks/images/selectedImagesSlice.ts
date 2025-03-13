import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EditableImage} from "@/src/types";
import {
    loadImage,
    loadImages,
    removeAltItemCode,
    removeImage,
    saveAltItemCode,
    setImageActive,
    tagImage
} from "@/ducks/images/actions";

const adapter = createEntityAdapter<EditableImage, string>({
    selectId: (arg) => arg.filename,
    sortComparer: (a, b) => a.filename.localeCompare(b.filename),
});

const adapterSelectors = adapter.getSelectors();

export interface SelectImagesExtraState {
    status: 'idle' | 'loading' | 'saving' | 'deleting';
}

const extraState: SelectImagesExtraState = {
    status: 'idle',
}
const selectedImagesSlice = createSlice({
    name: 'selected-images',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        addAdditionalImage: (state, action: PayloadAction<EditableImage>) => {
            adapter.setOne(state, action.payload);
        },
        removeAdditionalImage: (state, action: PayloadAction<string>) => {
            adapter.removeOne(state, action.payload);
        },
        clearAdditionalImages: (state) => {
            adapter.removeAll(state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadImages.fulfilled, (state, action) => {
                const idList = adapterSelectors.selectIds(state);
                adapter.setAll(state, action.payload.filter(img => idList.includes(img.filename)));
            })
            .addCase(loadImage.fulfilled, (state, action) => {
                if (action.payload && adapterSelectors.selectById(state, action.payload.filename)) {
                    adapter.setOne(state, action.payload);
                }
                if (action.meta.arg && adapterSelectors.selectById(state, action.meta.arg)) {
                    adapter.removeOne(state, action.meta.arg);
                }
            })
            .addCase(saveAltItemCode.fulfilled, (state, action) => {
                if (action.payload && adapterSelectors.selectById(state, action.payload.filename)) {
                    adapter.setOne(state, action.payload);
                }
            })
            .addCase(removeAltItemCode.fulfilled, (state, action) => {
                if (action.payload && adapterSelectors.selectById(state, action.payload.filename)) {
                    adapter.setOne(state, action.payload);
                }
                if (adapterSelectors.selectById(state, action.meta.arg.filename)) {
                    adapter.removeOne(state, action.meta.arg.filename);
                }
            })
            .addCase(tagImage.fulfilled, (state, action) => {
                if (action.payload && adapterSelectors.selectById(state, action.payload.filename)) {
                    adapter.setOne(state, action.payload);
                    return;
                }
                if (adapterSelectors.selectById(state, action.meta.arg.filename)) {
                    adapter.removeOne(state, action.meta.arg.filename);
                }
            })
            .addCase(removeImage.fulfilled, (state, action) => {
                adapter.removeOne(state, action.meta.arg);
            })
            .addCase(setImageActive.fulfilled, (state, action) => {
                if (action.payload && adapterSelectors.selectById(state, action.payload.filename)) {
                    adapter.setOne(state, action.payload);
                    return;
                }
                adapter.removeOne(state, action.meta.arg.filename);
            })
    },
    selectors: {
        selectSelectedForAction: (state) => adapterSelectors.selectAll(state),
        selectMultipleSaving: (state) => state.status === 'saving',
        selectShowSelectedImageActions: (state) => adapterSelectors.selectIds(state).length > 0,
    }
});

export const {
    selectSelectedForAction,
    selectMultipleSaving,
    selectShowSelectedImageActions
} = selectedImagesSlice.selectors;
export const {addAdditionalImage, removeAdditionalImage, clearAdditionalImages} = selectedImagesSlice.actions;
export default selectedImagesSlice;
