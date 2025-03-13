import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchFilters} from "./api";
import {LoadFiltersResult} from "../../types";
import {RootState} from "../../app/configureStore";
import {urlSearchParamsToFilter} from "./utils";
import {selectFiltersStatus} from "@/ducks/filters/filtersSlice";


export const setBaseSKU = createAction<string>(`filters/set-filter/setBaseSKU`);
export const setProductCategory = createAction<string>(`filters/set-filter/setProductCategory`);
export const setProductCollection = createAction<string>(`filters/set-filter/setProductCollection`);
export const setProductLine = createAction<string | null>(`filters/set-filter/setProductLine`);
export const toggleFeaturedImage = createAction<boolean | undefined>(`filters/set-filter/toggleFeaturedImage`);
export const toggleInactiveProducts = createAction<boolean | undefined>(`filters/set-filter/toggleInactiveProducts`);
export const toggleInactiveImages = createAction<boolean | undefined>(`filters/set-filter/toggleInactiveImages`);
export const toggleFilterBar = createAction<boolean | undefined>(`filters/toggleFilterBar`);


export const setFiltersFromSearchParams = createAction('filters/set-filter', (params: URLSearchParams) => {
    return {
        payload: urlSearchParamsToFilter(params)
    }
})
//@TODO: set page to 1 on updating search.

export const loadFilters = createAsyncThunk<LoadFiltersResult, void, { state: RootState }>(
    'filters/load',
    async () => {
        return await fetchFilters();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectFiltersStatus(state) === 'idle'
        }
    }
);
