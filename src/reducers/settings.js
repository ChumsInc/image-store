import {combineReducers} from 'redux';
import {
    DEFAULT_IMAGE_PATH,
} from "../constants/image";
import {
    PREF_FILTER_INACTIVE,
    PREF_FILTER_ITEM_BASE_SKU,
    PREF_FILTER_ITEM_CATEGORY,
    PREF_FILTER_ITEM_COLLECTION,
    PREF_FILTER_PRODUCT_LINE,
    PREF_IMAGE_SIZE,
    PREF_IMAGES_PER_PAGE,
    PREF_SHOW_FILTERS,
    SET_DEFAULT_IMAGE_PATH,
    SET_FILTER,
    SET_FILTER_INACTIVE, SET_FILTER_UNASSIGNED, SET_IMAGE_FILTER,
    SET_IMAGES_PER_PAGE, SET_ITEM_BASE_SKU,
    SET_ITEM_CATEGORY,
    SET_ITEM_COLLECTION,
    SET_PAGE,
    SET_PRODUCT_LINE,
    TOGGLE_FILTERS
} from "../constants/settings";
import {getPreference, setPreference} from "../utils";
import {FETCH_PROFILE} from "../constants/app";

const showFilters = (state = getPreference(PREF_SHOW_FILTERS, true), action) => {
    switch (action.type) {
    case TOGGLE_FILTERS:
        setPreference(PREF_SHOW_FILTERS, !state);
        return !state;
    case FETCH_PROFILE:
        return !!(action.profile && action.profile.user && !!action.profile.user.id);
    default:
        return state;
    }
};

const filter = (state = '', action) => {
    const {type, filter} = action;
    switch (type) {
    case SET_IMAGE_FILTER:
        return filter;
    default:
        return state;
    }
};

const imagesPerPage = (state = getPreference(PREF_IMAGES_PER_PAGE, 5), action) => {
    const {type, images} = action;
    switch (type) {
    case SET_IMAGES_PER_PAGE:
        setPreference(PREF_IMAGES_PER_PAGE, images);
        return images;
    default:
        return state;
    }
};

const page = (state = 1, action) => {
    const {type, page} = action;
    switch (type) {
    case SET_PAGE:
        return page;
    case SET_IMAGES_PER_PAGE:
    // case SET_FILTERED_IMAGES:
        return 1;
    default:
        return state;
    }
};

const defaultImagePath = (state = getPreference(PREF_IMAGE_SIZE, DEFAULT_IMAGE_PATH), action) => {
    const {type, size} = action;
    switch (type) {
    case SET_DEFAULT_IMAGE_PATH:
        setPreference(PREF_IMAGE_SIZE, size);
        return size;
    default:
        return state;
    }
};

const filterInactive = (state = getPreference(PREF_FILTER_INACTIVE, true), action) => {
    const {type, status} = action;
    switch (type) {
    case SET_FILTER_INACTIVE:
        setPreference(PREF_FILTER_INACTIVE, status);
        return status;
    default:
        return state;
    }
};

const productLine = (state = getPreference(PREF_FILTER_PRODUCT_LINE, ''), action) => {
    const {type, productLine} = action;
    switch (type) {
    case SET_PRODUCT_LINE:
        setPreference(PREF_FILTER_PRODUCT_LINE, productLine);
        return productLine;
    default:
        return state;
    }
};

const itemCategory = (state = getPreference(PREF_FILTER_ITEM_CATEGORY, ''), action) => {
    const {type, category} = action;
    switch (type) {
    case SET_ITEM_CATEGORY:
        setPreference(PREF_FILTER_ITEM_CATEGORY, category);
        return category;
    default:
        return state;
    }
};

const itemCollection = (state = getPreference(PREF_FILTER_ITEM_COLLECTION, ''), action) => {
    const {type, collection} = action;
    switch (type) {
    case SET_ITEM_COLLECTION:
        setPreference(PREF_FILTER_ITEM_COLLECTION, collection);
        return collection;
    default:
        return state;
    }
};

const itemBaseSKU = (state = getPreference(PREF_FILTER_ITEM_BASE_SKU, ''), action) => {
    const {type, baseSKU} = action;
    switch (type) {
    case SET_ITEM_BASE_SKU:
        setPreference(PREF_FILTER_ITEM_BASE_SKU, baseSKU);
        return baseSKU;
    default:
        return state;
    }
};

const filterUnassigned = (state = false, action) => {
    const {type, } = action;
    switch (type) {
    case SET_FILTER_UNASSIGNED:
        return !state;
    default:
        return state;
    }
};

export default combineReducers({
    showFilters,
    filter,
    imagesPerPage,
    page,
    defaultImagePath,
    filterInactive,
    productLine,
    itemCategory,
    itemCollection,
    itemBaseSKU,
    filterUnassigned,
})
