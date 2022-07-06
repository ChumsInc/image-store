import {BaseSKU, ProductCategory, ProductCollection, CountryOfOrigin, PrimaryVendor, ProductLine, ProductStatus, ProductWarehouse} from "chums-types";
import {fetchJSON} from "chums-components";


interface LoadFiltersResponse {
    baseSKUs: BaseSKU[],
    categories: ProductCategory[],
    collections: ProductCollection[],
    productLines: ProductLine[],
    
}
export async function fetchFiltersAPI() {
    try {
        const url = '/api/search/item/filters/chums';
        const {baseSKUs, categories, collections, productLines} = await fetchJSON<LoadFiltersResponse>(url);
        return {baseSKUs, categories, collections, productLines};
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("fetchFilters()", err.message);
            return Promise.reject(err);
        }
        console.warn("fetchFilters()", err);
        return Promise.reject(new Error('Error in fetchFilters()'));
    }
}
