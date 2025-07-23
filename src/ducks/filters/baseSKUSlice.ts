import {createEntityAdapter, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {BaseSKUSearch} from "chums-types";
import {loadFilters} from "@/ducks/filters/actions";
import type {FilterExtraState} from "@/src/types";

const adapter = createEntityAdapter<BaseSKUSearch, string>({
    selectId: (arg) => arg.Category4,
    sortComparer: (a, b) => a.Category4.localeCompare(b.Category4),
})

const selectors = adapter.getSelectors();

const extraState = (): FilterExtraState => {
    const params = new URLSearchParams(window.location.search);
    return {
        value: params.get('baseSKU') ?? '',
    }
}

const baseSKUSlice = createSlice({
    name: 'baseSKU',
    initialState: adapter.getInitialState(extraState()),
    reducers: {
        setBaseSKU: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.baseSKUs);
                if (state.value) {
                    state.value = selectors.selectById(state, state.value)?.Category4 ?? '';
                }
            })
    },
    selectors: {
        selectBaseSKU: (state) => state.value,
        selectBaseSKUs: (state) => selectors.selectAll(state),
        selectBaseSKUByID: (state, value: string) => selectors.selectById(state, value),
    }
});

export const {setBaseSKU} = baseSKUSlice.actions;
export const {selectBaseSKU, selectBaseSKUByID, selectBaseSKUs} = baseSKUSlice.selectors;

export default baseSKUSlice;
