import {BaseSKUSearch, ProductCategory, ProductCollection, ProductLine} from "chums-types";
import {invalidHashValue, ProductFilter, ProductFilterKey} from "./index";
import base64 from 'base-64';


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

export const urlSearchParamsToFilter = (params?: URLSearchParams): ProductFilter => {
    if (!params) {
        params = new URLSearchParams(window.location.search);
    }
    return {
        baseSKU: params.get('baseSKU'),
        category: params.get('cat'),
        collection: params.get('collection'),
        productLine: params.get('pl'),
        preferredImage: params.get('preferredImage') === '1',
        inactiveProducts: params.get('inactiveProducts') === '1',
        inactiveImages: params.get('inactiveImages') === '1',
    }
}
