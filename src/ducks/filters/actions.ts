import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchFilters} from "../../api/filters";
import {LoadFiltersResult} from "../../types";
import {RootState} from "../../app/configureStore";
import {selectFiltersLoading} from "./selectors";


export const setBaseSKU = createAction<string>(`filters/set-filter/setBaseSKU`);
export const setProductCategory = createAction<string>(`filters/set-filter/setProductCategory`);
export const setProductCollection = createAction<string>(`filters/set-filter/setProductCollection`);
export const setProductLine = createAction<string | null>(`filters/set-filter/setProductLine`);
export const toggleFeaturedImage = createAction<boolean | undefined>(`filters/set-filter/toggleFeaturedImage`);
export const toggleActiveProducts = createAction<boolean | undefined>(`filters/set-filter/toggleActiveProducts`);
export const toggleActiveImages = createAction<boolean | undefined>(`filters/set-filter/toggleActiveImages`);
export const toggleAssigned = createAction<boolean | undefined>(`filters/set-filter/toggleAssigned`);
export const toggleFilterBar = createAction<boolean | undefined>(`filters/toggleFilterBar`);
export const setSearch = createAction<string>(`filters/set-filter/search`);
//@TODO: set page to 1 on updating search.

export const loadFilters = createAsyncThunk<LoadFiltersResult, void, {state:RootState}>(
    'filters/load',
    async () => {
        return await fetchFilters();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectFiltersLoading(state);
        }
    }
);
