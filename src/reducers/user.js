import {combineReducers} from 'redux';
import {FETCH_PROFILE, } from "../constants/app";
import {FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS} from "../constants/fetch";

const rolesAllowDelete = ['admin', 'web_admin', 'root'];
const rolesAllowEdit = [...rolesAllowDelete, 'production', 'web', 'cs'];

const profile = (state = {}, action) => {
    const {type, status, profile} = action;
    switch (type) {
    case FETCH_PROFILE:
        if (status === FETCH_SUCCESS) {
            return {...profile};
        }
        if (status === FETCH_INIT) {
            return state;
        }
        return {};
    default:
        return state;
    }
};

const loading = (state = false, action) => {
    const {type, status} = action;
    switch (type) {
    case FETCH_PROFILE:
        return status === FETCH_INIT;
    default:
        return state;
    }
};

const canDelete = (state = false, action) => {
    const {type, status, profile} = action;
    switch (type) {
    case FETCH_PROFILE:
        if (status === FETCH_SUCCESS) {
            return !!profile.roles && !!profile.roles.filter(role => rolesAllowDelete.includes(role.role)).length;
        }
        if (status === FETCH_FAILURE) {
            return false;
        }
        return state;
    default:
        return state;
    }
};

const canEdit = (state = false, action) => {
    const {type, status, profile} = action;
    switch (type) {
    case FETCH_PROFILE:
        if (status === FETCH_SUCCESS) {
            return !!profile.roles && !!profile.roles.filter(role => rolesAllowEdit.includes(role.role)).length;
        }
        if (status === FETCH_FAILURE) {
            return false;
        }
        return state;
    default:
        return state;
    }
};


export default combineReducers({
    loading,
    profile,
    canDelete,
    canEdit,
})
