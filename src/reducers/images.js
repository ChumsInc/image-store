import {combineReducers} from 'redux';
import selectedForAction from './images-selected';

import {
    FETCH_INIT,
    FETCH_SUCCESS,
} from "../constants/fetch";
import {
    CLEAR_ALL_IMAGE_FOR_TAG,
    FETCH_DELETE_IMAGE,
    FETCH_IMAGE,
    FETCH_IMAGES, FETCH_POST_ALT_ITEM_CODE, FETCH_POST_IMAGE_SINGLE_TAG, FETCH_POST_IMAGE_TAG,
    FETCH_POST_ITEM_CODE, FETCH_POST_MULTIPLE_ITEMS,
    SELECT_IMAGE, SELECT_IMAGE_FOR_TAG,
    SET_FILTERED_IMAGES,
    UPDATE_SELECTED_IMAGE
} from "../constants/image";
import {imageSort} from "../utils";
import {imagesPostPreferredImageSucceeded, imagesPostTagSucceeded} from "../ducks/images/ActionTypes";

function applyMultipleImageChanges(state, images) {
    const filenames = images.map(img => img.filename);
    const keyedImages = {};
    images.forEach(img => keyedImages[img.filename] = img);
    return [
        ...state.filter(img => filenames.includes(img.filename)).map(img => keyedImages[img.filename]),
        ...state.filter(img => filenames.includes(img.filename) === false),
    ].sort(imageSort);
}

const list = (state = [], action) => {
    const {type, status, images, image, filename, altItems, payload} = action;
    switch (type) {
    case FETCH_IMAGES:
        if (status === FETCH_SUCCESS) {
            return [...images].sort(imageSort);
        }
        return state;
    case FETCH_POST_IMAGE_SINGLE_TAG:
    case imagesPostTagSucceeded:
    case imagesPostPreferredImageSucceeded:
        if (payload?.image) {
            const image = payload.image;
            return [
                ...state.filter(img => img.filename !== image.filename),
                ...[image],
            ].sort(imageSort)
        }
        return state;
    case FETCH_POST_IMAGE_TAG:
    case FETCH_POST_MULTIPLE_ITEMS:
        if (status === FETCH_SUCCESS) {
            return applyMultipleImageChanges(state, images);
        }
        return state;
    case FETCH_POST_ITEM_CODE:
        if (status === FETCH_SUCCESS) {
            return [
                ...state.filter(img => img.filename !== image.filename),
                ...[image]
            ].sort(imageSort)
        }
        return state;
    case FETCH_POST_ALT_ITEM_CODE:
        if (status === FETCH_SUCCESS) {
            return [
                ...state.filter(img => img.filename !== filename),
                ...state.filter(img => img.filename === filename).map(img => ({...img, item_codes: [...altItems]}))
            ].sort(imageSort)
        }
        return state;
    case FETCH_DELETE_IMAGE:
        if (status === FETCH_SUCCESS) {
            return [
                ...state.filter(image => image.filename !== filename)
            ].sort(imageSort);
        }
        return state;

    default:
        return state;
    }
};

const filtered = (state = [], action) => {
    const {type, filtered, status, filename, image, images, payload} = action;
    switch (type) {
    case SET_FILTERED_IMAGES:
        return filtered;
    case FETCH_POST_IMAGE_SINGLE_TAG:
    case imagesPostTagSucceeded:
    case imagesPostPreferredImageSucceeded:
        if (payload?.image) {
            const image = payload.image;
            return [
                ...state.filter(img => img.filename !== image.filename),
                ...[image],
            ].sort(imageSort)
        }
        return state;
    case FETCH_POST_IMAGE_TAG:
    case FETCH_POST_MULTIPLE_ITEMS:
        if (status === FETCH_SUCCESS) {
            return applyMultipleImageChanges(state, images);
        }
        return state;
    case FETCH_DELETE_IMAGE:
        if (status === FETCH_SUCCESS) {
            return [
                ...state.filter(image => image.filename !== filename)
            ].sort(imageSort);
        }
        return state;
    default:
        return state;
    }
};

const loaded = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_IMAGES:
        return status === FETCH_SUCCESS;
    default:
        return state;
    }
};

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_IMAGES:
        return status === FETCH_INIT;
    default:
        return state;
    }
};

const selected = (state = {}, action) => {
    const {type, image, props, status, filename, altItems, images, payload} = action;
    switch (type) {
    case SELECT_IMAGE:
        return {...image};
    case FETCH_IMAGE:
        return {
            ...state,
            ...image,
            loading: status === FETCH_INIT,
        }
    case UPDATE_SELECTED_IMAGE:
        return {
            ...state,
            ...props,
            changed: true
        };
    case FETCH_POST_ITEM_CODE:
        if (status === FETCH_SUCCESS) {
            return {...image};
        }
        return {...state, loading: status === FETCH_INIT};
    case FETCH_POST_ALT_ITEM_CODE:
        if (status === FETCH_SUCCESS) {
            return {
                ...state,
                item_codes: altItems
            }
        }
        return state;
    case FETCH_DELETE_IMAGE:
        if (status === FETCH_SUCCESS) {
            return {};
        }
        return {...state, loading: status === FETCH_INIT};
    case FETCH_POST_MULTIPLE_ITEMS:
        if (status === FETCH_SUCCESS && !!state.filename) {
            const [selected] = images.filter(img => img.filename === state.filename);
            return {...selected};
        }
        return state;
    case imagesPostTagSucceeded:
    case imagesPostPreferredImageSucceeded:
        if (payload?.image) {
            return payload.image;
        }
        return state;
    default:
        return state;
    }
};

export default combineReducers({
    list,
    loading,
    loaded,
    filtered,
    selected,
    selectedForAction,
})
