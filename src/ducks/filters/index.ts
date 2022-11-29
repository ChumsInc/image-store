import {BaseSKU, ProductCategory, ProductCollection, ProductLine} from "chums-types";
import {createReducer} from "@reduxjs/toolkit";
import {
    loadFilters,
    toggleActive, toggleAssigned,
    setBaseSKU,
    toggleFeaturedImage,
    setProductCategory,
    setProductCollection,
    setProductLine, setSearch, toggleFilterBar
} from "./actions";
import {urlSearchParamsToFilter} from "./utils";

export const invalidHashValue = '#N/A';

export interface ProductFilter {
    baseSKU: string | null;
    category: string | null;
    collection: string | null;
    productLine: string | null;
    preferredImage: boolean;
    assigned?: boolean;
    active?: boolean;
    search: string;
}

export type ProductFilterKey = keyof ProductFilter;

interface FiltersState {
    baseSKUs: BaseSKU[];
    categories: ProductCategory[];
    collections: ProductCollection[];
    productLines: ProductLine[];
    loading: boolean;
    loaded: boolean;
    showFilterBar: boolean;
    filter: ProductFilter;
}

const urlFilter:ProductFilter = urlSearchParamsToFilter(window.location.search);

export const initialFilter:ProductFilter = {
    baseSKU: urlFilter.baseSKU ?? null,
    category: urlFilter.category ?? null,
    collection: urlFilter.collection ?? null,
    productLine: urlFilter.productLine ?? null,
    preferredImage: urlFilter.preferredImage ?? false,
    assigned: true,
    active: true,
    search: urlFilter.search ?? '',
}

export const initialFiltersState: FiltersState = {
    baseSKUs: [],
    categories: [],
    collections: [],
    productLines: [],
    loading: false,
    loaded: false,
    showFilterBar: true,
    filter: {...initialFilter},
}


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
        .addCase(toggleActive, (state, action) => {
            state.filter.active = action.payload ?? !state.filter.active;
        })
        .addCase(toggleAssigned, (state, action) => {
            state.filter.assigned = action.payload ?? !state.filter.assigned;
        })
        .addCase(loadFilters.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadFilters.fulfilled, (state, action) => {
            const {baseSKUs, categories, collections, productLines} = action.payload;
            state.baseSKUs = baseSKUs || [];
            state.categories = categories || [];
            state.collections = collections || [];
            state.productLines = productLines || [];

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
        .addCase(setSearch, (state, action) => {
            state.filter.search = action.payload;
        });
})

export default filtersReducer;
