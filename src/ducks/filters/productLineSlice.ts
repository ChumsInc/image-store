import {createEntityAdapter, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ProductLine} from "chums-types";
import {loadFilters} from "@/ducks/filters/actions";
import type {FilterExtraState} from "@/src/types";

const adapter = createEntityAdapter<ProductLine, string>({
    selectId: (arg) => arg.ProductLine,
    sortComparer: (a, b) => a.ProductLine.localeCompare(b.ProductLine),
})

const selectors = adapter.getSelectors();

const extraState = (): FilterExtraState => {
    const params = new URLSearchParams(window.location.search);
    return {
        value: params.get('pl') ?? '',
    }
}

const productLineSlice = createSlice({
    name: 'productLine',
    initialState: adapter.getInitialState(extraState()),
    reducers: {
        setProductLine: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.productLines);
                if (state.value) {
                    state.value = selectors.selectById(state, state.value)?.ProductLine ?? '';
                }
            })
    },
    selectors: {
        selectProductLine: (state) => state.value,
        selectProductLines: (state) => selectors.selectAll(state),
    }
});

export const {setProductLine} = productLineSlice.actions;
export const {selectProductLine, selectProductLines} = productLineSlice.selectors;

export default productLineSlice;
