import {BaseSKU, ProductCategory, ProductCollection, ProductLine} from "chums-types";

export const sortProductLines = (a:ProductLine, b:ProductLine) => {
    return a.ProductLineDesc.toLowerCase() === b.ProductLineDesc.toLowerCase()
        ? (a.ProductLine > b.ProductLine ? 1 : -1)
        : (a.ProductLineDesc.toLowerCase() > b.ProductLineDesc.toLowerCase() ? 1 : -1);
}

export const sortCategories = (a:ProductCategory, b:ProductCategory) => {
    return a.Category2.toLowerCase() > b.Category2.toLowerCase() ? 1 : -1;
}

export const sortBaseSKUs = (a:BaseSKU, b:BaseSKU) => {
    return a.Category4.toLowerCase() > b.Category4.toLowerCase() ? 1 : -1;
}

export const sortCollections = (a:ProductCollection, b:ProductCollection) => {
    return a.Category3.toLowerCase() > b.Category3.toLowerCase() ? 1 : -1;
}
