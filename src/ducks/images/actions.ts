import {FETCH_POST_IMAGE_SINGLE_TAG, PATH_SET_TAG} from "../../constants/image";
import {FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS} from "../../constants/fetch";
import {fetchDELETE, fetchPOST} from "../../fetch";
import {imagesPostTagFailed, imagesPostTagRequested, imagesPostTagSucceeded, ImageThunkAction} from "./ActionTypes";

export const untagImageAction = (tag:string, filename:string):ImageThunkAction =>
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
    } catch(err: unknown) {
        if (err instanceof Error) {
            console.log("untagImageAction()", err.message);
            dispatch({type: imagesPostTagFailed, payload: {error: err, context: imagesPostTagRequested}});
            return;
        }
        console.log("untagImageAction()", err);
        dispatch({type: imagesPostTagFailed, status: FETCH_FAILURE, err});
    }
}

export const tagImageAction = (tag:string, filename: string):ImageThunkAction =>
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
        } catch(error:unknown) {
            if (error instanceof Error) {
                console.log("tagImageAction()", error.message);
                return dispatch({type:imagesPostTagFailed, payload: {error, context: imagesPostTagRequested}})
            }
            console.error("tagImageAction()", error);
        }
}
