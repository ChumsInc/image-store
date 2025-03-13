import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchFilters} from "./api";
import {LoadFiltersResult} from "../../types";
import {RootState} from "@/app/configureStore";
import {selectFiltersStatus} from "@/ducks/filters/filtersSlice";


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
