import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {
    loadAdditionalImage,
    loadImage,
    loadImages,
    removeAltItemCode,
    removeImage,
    saveAltItemCode,
    saveImage, setImageActive,
    tagImage
} from "@/ducks/images/actions";
import {ImageStatus} from "@/ducks/images/types";

export interface ImageStatusEntry {
    filename: string;
    status: ImageStatus;
}
const adapter = createEntityAdapter<ImageStatusEntry, string>({
    selectId: (arg) => arg.filename,
    sortComparer: (a, b) => a.filename.localeCompare(b.filename),
});

const adapterSelectors = adapter.getSelectors();

const imageStatusSlice = createSlice({
    name: 'image-status',
    initialState: adapter.getInitialState(),
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadImages.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.map(file => ({filename: file.filename, status: 'idle'})));
            })
            .addCase(loadImage.pending, (state, action) => {
                adapter.upsertOne(state, {filename: action.meta.arg.filename, status: 'loading'});
            })
            .addCase(loadImage.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.updateOne(state, {id: action.payload.filename, changes: {status: 'idle'}})
                    return;
                }
                adapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(loadImage.rejected, (state, action) => {
                adapter.upsertOne(state, {filename: action.meta.arg.filename, status: 'idle'});
            })
            .addCase(loadAdditionalImage.pending, (state, action) => {
                adapter.upsertOne(state, {filename: action.meta.arg.filename, status: 'loading'});
            })
            .addCase(loadAdditionalImage.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.updateOne(state, {id: action.payload.filename, changes: {status: 'idle'}})
                    return;
                }
                adapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(loadAdditionalImage.rejected, (state, action) => {
                adapter.upsertOne(state, {filename: action.meta.arg.filename, status: 'idle'});
            })
            .addCase(saveImage.pending, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg.filename, changes: {status: 'saving'}})
            })
            .addCase(saveImage.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, {filename: action.payload.filename, status: 'idle'});
                    return;
                }
                adapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(saveImage.rejected, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg.filename, changes: {status: 'idle'}})
            })
            .addCase(saveAltItemCode.pending, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg.filename, changes: {status: 'saving'}})
            })
            .addCase(saveAltItemCode.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, {filename: action.payload.filename, status: 'idle'});
                    return;
                }
                adapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(saveAltItemCode.rejected, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg.filename, changes: {status: 'idle'}})
            })
            .addCase(removeAltItemCode.pending, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg.filename, changes: {status: 'saving'}})
            })
            .addCase(removeAltItemCode.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, {filename: action.payload.filename, status: 'idle'});
                    return;
                }
                adapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(removeAltItemCode.rejected, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg.filename, changes: {status: 'idle'}})
            })
            .addCase(tagImage.pending, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg.filename, changes: {status: 'saving'}})
            })
            .addCase(tagImage.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, {filename: action.payload.filename, status: 'idle'});
                    return;
                }
                adapter.removeOne(state, action.meta.arg.filename);
            })
            .addCase(removeImage.pending, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg, changes: {status: 'deleting'}});
            })
            .addCase(removeImage.fulfilled, (state, action) => {
                adapter.removeOne(state, action.meta.arg);
            })
            .addCase(removeImage.rejected, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg, changes: {status: 'idle'}});
            })
            .addCase(setImageActive.pending, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg.filename, changes: {status: 'saving'}});
            })
            .addCase(setImageActive.fulfilled, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg.filename, changes: {status: 'idle'}});
            })
            .addCase(setImageActive.rejected, (state, action) => {
                adapter.updateOne(state, {id: action.meta.arg.filename, changes: {status: 'idle'}});
            })
    },
    selectors: {
        selectStatusById: (state, id: string) => adapterSelectors.selectById(state, id)?.status ?? 'idle',
        selectAllActive: (state) => adapterSelectors.selectAll(state).filter(item => item.status !== 'idle'),
    }
})

export const {selectStatusById, selectAllActive} = imageStatusSlice.selectors;

export default imageStatusSlice;
