import {RootState} from "../../app/configureStore";

export const selectBaseSKUs = (state:RootState) => state.filters.baseSKUs;
export const selectCategories = (state:RootState) => state.filters.categories;
export const selectCollections = (state:RootState) => state.filters.collections;
export const selectProductLines = (state:RootState) => state.filters.productLines;
export const selectFiltersLoading = (state:RootState) => state.filters.loading;
export const selectFiltersLoaded = (state:RootState) => state.filters.loaded;
export const selectFilter = (state:RootState) => state.filters.filter;
export const selectShowFilterBar = (state:RootState) => state.filters.showFilterBar;
export const selectSearch = (state:RootState) => state.filters.filter.search;
export const selectAssigned = (state:RootState) => state.filters.filter.assigned;
export const selectFilterPreferredImages = (state:RootState) => state.filters.filter.preferredImage;
