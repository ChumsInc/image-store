import {
    ALERT_TYPES,
    DISMISS_ALERT,
    FETCH_FILTERS,
    FETCH_PROFILE,
    FETCH_VERSION,
    PATH_FETCH_FILTERS,
    SET_ALERT,
} from "../constants/app";
import {FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS,} from "../constants/fetch";

import {fetchGET} from "../fetch";
import {filterImages} from "./images";
import {URL_USER_PROFILE} from "../constants/paths";


export const setAlert = ({type = ALERT_TYPES.warning, title = 'Oops!', message = 'There was an error', context = ''}) => ({
    type: SET_ALERT,
    props: {type, title, message, context}
});

export const dismissAlert = (id) => ({type: DISMISS_ALERT, id});

/**
 *
 * @param {Error} err
 * @param {String} context
 * @return {{type: string, props: {context: string, type: string, title: *, message: *}}}
 */
export const handleError = (err, context = '') => {
    console.trace(err.message);
    return {
        type: SET_ALERT,
        props: {type: ALERT_TYPES.danger, title: err.name, message: err.message, context}
    };
};

export const loadFilters = () => (dispatch, getState) => {
    const {filters} = getState();
    if (filters.loading) {
        return;
    }
    dispatch({type: FETCH_FILTERS, status: FETCH_INIT});
    fetchGET(PATH_FETCH_FILTERS, {cache: 'no-cache'})
        .then(({productLines, categories, collections, baseSKUs}) => {
            dispatch({type: FETCH_FILTERS, status: FETCH_SUCCESS, productLines, categories, collections, baseSKUs});
            dispatch(filterImages());
        })
        .catch(err => {
            console.log('loadFilters()', err.message);
            dispatch({type: FETCH_FILTERS, status: FETCH_FAILURE});
        })
};
export const fetchProfile = () => (dispatch, getState) => {
    try {
        dispatch({type: FETCH_PROFILE, status: FETCH_INIT})
        fetchGET(URL_USER_PROFILE, {cache: 'no-cache', credentials: 'same-origin'})
            .then(response => {
                const {accounts, roles, user} = response || {};
                dispatch({type: FETCH_PROFILE, status: FETCH_SUCCESS, profile: {user, accounts, roles}})
            }).catch(err => {
            if (/403/.test(err.message)) {
                dispatch({type: FETCH_PROFILE, status: FETCH_SUCCESS, profile: {}});
                return;
            }
            dispatch({type: FETCH_PROFILE, status: FETCH_FAILURE})
            console.log("fetchProfile()", err.message);
        })
    } catch (err) {
        if (/403/.test(err.message)) {
            dispatch({type: FETCH_PROFILE, status: FETCH_SUCCESS, profile: {}});
            return;
        }
        dispatch({type: FETCH_PROFILE, status: FETCH_FAILURE})
        console.log("fetchProfile()", err.message);
        return err;
    }
}

export const fetchVersion = () => (dispatch, getState) => {
    dispatch({type: FETCH_VERSION, status: FETCH_INIT});
    fetch('package.json', {cache: "no-cache", credentials: 'same-origin'})
        .then(res => res.json())
        .then(res => {
            const {version} = res;
            dispatch({type: FETCH_VERSION, status: FETCH_SUCCESS, version});
        })
        .catch(err => {
            dispatch({type: FETCH_VERSION, status: FETCH_FAILURE});
            console.log(err.message);
        });
}
