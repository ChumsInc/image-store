import {fetchJSON} from "chums-components";
import {LoadFiltersResult} from "../types";


export async function fetchFilters(): Promise<LoadFiltersResult> {
    try {
        const url = '/api/images/filters/chums';
        const {baseSKUs, categories, collections, productLines} = await fetchJSON<LoadFiltersResult>(url);
        return {baseSKUs, categories, collections, productLines};
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("fetchFilters()", err.message);
            return Promise.reject(err);
        }
        console.warn("fetchFilters()", err);
        return Promise.reject(new Error('Error in fetchFilters()'));
    }
}
