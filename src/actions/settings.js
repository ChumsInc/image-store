import {
    SET_DEFAULT_IMAGE_PATH,
    SET_FILTER_INACTIVE, SET_FILTER_UNASSIGNED,
    SET_IMAGES_PER_PAGE, SET_ITEM_BASE_SKU, SET_ITEM_CATEGORY, SET_ITEM_COLLECTION,
    SET_PAGE,
    SET_PRODUCT_LINE,
    TOGGLE_FILTERS
} from "../constants/settings";
import {filterImages} from './images';

export const setDefaultImagePath = (size) => ({type: SET_DEFAULT_IMAGE_PATH, size});
export const setImagesPerPage = (images) => ({type: SET_IMAGES_PER_PAGE, images});
export const setPage = (page) => ({type: SET_PAGE, page});

export const setFilterUnassigned = (status) => (dispatch, getState) => {
    dispatch({type: SET_FILTER_UNASSIGNED, status});
    dispatch(filterImages());
};

export const setFilterInactive = (status) => (dispatch, getState) => {
    dispatch({type: SET_FILTER_INACTIVE, status});
    dispatch(filterImages());
};

export const setProductLine = (productLine) => (dispatch, getState) => {
    dispatch({type: SET_PRODUCT_LINE, productLine});
    dispatch(filterImages());
};

export const setItemCollection = (collection) => (dispatch, getState) => {
    dispatch({type: SET_ITEM_COLLECTION, collection});
    dispatch(filterImages());
};

export const setItemCategory = (category) => (dispatch, getState) => {
    dispatch({type: SET_ITEM_CATEGORY, category});
    dispatch(filterImages());
};

export const setBaseSKU = (baseSKU) => (dispatch, getState) => {
    dispatch({type: SET_ITEM_BASE_SKU, baseSKU});
    dispatch(filterImages());
};


export const toggleShowFilters = () => ({type: TOGGLE_FILTERS});
