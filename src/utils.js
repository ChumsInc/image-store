import {IMAGE_ALL_SIZES} from './constants/image';

export const now = () => new Date().valueOf();
export const noop = () => {};

export const imagePath = ({path, filename}) => `https://intranet.chums.com/images/products/${path}/${filename}`;
export const imagePreferredPath = ({preferredPath = '400', sizes = {}}) => {
    if (!!sizes[preferredPath]) {
        return preferredPath;
    }
    const index = IMAGE_ALL_SIZES.indexOf(preferredPath);
    let _index = index;
    while (_index < IMAGE_ALL_SIZES.length) {
        if (!!sizes[IMAGE_ALL_SIZES[_index]]) {
            return IMAGE_ALL_SIZES[_index];
        }
        _index += 1;
    }
    _index = index;
    while (_index >= 0) {
        if (!!sizes[IMAGE_ALL_SIZES[_index]]) {
            return IMAGE_ALL_SIZES[_index];
        }
        _index -= 1;
    }
    return preferredPath;
}

export const imageSort = (a, b) => a.filename > b.filename ? 1 : -1;

export const setPreference = (key, value) => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
};

export const clearPreference = (key) => {
    if (typeof window === 'undefined') {
        return;
    }
    window.localStorage.removeItem(key);
}

export const getPreference = (key, defaultValue) => {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    const value = window.localStorage.getItem(key);
    if (value === null) {
        return defaultValue;
    }
    return JSON.parse(value);
};
