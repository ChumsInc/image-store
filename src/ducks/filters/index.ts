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

export interface ProductFilter {
    baseSKU: string | null;
    category: string | null;
    collection: string | null;
    productLine: string | null;
    preferredImage: boolean;
    assigned: boolean;
    active: boolean;
    search: string;
}

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

export const initialFiltersState: FiltersState = {
    baseSKUs: [],
    categories: [],
    collections: [],
    productLines: [],
    loading: false,
    loaded: false,
    showFilterBar: true,
    filter: {
        baseSKU: null,
        category: null,
        collection: null,
        productLine: null,
        preferredImage: false,
        assigned: true,
        active: true,
        search: '',
    }
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

            const [baseSKU] = baseSKUs.filter(sku => sku.Category4 === state.filter.baseSKU);
            state.filter.baseSKU = baseSKU?.Category4 ?? null;

            const [category] = categories.filter(cat => cat.Category2 === state.filter.category);
            state.filter.category = category?.Category2 ?? null;

            const [collection] = collections.filter(col => col.Category3 === state.filter.collection);
            state.filter.collection = collection?.Category3 ?? null;

            const [productLine] = productLines.filter(pl => pl.ProductLine === state.filter.productLine);
            state.filter.productLine = productLine?.ProductLine ?? null;
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
