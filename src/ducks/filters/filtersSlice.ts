import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadFilters} from "./actions";
import {selectBaseSKU} from "@/ducks/filters/baseSKUSlice";
import {selectCategory} from "@/ducks/filters/productCategorySlice";
import {selectCollection} from "@/ducks/filters/productCollectionSlice";
import {selectProductLine} from "@/ducks/filters/productLineSlice";

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
    status: 'idle' | 'loading' | 'rejected';
    loaded: boolean;
    showFilterBar: boolean;
    preferredImage: boolean;
    inactiveProducts: boolean;
    inactiveImages: boolean;
    showOnlyUnassigned: boolean;
    search: string;
}

export const initialFiltersState = (): FiltersState => {
    const params = new URLSearchParams(window.location.search);
    return {
        status: 'idle',
        loaded: false,
        showFilterBar: false,
        preferredImage: params.get('preferredImage') === '1',
        inactiveProducts: params.get('inactiveProducts') === '1',
        inactiveImages: params.get('inactiveImages') === '1',
        showOnlyUnassigned: false,
        search: params.get('search') ?? '',
    }
}

const filtersSlice = createSlice({
    name: 'image-filters',
    initialState: initialFiltersState(),
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        togglePreferredImages: (state, action: PayloadAction<boolean | undefined>) => {
            state.preferredImage = action.payload ?? !state.preferredImage;
        },
        toggleShowOnlyUnassigned: (state, action: PayloadAction<boolean | undefined>) => {
            state.showOnlyUnassigned = action.payload ?? !state.showOnlyUnassigned;
        },
        toggleFilterBar: (state, action: PayloadAction<boolean | undefined>) => {
            state.showFilterBar = action.payload ?? !state.showFilterBar;
        },
        toggleInactiveProducts: (state, action: PayloadAction<boolean | undefined>) => {
            state.inactiveProducts = action.payload ?? !state.inactiveProducts;
        },
        toggleInactiveImages: (state, action: PayloadAction<boolean | undefined>) => {
            state.inactiveImages = action.payload ?? !state.inactiveImages;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFilters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadFilters.fulfilled, (state) => {
                state.status = 'idle';
                state.loaded = true;
            })
            .addCase(loadFilters.rejected, (state) => {
                state.status = 'rejected';
            })
    },
    selectors: {
        selectSearch: (state) => state.search,
        selectShowOnlyUnassigned: (state) => state.showOnlyUnassigned,
        selectFiltersStatus: (state) => state.status,
        selectShowFilterBar: (state) => state.showFilterBar,
        selectFilterPreferredImages: (state) => state.preferredImage,
        selectShowInactiveImages: (state) => state.inactiveImages,
        selectShowInactiveProducts: (state) => state.inactiveProducts,
        selectFiltersLoaded: (state) => state.loaded,
    }
})

export const {
    setSearch,
    toggleShowOnlyUnassigned,
    toggleInactiveProducts,
    toggleInactiveImages,
    toggleFilterBar,
    togglePreferredImages,
} = filtersSlice.actions;
export const {
    selectFiltersStatus,
    selectSearch,
    selectShowOnlyUnassigned,
    selectFilterPreferredImages,
    selectShowFilterBar,
    selectFiltersLoaded,
    selectShowInactiveImages,
    selectShowInactiveProducts
} = filtersSlice.selectors;

export const selectFilter = createSelector(
    [selectBaseSKU, selectCategory, selectCollection, selectProductLine, selectFilterPreferredImages, selectShowInactiveProducts, selectShowInactiveImages],
    (baseSKU, category, collection, productLine, preferredImages, inactiveProducts, inactiveImages): ProductFilter => {
        return {
            baseSKU: baseSKU,
            category: category,
            collection: collection,
            productLine: productLine,
            preferredImage: preferredImages,
            inactiveProducts: inactiveProducts,
            inactiveImages: inactiveImages,
        }
    }
)

export default filtersSlice;
