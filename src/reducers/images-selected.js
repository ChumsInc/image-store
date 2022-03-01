import {combineReducers} from 'redux';
import {CLEAR_ALL_IMAGE_FOR_TAG, FETCH_POST_MULTIPLE_ITEMS, SELECT_IMAGE_FOR_TAG} from "../constants/image";
import {FETCH_INIT} from "../constants/fetch";

const list = (state = [], action) => {
    const {type, filename} = action;
    switch (type) {
    case SELECT_IMAGE_FOR_TAG:
        if (state.filter(fn => fn === filename).length) {
            return state.filter(fn => fn !== filename)
        }
        return [...state, filename];
    case CLEAR_ALL_IMAGE_FOR_TAG:
        return [];
    default:
        return state;
    }
}

const saving = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_POST_MULTIPLE_ITEMS:
        return status === FETCH_INIT;
    default:
        return state;
    }
}

export default combineReducers({
    list,
    saving,
})
