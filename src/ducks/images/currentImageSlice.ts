import {createSlice} from "@reduxjs/toolkit";
import {EditableImage} from "@/src/types";
import {
    loadImage,
    loadImages,
    removeAltItemCode,
    removeImage,
    saveImage,
    setImageActive,
    tagImage
} from "@/ducks/images/actions";


export interface CurrentImageState {
    filename: string|null;
    current: EditableImage | null;
}

const initialState: CurrentImageState = {
    filename: null,
    current: null,
}

const currentImageSlice = createSlice({
    name: 'current-image',
    initialState: initialState,
    reducers: {
        clearCurrentImage: (state) => {
            state.filename = null;
            state.current = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadImages.fulfilled, (state, action) => {
                const [current] = action.payload.filter(img => img.filename === state.current?.filename);
                state.current = current ?? null;
            })
            .addCase(loadImage.pending, (state, action) => {
                if (state.filename !== action.meta.arg) {
                    state.filename = action.meta.arg;
                }
            })
            .addCase(loadImage.fulfilled, (state, action) => {
                state.filename = action.payload?.filename ?? null;
                state.current = action.payload;
            })
            .addCase(saveImage.fulfilled, (state, action) => {
                state.filename = action.payload?.filename ?? null;

                state.current = action.payload;
            })
            .addCase(removeAltItemCode.fulfilled, (state, action) => {
                if (state.current?.filename === action.meta.arg.filename) {
                    state.filename = action.payload?.filename ?? null;
                    state.current = action.payload;
                }
            })
            .addCase(tagImage.fulfilled, (state, action) => {
                if (state.current?.filename === action.meta.arg.filename) {
                    state.filename = action.payload?.filename ?? null;
                    state.current = action.payload;
                }
            })
            .addCase(removeImage.fulfilled, (state, action) => {
                if (state.current?.filename === action.meta.arg) {
                    state.filename = null;
                    state.current = null;
                }
            })
            .addCase(setImageActive.fulfilled, (state, action) => {
                if (state.current?.filename === action.meta.arg.filename) {
                    state.filename = action.payload?.filename ?? null;
                    state.current = action.payload;
                }
            })


    },
    selectors: {
        selectCurrentImage: (state) => state.current,
        selectCurrentFilename: (state) => state.filename,
        selectIsPreferredImage: (state) => state.current?.preferred_image ?? false,
        selectHasCurrentImage: (state) => state.current !== null,
    }
})

export const {clearCurrentImage} = currentImageSlice.actions;
export const {selectCurrentImage, selectIsPreferredImage, selectCurrentFilename, selectHasCurrentImage} = currentImageSlice.selectors;


export default currentImageSlice;
