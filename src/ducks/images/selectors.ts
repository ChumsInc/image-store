import {ImageRecord, ImageSizeList} from "../../types";
import {RootState} from "../../app/configureStore";
import {createSelector} from "@reduxjs/toolkit";

export const selectSelectedImage = (state:RootState):ImageRecord => state.images.selected || undefined;
export const selectSelectedImageSizes = (state:RootState):ImageSizeList => state.images.selected?.sizes;
export const selectSelectedImageTags = (state:RootState):string[] => state.images.selected?.tags || [];
export const selectImagesLoading = (state:RootState):boolean => state.images.loading || false;
export const selectImagesLoaded = (state:RootState):boolean => state.images.loaded || false;
export const selectIsPreferredImage = (state:RootState):boolean => state.images.selected?.preferred_image || false;
export const selectSelectedForAction = (state:RootState) => state.images.selectedForAction.list;

export const selectShowSelectedImageActions = createSelector(
    [selectSelectedImage, selectSelectedForAction],
    (selected, selectedForAction) => {
    return selectedForAction.length > 1
        ? true
        : !(selectedForAction.length === 1 && selectedForAction.includes(selected.filename) || selectedForAction.length === 0);
})
