/**
 * Created by steve on 8/24/2016.
 */

import 'whatwg-fetch';
import {compile} from 'path-to-regexp';
import {getPreference} from './utils';
import {STORE_TOKEN} from "./constants/local-store";

self.fetch.credentials = 'include';

export default self.fetch.bind(self);
export const Headers = self.Headers;
export const Request = self.Request;
export const Response = self.Response;

const getAuthHeader = () => {
    const token = getPreference(STORE_TOKEN, null);
    return token ? {Authorization: `Bearer ${token}`} : {};
};

export const fetchOptions = {
    PostJSON: (object) => {
        return {
            credentials: 'same-origin',
            method: 'post',
            headers: {
                ...getAuthHeader(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        };
    },
    Delete: () => {
        return {
            credentials: 'same-origin',
            method: 'DELETE',
            headers: {
                ...getAuthHeader(),
            }
        };
    }
};

const onErrorResponse = (response) => {
    if (response.ok) {
        return response;
    } else {
        const error = new Error(`${response.status} ${response.statusText}`);
        error.response = response;
        throw error;
    }
};

/**
 *
 * @param {String} url
 * @param {Object} [options]
 * @param {String} [options.cache] "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload"
 * @return {Promise<unknown>}
 */
export function fetchGET(url, options = {}) {
    const init = {
        credentials: 'same-origin',
        ...options,
        headers: {
            ...(options.headers || {}),
            ...getAuthHeader(),
        }
    };
    return new Promise((resolve, reject) => {
        fetch(url, init)
            .then(onErrorResponse)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    reject(new Error(response.error));
                    return console.log(response.error);
                }
                resolve(response);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export function fetchHTML(url, options = {}) {
    return new Promise((resolve, reject) => {
        fetch(url, {credentials: 'same-origin', ...options})
            .then(onErrorResponse)
            .then(response => response.text())
            .then(html => {
                resolve(html);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export function fetchPOST(url, data) {
    return new Promise((resolve, reject) => {
        fetch(url, fetchOptions.PostJSON(data))
            .then(onErrorResponse)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                resolve(response);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export function fetchPOSTImage(url, image) {

}


export function fetchDELETE(url) {
    return new Promise((resolve, reject) => {
        fetch(url, fetchOptions.Delete())
            .then(onErrorResponse)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                resolve(response);
            })
            .catch(err => {
                console.log('fetchDELETE()', err);
                reject(err);
            });
    });
}

export const cacheBuster = (url = null) => {
    const value = new Date().valueOf().toString(36);
    if (url) {
        const re = /\b(_=[0-9a-f]+)\b/gi;
        if (re.test(url)) {
            return url.replace(/\b(_=[0-9a-f]+)\b/, `_=${value}`);
        }
        return url + (/\?/.test(url) ? '&' : '?') + `_=${value}`;
    }
    return value;
};

export const buildPath = (path, props, cacheBusted = false) => {
    try {
        return compile(path, {encode: encodeURIComponent})(props);
        // return cacheBusted ? cacheBuster(url) : url;
    } catch (e) {
        console.trace(e.message, path, props);
        return path;
    }
};


