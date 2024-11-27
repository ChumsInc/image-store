import {BaseSKU, BaseSKUSearch, ProductCategory, ProductCollection, ProductLine} from "chums-types";
import {createReducer} from "@reduxjs/toolkit";
import {
    loadFilters,
    toggleInactiveProducts,
    setBaseSKU,
    toggleFeaturedImage,
    setProductCategory,
    setProductCollection,
    setProductLine,
    toggleFilterBar, toggleInactiveImages, setFiltersFromSearchParams
} from "./actions";
import {sortBaseSKUs, sortCategories, sortCollections, sortProductLines, urlSearchParamsToFilter} from "./utils";

export const invalidHashValue = '#N/A';

export interface ProductFilter {
    baseSKU: string | null;
    category: string | null;
    collection: string | null;
    productLine: string | null;
    preferredImage: boolean;
    inactiveProducts?: boolean;
    inactiveImages?: boolean;
}


export type ProductFilterKey = keyof ProductFilter;

interface FiltersState {
    baseSKUs: BaseSKUSearch[];
    categories: ProductCategory[];
    collections: ProductCollection[];
    productLines: ProductLine[];
    loading: boolean;
    loaded: boolean;
    showFilterBar: boolean;
    filter: ProductFilter;
}

export const initialFiltersState = ():FiltersState => ({
    baseSKUs: [],
    categories: [],
    collections: [],
    productLines: [],
    loading: false,
    loaded: false,
    showFilterBar: true,
    filter: urlSearchParamsToFilter()
})


const filtersReducer = createReducer(initialFiltersState, (builder) => {
    builder
        .addCase(toggleFilterBar, (state, action) => {
            state.showFilterBar = action.payload ?? !state.showFilterBar;
        })
        .addCase(setBaseSKU, (state, action) => {
            state.filter.baseSKU = action.payload;
        })
        .addCase(setProductCategory, (state, action) => {
            state.filter.category = action.payload;
        })
        .addCase(setProductCollection, (state, action) => {
            state.filter.collection = action.payload;
        })
        .addCase(setProductLine, (state, action) => {
            state.filter.productLine = action.payload;
        })
        .addCase(toggleFeaturedImage, (state, action) => {
            state.filter.preferredImage = action.payload ?? !state.filter.preferredImage;
        })
        .addCase(toggleInactiveProducts, (state, action) => {
            state.filter.inactiveProducts = action.payload ?? !state.filter.inactiveProducts;
        })
        .addCase(toggleInactiveImages, (state, action) => {
            state.filter.inactiveImages = action.payload ?? !state.filter.inactiveImages;
        })
        .addCase(loadFilters.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadFilters.fulfilled, (state, action) => {
            const {baseSKUs, categories, collections, productLines} = action.payload;
            state.baseSKUs = baseSKUs.sort(sortBaseSKUs);
            state.categories = categories.sort(sortCategories);
            state.collections = collections.sort(sortCollections);
            state.productLines = productLines.sort(sortProductLines);

            if (state.filter.baseSKU !== invalidHashValue) {
                const [baseSKU] = baseSKUs.filter(sku => sku.Category4 === state.filter.baseSKU);
                state.filter.baseSKU = baseSKU?.Category4 ?? null;
            }
            if (state.filter.category !== invalidHashValue) {
                const [category] = categories.filter(cat => cat.Category2 === state.filter.category);
                state.filter.category = category?.Category2 ?? null;
            }
            if (state.filter.collection !== invalidHashValue) {
                const [collection] = collections.filter(col => col.Category3 === state.filter.collection);
                state.filter.collection = collection?.Category3 ?? null;
            }
            if (state.filter.productLine !== invalidHashValue) {
                const [productLine] = productLines.filter(pl => pl.ProductLine === state.filter.productLine);
                state.filter.productLine = productLine?.ProductLine ?? null;
            }

            state.loaded = true;
            state.loading = false;
        })
        .addCase(loadFilters.rejected, (state, action) => {
            state.loading = false;
        })
        .addCase(setFiltersFromSearchParams, (state, action) => {
            state.filter = action.payload;
        })
})

export default filtersReducer;
