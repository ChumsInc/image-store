import {combineReducers} from 'redux';
import {FETCH_INIT, FETCH_SUCCESS} from "../constants/fetch";
import {FETCH_FILTERS} from "../constants/app";
import filtered from "./filtered";

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_FILTERS:
        return status === FETCH_INIT;
    default:
        return state;
    }
};

const productLines = (state = [], action) => {
    const {type, status, productLines} = action;
    switch (type) {
    case FETCH_FILTERS:
        if (status === FETCH_SUCCESS) {
            return productLines;
        }
        return state;
    default:
        return state;
    }
};

const itemCategories = (state = [], action) => {
    const {type, status, categories} = action;
    switch (type) {
    case FETCH_FILTERS:
        if (status === FETCH_SUCCESS) {
            return categories;
        }
        return state;
    default:
        return state;
    }
};

const itemCollections = (state = [], action) => {
    const {type, status, collections} = action;
    switch (type) {
    case FETCH_FILTERS:
        if (status === FETCH_SUCCESS) {
            return collections;
        }
        return state;
    default:
        return state;
    }
};

const itemBaseSKUs = (state = [], action) => {
    const {type, status, baseSKUs} = action;
    switch (type) {
    case FETCH_FILTERS:
        if (status === FETCH_SUCCESS) {
            return baseSKUs;
        }
        return state;
    default:
        return state;
    }
};


export default combineReducers({
    loading,
    productLines,
    itemCategories,
    itemCollections,
    itemBaseSKUs,
    filtered,
});
