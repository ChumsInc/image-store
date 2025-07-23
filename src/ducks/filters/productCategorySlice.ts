import {createEntityAdapter, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {ProductCategory} from "chums-types";
import {loadFilters} from "@/ducks/filters/actions";
import type {FilterExtraState} from "@/src/types";

const adapter = createEntityAdapter<ProductCategory, string>({
    selectId: (arg) => arg.Category2,
    sortComparer: (a, b) => a.Category2.localeCompare(b.Category2),
})

const selectors = adapter.getSelectors();

const extraState = (): FilterExtraState => {
    const params = new URLSearchParams(window.location.search);
    return {
        value: params.get('cat') ?? '',
    }
}

const productCategorySlice = createSlice({
    name: 'productCategory',
    initialState: adapter.getInitialState(extraState()),
    reducers: {
        setProductCategory: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFilters.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.categories);
                if (state.value) {
                    state.value = selectors.selectById(state, state.value)?.Category2 ?? '';
                }
            })
    },
    selectors: {
        selectCategory: (state) => state.value,
        selectCategories: (state) => selectors.selectAll(state),
        selectCategoryByID: (state, value: string) => selectors.selectById(state, value),
    }
});

export const {setProductCategory} = productCategorySlice.actions;
export const {selectCategory, selectCategoryByID, selectCategories} = productCategorySlice.selectors;

export default productCategorySlice;
