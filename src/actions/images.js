import {
    CLEAR_ALL_IMAGE_FOR_TAG,
    FETCH_DELETE_IMAGE,
    FETCH_IMAGE,
    FETCH_IMAGES,
    FETCH_POST_ALT_ITEM_CODE, FETCH_POST_IMAGE_SINGLE_TAG,
    FETCH_POST_IMAGE_TAG,
    FETCH_POST_ITEM_CODE, FETCH_POST_MULTIPLE_ITEMS,
    PATH_DELETE_IMAGE,
    PATH_FETCH_IMAGE,
    PATH_FETCH_IMAGES,
    PATH_SET_ALT_ITEM_CODE,
    PATH_SET_ITEM_CODE,
    PATH_SET_MULTIPLE_ALT_ITEM_CODES,
    PATH_SET_MULTIPLE_ITEM_CODE, PATH_SET_MULTIPLE_ITEM_CODES, PATH_SET_TAG,
    PATH_SET_TAG_MULTIPLE,
    SELECT_IMAGE,
    SELECT_IMAGE_FOR_TAG,
    SET_FILTERED_IMAGES,
    SET_ZOOM_IMAGE,
    UPDATE_SELECTED_IMAGE
} from "../constants/image";
import {
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_SUCCESS,
} from "../constants/fetch";
import {buildPath, fetchDELETE, fetchGET, fetchPOST} from "../fetch";
import {imageSort} from "../utils";
import {setAlert} from "./app";
import {SET_IMAGE_FILTER} from "../constants/settings";

let searchTimer = null;

const filterProductLines = (images, productLines) => {
    const keys = {};
    images.forEach(img => {
        if (!!img.ProductLine && keys[img.ProductLine] === undefined) {
            const [obj] = productLines.filter(pl => pl.ProductLine === img.ProductLine);
            if (obj) {
                keys[img.ProductLine] = {...obj};
            }
        }
    });
    return Object.keys(keys).map(key => keys[key]);
};

const filterItemCategories = (images, categories) => {
    const keys = {};
    images.forEach(img => {
        if (!!img.Category && !keys[img.Category]) {
            const [obj] = categories.filter(cat => cat.Category2 === img.Category);
            if (obj) {
                keys[img.Category] = obj;
            }
        }
    });
    return Object.keys(keys).map(key => keys[key]);
};
const filterItemCollections = (images, collections) => {
    const keys = {};
    images.forEach(img => {
        if (!!img.Collection && !keys[img.Collection]) {
            const [obj] = collections.filter(cat => cat.Category3 === img.Collection);
            if (obj) {
                keys[img.Collection] = obj;
            }
        }
    });
    return Object.keys(keys).map(key => keys[key]);
};

const filterBaseSKUs = (images, baseSKUs) => {
    const keys = {};
    images.forEach(img => {
        if (!!img.BaseSKU && !keys[img.BaseSKU]) {
            const [obj] = baseSKUs.filter(cat => cat.Category4 === img.BaseSKU);
            if (obj) {
                keys[img.BaseSKU] = obj;
            }
        }
    });
    return Object.keys(keys).map(key => keys[key]);
};

export const setFilter = (filter) => (dispatch, getState) => {
    dispatch({type: SET_IMAGE_FILTER, filter});
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        dispatch(filterImages());
    }, 500);
};

export const filterImages = () => (dispatch, getState) => {
    const {images, settings, filters} = getState();

    const {
        filter,
        filterInactive,
        filterUnassigned,
        productLine,
        itemCategory,
        itemCollection,
        itemBaseSKU,
    } = settings;

    let filtered = images.list;
    let {productLines, itemCategories, itemCollections, itemBaseSKUs} = filters;

    if (filter.trim() !== '') {
        let reFilter = /^/;
        try {
            reFilter = new RegExp(filter.trim(), 'i');
        } catch(err) {}

        filtered = filtered.filter(img =>
            reFilter.test(img.filename)
            || reFilter.test(img.item_code)
            || reFilter.test(img.ItemCodeDesc)
            || img.tags.filter(tag => reFilter.test(tag)).length > 0
            || (img.item_codes || []).filter(item => reFilter.test(item.item_code)).length > 0
        );
    }

    if (filterUnassigned) {
        productLines = [];
        itemCategories = [];
        itemCollections = [];
        itemBaseSKUs = [];
        filtered = filtered.filter(img => !img.ProductType && !img.tags.filter(tag => /inactive/i.test(tag)).length);
    } else {
        filtered = filtered.filter(img => !filterInactive || !(img.ProductType === 'D' || img.InactiveItem === 'Y' || img.tags.filter(tag => /inactive/i.test(tag)).length > 0));

        productLines = filterProductLines(filtered, productLines);
        filtered = filtered.filter(img => !productLine || img.ProductLine === productLine);

        itemCategories = filterItemCategories(filtered, itemCategories);
        filtered = filtered.filter(img => !itemCategory || img.Category === itemCategory);

        itemBaseSKUs = filterBaseSKUs(filtered, itemBaseSKUs);
        filtered = filtered.filter(img => !itemBaseSKU || img.BaseSKU === itemBaseSKU);

        itemCollections = filterItemCollections(filtered, itemCollections);
        filtered = filtered.filter(img => !itemCollection || img.ItemCollection === itemCollection);
    }

    filtered = filtered.sort(imageSort);

    dispatch({type: SET_FILTERED_IMAGES, filter, filtered, productLines, itemCategories, itemCollections, itemBaseSKUs});
};

export const fetchImages = () => (dispatch, getState) => {
    const {images, settings} = getState();
    if (images.loading) {
        return;
    }

    const {filter} = settings;
    const params = new URLSearchParams();
    // if (!!filter) {
    //     params.append('itemCode', filter);
    // }
    dispatch({type: FETCH_IMAGES, status: FETCH_INIT});
    const url = buildPath(PATH_FETCH_IMAGES) + '?' + params.toString();
    fetchGET(url, {cache: 'no-cache'})
        .then(({images}) => {
            dispatch({type: FETCH_IMAGES, status: FETCH_SUCCESS, images: images.sort(imageSort)});
            dispatch(filterImages());
        })
        .catch(err => dispatch({type: FETCH_IMAGES, status: FETCH_FAILURE, message: err.message}));
};

export const setZoomImage = (image) => ({type: SET_ZOOM_IMAGE, image});

export const selectImage = (image) => (dispatch, getState) => {
    dispatch({type: FETCH_IMAGE, status: FETCH_INIT, image});
    const {filename} = image;
    const url = buildPath(PATH_FETCH_IMAGE, {filename});
    fetchGET(url, {cache: 'no-cache'})
        .then(({images: image}) => {
            dispatch({type: FETCH_IMAGE, status: FETCH_SUCCESS, image})
        })
        .catch(err => {
            dispatch({type: FETCH_IMAGE, status: FETCH_FAILURE, image})
        });
};

export const updateSelectedImage = (props) => ({type: UPDATE_SELECTED_IMAGE, props});

export const saveItemCode = ({id, filename, itemCode: item_code, isPrimaryItem}) => (dispatch, getState) => {
    if (!filename) {
        return;
    }
    if (!isPrimaryItem) {
        return dispatch(saveAltItemCode({id, filename, itemCode: item_code}));
    }
    const url = buildPath(PATH_SET_ITEM_CODE, {filename, item_code});
    dispatch({type: FETCH_POST_ITEM_CODE, status: FETCH_INIT});
    fetchPOST(url)
        .then(({image}) => {
            dispatch({type: FETCH_POST_ITEM_CODE, status: FETCH_SUCCESS, image});
            dispatch(filterImages());
        })
        .catch(err => {
            dispatch({type: FETCH_POST_ITEM_CODE, status: FETCH_FAILURE});
            dispatch(setAlert({message: err.message}));
        });
};

export const saveAltItemCode = ({id, filename, itemCode}) => (dispatch, getState) => {
    const url = buildPath(PATH_SET_ALT_ITEM_CODE, {filename, itemCode});
    dispatch({type: FETCH_POST_ALT_ITEM_CODE, status: FETCH_INIT});
    fetchPOST(url)
        .then(({altItems}) => {
            dispatch({type: FETCH_POST_ALT_ITEM_CODE, status: FETCH_SUCCESS, filename, altItems});
            dispatch(filterImages());
        })
        .catch(err => {
            dispatch({type: FETCH_POST_ALT_ITEM_CODE, status: FETCH_FAILURE});
            dispatch(setAlert({message: err.message}));
        });
}

export const deleteImage = (filename) => (dispatch, getState) => {
    const {user, images} = getState();
    if (user.loading || images.selected.loading || !user.canDelete || filename !== images.selected.filename) {
        return;
    }
    const url = buildPath(PATH_DELETE_IMAGE, {filename});
    dispatch({type: FETCH_DELETE_IMAGE, status: FETCH_INIT});
    fetchDELETE(url)
        .then(result => {
            console.log(result);
            dispatch({type: FETCH_DELETE_IMAGE, status: FETCH_SUCCESS, filename});
        })
        .catch(err => {
            console.log(err.message);
            dispatch({type: FETCH_DELETE_IMAGE, status: FETCH_FAILURE, err});
        })
}

export const selectImageForTag = (filename) => ({type: SELECT_IMAGE_FOR_TAG, filename});
export const clearSelectedForAction = () => ({type: CLEAR_ALL_IMAGE_FOR_TAG});

export const tagImages = (tag) => (dispatch, getState) => {
    const {images} = getState();
    if (images.loading) {
        return;
    }
    const {selectedForAction} = images;
    const url = buildPath(PATH_SET_TAG_MULTIPLE, {tag});
    dispatch({type: FETCH_POST_IMAGE_TAG, status: FETCH_INIT});
    return fetchPOST(url, {filenames: selectedForAction.list})
        .then(({images}) => {
            dispatch({type: FETCH_POST_IMAGE_TAG, status: FETCH_SUCCESS, images});
        })
        .catch(err => {
            dispatch({type: FETCH_POST_IMAGE_TAG, status: FETCH_FAILURE, err});
        })
}


export const applyItemCode = (itemCode, primaryItemCode = false) => (dispatch, getState) => {
    const {images} = getState();
    if (images.loading) {
        return;
    }
    const filenames = images.list.filter(img => images.selectedForAction.list.includes(img.filename))
        .filter(img => img.item_code !== itemCode)
        .filter(img => img.item_codes.filter(item => item.item_code === itemCode).length === 0)
        .map(img => img.filename);

    const url = !!primaryItemCode
        ? buildPath(PATH_SET_MULTIPLE_ITEM_CODES, {itemCode})
        : buildPath(PATH_SET_MULTIPLE_ALT_ITEM_CODES, {itemCode});

    dispatch({type: FETCH_POST_MULTIPLE_ITEMS, status: FETCH_INIT});
    return fetchPOST(url, {filenames: filenames})
        .then(({images}) => {
            dispatch({type: FETCH_POST_MULTIPLE_ITEMS, status: FETCH_SUCCESS, images});
        })
        .catch(err => {
            dispatch({type: FETCH_POST_MULTIPLE_ITEMS, status: FETCH_FAILURE, err});
            dispatch(setAlert({message: err.message, context: FETCH_POST_MULTIPLE_ITEMS}));
        });
}
