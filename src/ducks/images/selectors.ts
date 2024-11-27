import {EditableImage, ImageSizeList} from "../../types";
import {RootState} from "../../app/configureStore";
import {createSelector} from "@reduxjs/toolkit";


export const selectImageList = (state:RootState) => state.images.list;
export const selectCurrentImage = (state:RootState):EditableImage|null => state.images.current;
export const selectCurrentLoading = (state:RootState) => state.images.current?.loading ?? false;
export const selectCurrentSaving = (state:RootState) => state.images.current?.saving ?? false;
export const selectSelectedImageSizes = (state:RootState):ImageSizeList => state.images.current?.sizes ?? {};
export const selectSelectedImageTags = (state:RootState):string[] => state.images.current?.tags || [];
export const selectImagesLoading = (state:RootState):boolean => state.images.loading;
export const selectImagesLoaded = (state:RootState):boolean => state.images.loaded;
export const selectIsPreferredImage = (state:RootState):boolean => state.images.current?.preferred_image || false;
export const selectSelectedForAction = (state:RootState) => state.images.selected.list;
export const selectMultipleSaving = (state:RootState) => state.images.selected.saving;
export const selectSearch = (state:RootState) => state.images.filter.search;
export const selectShowUnassigned = (state:RootState) => state.images.filter.showUnassigned;


export const selectShowSelectedImageActions = (state:RootState) => state.images.selected.list.length > 0;

export const selectFilteredImages = createSelector(
    [selectImageList, selectSearch, selectShowUnassigned],
    (list, search, showUnassigned) => {
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
            .filter(img => !showUnassigned || !(img.ItemCode || img.item_codes?.length) )
    }
);

