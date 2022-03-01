import {ActionInterface, ActionPayload} from "chums-ducks";
import {ImageRecord} from "../../types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";

export interface ImageActionPayload extends ActionPayload {
    image?:ImageRecord,
}
export interface ImageAction extends ActionInterface {
    image?:ImageRecord,
    payload?: ImageActionPayload,
    status?: string,
}

export interface ImageThunkAction extends ThunkAction<any, RootState, unknown, ImageAction> {}

export const imagesPostTagRequested = 'images/postTagRequested';
export const imagesPostTagSucceeded = 'images/postTagSucceeded';
export const imagesPostTagFailed = 'images/postTagFailed';
