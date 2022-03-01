export const CLEAR_ALL_IMAGE_FOR_TAG = 'CLEAR_ALL_IMAGE_FOR_TAG';
export const FETCH_DELETE_IMAGE = 'FETCH_DELETE_IMAGE';
export const FETCH_IMAGE = 'FETCH_IMAGE';
export const FETCH_IMAGES = 'FETCH_IMAGES';
export const FETCH_POST_ITEM_CODE = 'FETCH_POST_ITEM_CODE';
export const FETCH_POST_ALT_ITEM_CODE = 'FETCH_POST_ALT_ITEM_CODE';
export const FETCH_POST_IMAGE_TAG = 'FETCH_POST_IMAGE_TAG';
export const FETCH_POST_IMAGE_SINGLE_TAG = 'FETCH_POST_IMAGE_SINGLE_TAG';
export const SET_FILTERED_IMAGES = 'SET_FILTERED_IMAGES';
export const SET_ZOOM_IMAGE = 'SET_ZOOM_IMAGE';
export const SELECT_IMAGE_FOR_TAG = 'SELECT_IMAGE_FOR_TAG';
export const SELECT_IMAGE = 'SELECT_IMAGE';
export const UPDATE_SELECTED_IMAGE = 'UPDATE_SELECTED_IMAGE';
export const FETCH_POST_MULTIPLE_ITEMS = 'FETCH_POST_MULTIPLE_ITEMS';

export const DEFAULT_IMAGE_PATH = '250';
export const IMAGE_PATHS = ['80', '125', '250', '400'];
export const IMAGE_ALL_SIZES = ['80', '125', '250', '400', '800', '2048', 'originals'];
export const IMAGES_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100, 250];

export const PATH_DELETE_IMAGE = '/api/images/products/delete/:filename';
export const PATH_FETCH_IMAGE = '/api/images/products/query/:filename';
export const PATH_FETCH_IMAGES = '/api/images/products/list/all';
export const PATH_SET_ITEM_CODE = '/api/images/products/set-item/:filename/:item_code?';
export const PATH_SET_MULTIPLE_ITEM_CODES = '/api/images/products/set-item-code/:itemCode';
export const PATH_SET_ALT_ITEM_CODE = '/api/images/products/alt-item/:filename/:itemCode?';
export const PATH_SET_MULTIPLE_ALT_ITEM_CODES = '/api/images/products/alt-item/:itemCode';
export const PATH_SET_TAG = '/api/images/products/tag/:filename/:tag';
export const PATH_SET_TAG_MULTIPLE = '/api/images/products/tag/:tag';