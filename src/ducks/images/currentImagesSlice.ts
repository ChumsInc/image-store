import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {EditableImage} from "@/src/types";
import {
    loadAdditionalImage,
    loadImage,
    loadImages,
    removeAltItemCode,
    removeImage,
    saveAltItemCode,
    setImageActive,
    tagImage
} from "@/ducks/images/actions";
import {type RootState} from "@/app/configureStore";
import {selectAllActive} from "@/ducks/images/imageStatusSlice";

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
const currentImagesSlice = createSlice({
    name: 'currentImages',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        clearCurrentImage: (state) => {
            adapter.removeAll(state);
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
            .addCase(loadImage.pending, (state, action) => {
                adapter.setAll(state, [action.meta.arg]);
            })
            .addCase(loadImage.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                    return
                }
                adapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(loadAdditionalImage.pending, (state, action) => {
                adapter.setOne(state, action.meta.arg);
            })
            .addCase(loadAdditionalImage.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                    return
                }
                adapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(loadImages.fulfilled, (state, action) => {
                const idList = adapterSelectors.selectIds(state);
                adapter.setAll(state, action.payload.filter(img => idList.includes(img.filename)));
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
        selectCurrentImages: (state) => adapterSelectors.selectAll(state),
        selectAll: (state) => adapterSelectors.selectAll(state),
        selectCurrentImagesCount: (state) => adapterSelectors.selectTotal(state),
        selectCurrentImage: (state) => adapterSelectors.selectAll(state)[0] ?? null,
        selectCurrentFilename: (state) => adapterSelectors.selectAll(state)[0]?.filename ?? null,
        selectIsPreferredImage: (state) => adapterSelectors.selectAll(state)[0]?.preferred_image ?? false,
        selectById: (state, id: string) => adapterSelectors.selectById(state, id),
        selectIdList: (state) => adapterSelectors.selectIds(state),
    }
});

export const {
    selectCurrentImages,
    selectAll,
    selectCurrentImagesCount,
    selectCurrentImage,
    selectCurrentFilename,
    selectById,
    selectIdList
} = currentImagesSlice.selectors;

export const {
    clearCurrentImage,
    removeAdditionalImage,
    clearAdditionalImages,
} = currentImagesSlice.actions;

export const selectIsCurrentImage = createSelector(
    [(state: RootState) => state, (_, id: string) => id],
    (state, id) => {
        return !!selectById(state, id)
    }
)

export const selectMultipleBusy = createSelector(
    [selectIdList, selectAllActive],
    (idList, states) => {
        return states
            .filter(state => idList.includes(state.filename)).length > 0
    }
)
export default currentImagesSlice;
