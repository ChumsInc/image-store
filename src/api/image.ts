import {
    PATH_DELETE_IMAGE,
    PATH_FETCH_IMAGES,
    PATH_SET_ALT_ITEM_CODE,
    PATH_SET_PREFERRED_ITEM,
    PATH_SET_TAG
} from "../constants/image";
import {ProductImage, ProductAltItem} from 'chums-types/product-image'
import {fetchJSON} from "chums-components";
import {fetchPOST} from "../fetch";
import {ProductFilter} from "../ducks/filters";

export async function fetchImagesAPI(filter:ProductFilter):Promise<ProductImage[]> {
    try {
        const params = new URLSearchParams();
        if (filter.baseSKU) {
            params.set('baseSKU', filter.baseSKU);
        }
        if (filter.category) {
            params.set('category', filter.category);
        }
        if (filter.collection) {
            params.set('collection', filter.collection);
        }
        if (filter.productLine) {
            params.set('productLine', filter.productLine);
        }
        if (filter.active) {
            params.set('active', filter.active ? '1' : '0');
        }
        if (filter.preferredImage) {
            params.set('preferred', filter.preferredImage ? '1' : '0');
        }
        const url = `${PATH_FETCH_IMAGES}?${params.toString()}`;
        const {images} = await fetchJSON<{images: ProductImage[]}>(url);
        return images;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("fetchImages()", err.message);
            return Promise.reject(err);
        }
        console.warn("fetchImages()", err);
        return Promise.reject(new Error('Error in fetchImages()'));
    }
}

export async function fetchImageAPI(filename:string):Promise<ProductImage> {
    try {
        const url = `${PATH_FETCH_IMAGES}?filename=${encodeURIComponent(filename)}`;
        const {images} = await fetchJSON<{images: ProductImage}>(url);
        return images;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("fetchImage()", err.message);
            return Promise.reject(err);
        }
        console.warn("fetchImage()", err);
        return Promise.reject(new Error('Error in fetchImage()'));
    }
}

export async function postAltItemCodeAPI(filename:string, itemCode:string):Promise<ProductAltItem[]> {
    try {
        const url = PATH_SET_ALT_ITEM_CODE
            .replace(':filename', encodeURIComponent(filename))
            .replace(':itemCode', encodeURIComponent(itemCode));
        const {altItems} = await fetchJSON<{altItems: ProductAltItem[]}>(url, {method: 'post'})
        return altItems;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("postAltItemCodeAPI()", err.message);
            return Promise.reject(err);
        }
        console.warn("postAltItemCodeAPI()", err);
        return Promise.reject(new Error('Error in postAltItemCodeAPI()'));
    }
}

export async function putImageActiveAPI(filename:string, active:boolean):Promise<ProductImage|null> {
    try {
        const url = '/api/images/products/:filename/:active'
            .replace(':filename', encodeURIComponent(filename))
            .replace(':active', encodeURIComponent(active ? 1 : 0));
        const {image} = await fetchJSON<{image?:ProductImage}>(url, {method: 'put'});
        return image || null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("putImageActiveAPI()", err.message);
            return Promise.reject(err);
        }
        console.warn("putImageActiveAPI()", err);
        return Promise.reject(new Error('Error in putImageActiveAPI()'));
    }
}

export async function deleteImageAPI(filename: string):Promise<ProductImage[]> {
    try {
        const url = PATH_DELETE_IMAGE.replace(':filename', encodeURIComponent(filename));
        const {result} = await fetchJSON<{result: ProductImage[]}>(url, {method: 'delete'});
        return result;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("deleteImageAPI()", err.message);
            return Promise.reject(err);
        }
        console.warn("deleteImageAPI()", err);
        return Promise.reject(new Error('Error in deleteImageAPI()'));
    }
}

export async function untagImageAPI(filename: string, tag: string): Promise<ProductImage> {
    try {
        const url = PATH_SET_TAG
            .replace(':filename', encodeURIComponent(filename))
            .replace(':tag', encodeURIComponent(tag));
        const {image} = await fetchJSON<{ image: ProductImage }>(url, {method: 'delete'});
        return image
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("untagImageAPI()", err.message);
            return Promise.reject(err);
        }
        console.warn("untagImageAPI()", err);
        return Promise.reject(new Error('Error in untagImageAPI()'));
    }
}

export async function tagImageAPI(filename: string, tag:string):Promise<ProductImage> {
    try {
        const url = PATH_SET_TAG
            .replace(':filename', encodeURIComponent(filename))
            .replace(':tag', encodeURIComponent(tag));
        const {image} = await fetchJSON<{ image: ProductImage }>(url, {method: 'post'});
        return image
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("tagImageAPI()", err.message);
            return Promise.reject(err);
        }
        console.warn("tagImageAPI()", err);
        return Promise.reject(new Error('Error in tagImageAPI()'));
    }
}

export async function setPreferredImageAPI(filename: string, itemCode: string):Promise<ProductImage> {
    try {
        const url = PATH_SET_PREFERRED_ITEM.replace(':filename', encodeURIComponent(filename))
            .replace(':itemCode', itemCode);
        const {image} = await fetchJSON<{image:ProductImage}>(url, {method: 'POST'});
        return image;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("setPreferredImageAPI()", err.message);
            return Promise.reject(err);
        }
        console.warn("setPreferredImageAPI()", err);
        return Promise.reject(new Error('Error in setPreferredImageAPI()'));
    }
}
