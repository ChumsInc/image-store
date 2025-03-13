import {fetchJSON} from "@chumsinc/ui-utils";
import {LoadFiltersResult} from "../../types";


export async function fetchFilters(): Promise<LoadFiltersResult> {
    try {
        const url = '/api/images/filters/chums';
        const res = await fetchJSON<LoadFiltersResult>(url);
        return {
            baseSKUs: res?.baseSKUs ?? [],
            categories: res?.categories ?? [],
            collections: res?.collections ?? [],
            productLines: res?.productLines ?? [],
        };
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("fetchFilters()", err.message);
            return Promise.reject(err);
        }
        console.warn("fetchFilters()", err);
        return Promise.reject(new Error('Error in fetchFilters()'));
    }
}
