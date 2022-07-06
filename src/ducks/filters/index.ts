import {BaseSKU, ProductCategory, ProductCollection, ProductLine} from "chums-types";
import {AsyncThunk, createAction, createAsyncThunk, createReducer} from "@reduxjs/toolkit";
import {fetchFiltersAPI} from "../../api/filters";
import {RootState} from "../../app/configureStore";

interface LoadFiltersResult {
    baseSKUs: BaseSKU[],
    categories: ProductCategory[],
    collections: ProductCollection[],
    productLines: ProductLine[],
}

export interface ProductFilter {
    baseSKU: string | null,
    category: string | null,
    collection: string | null,
    productLine: string | null
    preferredImage: boolean,
    active: boolean,
}

interface FiltersState {
    baseSKUs: BaseSKU[],
    categories: ProductCategory[],
    collections: ProductCollection[],
    productLines: ProductLine[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    filter: ProductFilter
}

const initialState: FiltersState = {
    baseSKUs: [],
    categories: [],
    collections: [],
    productLines: [],
    loading: 'idle',
    filter: {
        baseSKU: null,
        category: null,
        collection: null,
        productLine: null,
        preferredImage: false,
        active: true,
    }
}

export const typePrefix = `productFilters`;
export const fetchFiltersPrefix = `${typePrefix}/fetchFilters`;

export const setBaseSKU = createAction<BaseSKU | undefined>(`${typePrefix}/set-filter/setBaseSKU`);
export const setProductCategory = createAction<ProductCategory | undefined>(`${typePrefix}/set-filter/setProductCategory`);
export const setProductCollection = createAction<ProductCollection | undefined>(`${typePrefix}/set-filter/setProductCollection`);
export const setProductLine = createAction<ProductLine | undefined>(`${typePrefix}/set-filter/setProductLine`);
export const setFeaturedImage = createAction<boolean | undefined>(`${typePrefix}/set-filter/setFeaturedImage`);
export const setActive = createAction<boolean | undefined>(`${typePrefix}/set-filter/setActive`);

type FetchFiltersThunkAction = AsyncThunk<LoadFiltersResult, void, any>;

export const fetchFilters: FetchFiltersThunkAction = createAsyncThunk<LoadFiltersResult>(
    fetchFiltersPrefix,
    async (data, {rejectWithValue}) => {
        try {
            const {baseSKUs, categories, collections, productLines} = await fetchFiltersAPI();
            return {baseSKUs, categories, collections, productLines};
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue({error: err, context: 'productFilters/fetchFilters'})
            }
            return {baseSKUs: [], categories: [], collections: [], productLines: []};
        }
    },
    {
        condition: (arg, {getState, extra}) => {
            const state = getState() as RootState;
            return state.productFilters.loading !== 'pending';
        },

    }
);

function isFetchFiltersAction(action: any): action is ReturnType<FetchFiltersThunkAction> {
    return action?.type?.startsWith(fetchFiltersPrefix);
}

export const productFiltersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setBaseSKU, (state, action) => {
            state.filter.baseSKU = action.payload?.Category4 || null;
        })
        .addCase(setProductCategory, (state, action) => {
            state.filter.category = action.payload?.Category2 || null;
        })
        .addCase(setProductCollection, (state, action) => {
            state.filter.collection = action.payload?.Category3 || null;
        })
        .addCase(setProductLine, (state, action) => {
            state.filter.productLine = action.payload?.ProductLine || null;
        })
        .addCase(setFeaturedImage, (state, action) => {
            state.filter.preferredImage = action.payload ?? !state.filter.preferredImage;
        })
        .addCase(setActive, (state, action) => {
            state.filter.active = action.payload ?? !state.filter.active;
        })
        .addCase(fetchFilters.fulfilled, (state, action) => {
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
        })
        .addMatcher(
            isFetchFiltersAction,
            (state, action) => {
                state.loading = action.meta.requestStatus;
            }
        )
})
