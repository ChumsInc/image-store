const reLocal = /^local/;


export const sessionStoragePrefix:string = 'session/image-store';
export const localStoragePrefix:string = 'local/image-store';


export const sessionStorageKeys = {
};

export const localStorageKeys = {
    imagesPerPage: `${localStoragePrefix}/imagesPerPage`,
    imageSize: `${localStoragePrefix}/imageSize`,
}
function getStorage(key:string):Storage {
    return reLocal.test(key) ? window.localStorage : window.sessionStorage;
}

export const setPreference = (key:string, value:any) => {
    try {
        if (!global.window) {
            return;
        }
        getStorage(key).setItem(key, JSON.stringify(value));
    } catch(err:any) {
        console.log("setPreference()", err.message);
    }
};

export const clearPreference = (key:string) => {
    if (typeof window === 'undefined') {
        return;
    }
    getStorage(key).removeItem(key);
}

export const getPreference = (key:string, defaultValue: any) => {
    try {
        if (!global.window) {
            return defaultValue;
        }
        const value = getStorage(key).getItem(key);
        if (value === null) {
            return defaultValue;
        }
        return JSON.parse(value);
    } catch(err:any) {
        console.log("getPreference()", err.message);
        return defaultValue;
    }
};
