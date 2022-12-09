import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {BaseSKU, ProductCategory, ProductCollection, ProductLine} from "chums-types";
import {fetchFilters} from "../../api/filters";
import {LoadFiltersResult} from "../../types";

export const typePrefix = `productFilters`;
export const fetchFiltersPrefix = `${typePrefix}/fetchFilters`;

export const setBaseSKU = createAction<string>(`${typePrefix}/set-filter/setBaseSKU`);
export const setProductCategory = createAction<string>(`${typePrefix}/set-filter/setProductCategory`);
export const setProductCollection = createAction<string>(`${typePrefix}/set-filter/setProductCollection`);
export const setProductLine = createAction<string|null>(`${typePrefix}/set-filter/setProductLine`);
export const toggleFeaturedImage = createAction<boolean | undefined>(`${typePrefix}/set-filter/toggleFeaturedImage`);
export const toggleActive = createAction<boolean | undefined>(`${typePrefix}/set-filter/toggleActive`);
export const toggleAssigned = createAction<boolean | undefined>(`${typePrefix}/set-filter/toggleAssigned`);
export const toggleFilterBar = createAction<boolean|undefined>(`${typePrefix}/toggleFilterBar`);
export const setSearch = createAction<string>(`${typePrefix}/set-filter/search`);
//@TODO: set page to 1 on updating search.

export const loadFilters = createAsyncThunk<LoadFiltersResult>(
    fetchFiltersPrefix,
    async (arg, thunkAPI) => {
        const {baseSKUs = [], categories = [], collections = [], productLines = []} = await fetchFilters();
        return {baseSKUs, categories, collections, productLines};
    },
);
