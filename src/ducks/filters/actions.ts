import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchFilters} from "./api";
import type {LoadFiltersResult} from "../../types";
import {type RootState} from "@/app/configureStore";
import {selectFiltersStatus} from "@/ducks/filters/filtersSlice";


export const loadFilters = createAsyncThunk<LoadFiltersResult, void, { state: RootState }>(
    'filters/load',
    async () => {
        return await fetchFilters();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectFiltersStatus(state) === 'idle'
        }
    }
);
