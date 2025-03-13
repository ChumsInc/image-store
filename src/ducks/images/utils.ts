import {ImageSize, ImageSizeList, ImageSizePath, ProductImage, SortProps} from "chums-types";
import {EditableImage, ProductAltItemKey, SingleImage} from "../../types";
import {IMAGE_ALL_SIZES} from "./constants";

export const defaultImageSort: SortProps<EditableImage> = {
    field: 'filename',
    ascending: true,
}

export const imageSort = (sort: SortProps<EditableImage>) => (a: EditableImage, b: EditableImage) => {
    const sortMod = sort.ascending ? 1 : -1;
    switch (sort.field) {
        case 'item_code':
            return (a.item_code === b.item_code
                    ? (a.filename > b.filename ? 1 : -1)
                    : ((a.item_code ?? '').toLowerCase() > (b.item_code ?? '').toLowerCase() ? 1 : -1)
            ) * sortMod;
        default:
            return (a.filename > b.filename ? 1 : -1) * sortMod;
    }
}

export const imageSizeSort = (a: SingleImage, b: SingleImage) => {
    return (a?.size?.width ?? 0) - (b?.size?.width ?? 0);
}

export const imagePath = (path: string, filename: string) => `https://intranet.chums.com/images/products/${path}/${filename}`;

export const imagePreferredPath = (path: ImageSizePath = '400', sizes: ImageSizeList = {}) => {
    if (!!sizes[path]) {
        return path;
    }
    const index = IMAGE_ALL_SIZES.indexOf(path);
    let _index = index;
    while (_index < IMAGE_ALL_SIZES.length) {
        if (!!sizes[IMAGE_ALL_SIZES[_index]]) {
            return IMAGE_ALL_SIZES[_index];
        }
        _index += 1;
    }
    _index = index;
    while (_index >= 0) {
        if (!!sizes[IMAGE_ALL_SIZES[_index]]) {
            return IMAGE_ALL_SIZES[_index];
        }
        _index -= 1;
    }
    return path;
}

export const defaultAltItem: ProductAltItemKey = {
    id: 0,
    item_code: '',
    filename: '',
}

export const parseSingleImages = (img: ProductImage | null): SingleImage[] => {
    if (!img || !img.pathnames.length) {
        return []
    }
    const list: Partial<Record<ImageSizePath, SingleImage>> = {}
    img.pathnames.forEach(path => {
        const size: ImageSize | undefined = img.sizes ? img.sizes[path] : undefined;
        const imageFormat: string | undefined = img.img_format ? img.img_format[path] : undefined;
        const colorSpace: string | undefined = img.color_space ? img.color_space[path] : undefined;

        list[path] = {filename: img.filename, path, size, imageFormat, colorSpace};
    });
    return Object.values(list).sort(imageSizeSort);
}

export const isSavingReducer = (pv: boolean, cv: EditableImage) => pv || cv.saving || false;
