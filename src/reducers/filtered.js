import {combineReducers} from 'redux';
import {SET_FILTERED_IMAGES} from "../constants/image";

const productLineSort = (a, b) => a.ProductLineDesc === b.ProductLineDesc
    ? (a.ProductLine > b.ProductLine ? 1 : -1)
    : (a.ProductLineDesc > b.ProductLineDesc ? 1 : -1);

const productLines = (state = [], action) => {
    const {type, productLines} = action;
    switch (type) {
    case SET_FILTERED_IMAGES:
        return productLines.sort(productLineSort);
    default:
        return state;
    }
};

const itemCategories = (state = [], action) => {
    const {type, itemCategories} = action;
    switch (type) {
    case SET_FILTERED_IMAGES:
        return itemCategories;
    default:
        return state;
    }
};

const itemCollections = (state = [], action) => {
    const {type, itemCollections} = action;
    switch (type) {
    case SET_FILTERED_IMAGES:
        return itemCollections;
    default:
        return state;
    }
};

const itemBaseSKUs = (state = [], action) => {
    const {type, itemBaseSKUs} = action;
    switch (type) {
    case SET_FILTERED_IMAGES:
        return itemBaseSKUs;
    default:
        return state;
    }
};

export default combineReducers({
    productLines,
    itemCategories,
    itemCollections,
    itemBaseSKUs,
});
