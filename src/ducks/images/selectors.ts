import {RootState} from "../index";
import {ImageRecord, ImageSizeList} from "../../types";

export const selectSelectedImage = (state:RootState):ImageRecord => state.images.selected || undefined;
export const selectSelectedImageSizes = (state:RootState):ImageSizeList => state.images.selected?.sizes;
export const selectSelectedImageTags = (state:RootState):string[] => state.images.selected?.tags || [];
export const selectImagesLoading = (state:RootState):boolean => state.images.loading || false;
export const selectImagesLoaded = (state:RootState):boolean => state.images.loaded || false;
