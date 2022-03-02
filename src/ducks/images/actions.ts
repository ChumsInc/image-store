import {PATH_SET_PREFERRED_ITEM, PATH_SET_TAG} from "../../constants/image";
import {FETCH_FAILURE} from "../../constants/fetch";
import {fetchDELETE, fetchPOST} from "../../fetch";
import {
    imagesPostPreferredImageFailed,
    imagesPostPreferredImageRequested,
    imagesPostPreferredImageSucceeded,
    imagesPostTagFailed,
    imagesPostTagRequested,
    imagesPostTagSucceeded,
    ImageThunkAction
} from "./ActionTypes";
import {selectSelectedImage} from "./selectors";

export const untagImageAction = (tag: string, filename: string): ImageThunkAction =>
    async (dispatch, getState) => {
        try {
            if (!tag || !filename) {
                return;
            }
            dispatch({type: imagesPostTagRequested});
            const url = PATH_SET_TAG
                .replace(':filename', encodeURIComponent(filename))
                .replace(':tag', encodeURIComponent(tag));
            const {image} = await fetchDELETE(url);
            dispatch({type: imagesPostTagSucceeded, payload: {image}});
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log("untagImageAction()", err.message);
                dispatch({type: imagesPostTagFailed, payload: {error: err, context: imagesPostTagRequested}});
                return;
            }
            console.log("untagImageAction()", err);
            dispatch({type: imagesPostTagFailed, status: FETCH_FAILURE, err});
        }
    }

export const tagImageAction = (tag: string, filename: string): ImageThunkAction =>
    async (dispatch, getState) => {
        try {
            if (!tag || !filename) {
                return;
            }
            dispatch({type: imagesPostTagRequested});
            const url = PATH_SET_TAG
                .replace(':filename', encodeURIComponent(filename))
                .replace(':tag', encodeURIComponent(tag));
            const {image} = await fetchPOST(url);
            dispatch({type: imagesPostTagSucceeded, payload: {image}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("tagImageAction()", error.message);
                return dispatch({type: imagesPostTagFailed, payload: {error, context: imagesPostTagRequested}})
            }
            console.error("tagImageAction()", error);
        }
    }

export const setPreferredImageAction = (): ImageThunkAction =>
    async (dispatch, getState) => {
        try {
            const state = getState();
            const _image = selectSelectedImage(state);
            if (!_image || !_image.filename || !_image.item_code) {
                return;
            }
            dispatch({type: imagesPostPreferredImageRequested});
            const url = PATH_SET_PREFERRED_ITEM.replace(':filename', encodeURIComponent(_image.filename))
                .replace(':itemCode', _image.item_code);
            const {image} = await fetchPOST(url);
            dispatch({type: imagesPostPreferredImageSucceeded, payload: {image}});
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("setPrefferedImageAction()", error.message);
                dispatch({
                    type: imagesPostPreferredImageFailed,
                    payload: {error, context: imagesPostPreferredImageRequested}
                });
                return;
            }
            console.error("setPrefferedImageAction()", error);
        }
    }
