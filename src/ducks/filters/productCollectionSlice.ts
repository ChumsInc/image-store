import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductCollection} from "chums-types";
import {loadFilters} from "@/ducks/filters/actions";
import {FilterExtraState} from "@/src/types";

const adapter = createEntityAdapter<ProductCollection, string>({
    selectId: (arg) => arg.Category3,
    sortComparer: (a, b) => a.Category3.localeCompare(b.Category3),
})

const selectors = adapter.getSelectors();

const extraState = ():FilterExtraState => {
    const params = new URLSearchParams(window.location.search);
    return {
        value: params.get('collection') ?? '',
    }
}

const productCollectionSlice = createSlice({
    name: 'productCollection',
    initialState: adapter.getInitialState(extraState()),
    reducers: {
        setProductCollection: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.collections);
                if (state.value) {
                    state.value = selectors.selectById(state, state.value)?.Category3 ?? '';
                }
            })
    },
    selectors: {
        selectCollection: (state) => state.value,
        selectCollections: (state) => selectors.selectAll(state),
        selectCollectionByID: (state, value: string) => selectors.selectById(state, value),
    }
});

export const {setProductCollection} = productCollectionSlice.actions;
export const {selectCollection, selectCollectionByID, selectCollections} = productCollectionSlice.selectors;

export default productCollectionSlice;
