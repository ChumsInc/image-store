import {EditableImage, ImageSizeList} from "../../types";
import {RootState} from "../../app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {selectAssigned, selectFilter, selectSearch} from "../filters/selectors";
import {isSavingReducer} from "./utils";

export const selectImageList = (state:RootState) => state.images.list;
export const selectCurrentImage = (state:RootState):EditableImage|null => state.images.current;
export const selectSelectedImageSizes = (state:RootState):ImageSizeList => state.images.current?.sizes ?? {};
export const selectSelectedImageTags = (state:RootState):string[] => state.images.current?.tags || [];
export const selectImagesLoading = (state:RootState):boolean => state.images.loading || false;
export const selectImagesLoaded = (state:RootState):boolean => state.images.loaded || false;
export const selectIsPreferredImage = (state:RootState):boolean => state.images.current?.preferred_image || false;
export const selectSelectedForAction = (state:RootState) => state.images.selected.list;
export const selectMultipleSaving = (state:RootState) => state.images.selected.saving;

export const selectShowSelectedImageActions = (state:RootState) => state.images.selected.list.length > 0;

export const selectFilteredImages = createSelector(
    [selectImageList, selectSearch, selectAssigned],
    (list, search, assigned) => {
        let reSearch = /^/;
        try {
            reSearch = new RegExp(search, 'i');
        } catch(err:unknown) {}
        return list
            .filter(img => !search
                || reSearch.test(img.ItemCode ?? '')
                || reSearch.test(img.filename)
                || img.item_codes?.map(item => item.item_code).includes(search)
            )
            .filter(img => assigned || !(img.ItemCode || img.item_codes?.length) )
    }
);

