import {ActionInterface, ActionPayload} from "chums-connected-components";
import {EditableImage} from "../../types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../../app/configureStore";

export interface ImageActionPayload extends ActionPayload {
    image?:EditableImage,
}
export interface ImageAction extends ActionInterface {
    image?:EditableImage,
    payload?: ImageActionPayload,
    status?: string,
}

export interface ImageThunkAction extends ThunkAction<any, RootState, unknown, ImageAction> {}

export const imagesPostTagRequested = 'images/postTagRequested';
export const imagesPostTagSucceeded = 'images/postTagSucceeded';
export const imagesPostTagFailed = 'images/postTagFailed';

export const imagesPostPreferredImageRequested = 'images/postPreferredImageRequested';
export const imagesPostPreferredImageSucceeded = 'images/postPreferredImageSucceeded';
export const imagesPostPreferredImageFailed = 'images/postPreferredImageFailed';
