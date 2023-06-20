import {BaseSKUSearch, ProductCategory, ProductCollection, ProductLine} from "chums-types";
import {invalidHashValue, ProductFilter, ProductFilterKey} from "./index";
import base64 from 'base-64';

const getKeys = <T extends {}>(o: T): Array<keyof T> => <Array<keyof T>>Object.keys(o)

export const sortProductLines = (a: ProductLine, b: ProductLine) => {
    return a.ProductLineDesc.toLowerCase() === b.ProductLineDesc.toLowerCase()
        ? (a.ProductLine > b.ProductLine ? 1 : -1)
        : (a.ProductLineDesc.toLowerCase() > b.ProductLineDesc.toLowerCase() ? 1 : -1);
}

export const sortCategories = (a: ProductCategory, b: ProductCategory) => {
    return a.Category2.toLowerCase() > b.Category2.toLowerCase() ? 1 : -1;
}

export const sortBaseSKUs = (a: BaseSKUSearch, b: BaseSKUSearch) => {
    return a.Category4.toLowerCase() > b.Category4.toLowerCase() ? 1 : -1;
}

export const sortCollections = (a: ProductCollection, b: ProductCollection) => {
    return a.Category3.toLowerCase() > b.Category3.toLowerCase() ? 1 : -1;
}

export const filterToURLSearchParams = (filter: ProductFilter): URLSearchParams => {
    function searchValue(value: string | null | boolean): string {
        switch (typeof value) {
            case 'boolean':
                return value ? '1' : '0';
            default:
                return value ?? '';
        }

    }

    const search = new URLSearchParams();
    getKeys<ProductFilter>(filter).map(key => {
        if (['active', 'assigned'].includes(key)) {
            return;
        }
        let val = filter[key as unknown as ProductFilterKey];
        if (val) {
            search.set(key, searchValue(val));
        }
    });
    const hashed = new URLSearchParams();
    hashed.set('filter', base64.encode(search.toString()));
    return hashed;
}


export const urlSearchParamsToFilter = (search: URLSearchParams | string): ProductFilter => {
    function fromSearchValue(key: ProductFilterKey, value: string | null): string | boolean | null {
        switch (key) {
            case 'search':
                return value;
            case 'preferredImage':
            case 'activeProducts':
            case 'assigned':
                return value === '1';
            default:
                return value || null;
        }
    }

    let params = new URLSearchParams(search);
    const filterHash = params.get('filter');
    if (filterHash) {
        try {
            const hashedParams = base64.decode(filterHash);
            params = new URLSearchParams(hashedParams);
        } catch (err: unknown) {
            params.set('baseSKU', invalidHashValue);
            // params.set('category', invalidHashValue);
            // params.set('collection', invalidHashValue);
            // params.set('productLine', invalidHashValue);
            if (err instanceof Error) {
                console.warn("urlSearchParamsToFilter()", err.message);
            }
        }
    }
    const filter: ProductFilter = {
        baseSKU: null,
        category: null,
        collection: null,
        productLine: null,
        preferredImage: false,
        assigned: true,
        activeProducts: true,
        search: '',
    };
    getKeys<ProductFilter>(filter).forEach(key => {
        if (key) {
            const val = params.get(key) ?? null;
            // @ts-ignore
            filter[key] = fromSearchValue(key, val);
        }
    });
    return filter;
}
