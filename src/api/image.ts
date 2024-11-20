import {ProductImage} from 'chums-types'
import {fetchJSON} from "chums-components";
import {ProductFilter} from "../ducks/filters";

export const PATH_SET_PREFERRED_ITEM = '/api/images/products/set-preferred-item/:filename/:itemCode';
export const PATH_SET_ALT_ITEM_CODE = '/api/images/products/alt-item/:filename/:itemCode';
export const PATH_DELETE_IMAGE = '/api/images/products/delete/:filename';
export const PATH_FETCH_IMAGE = '/api/images/products/list/:filename';
export const PATH_FETCH_IMAGES = '/api/images/products/list/all';

export const PATH_SET_TAG = '/api/images/products/tag/:filename/:tag';

export async function fetchImages(filter: ProductFilter): Promise<ProductImage[]> {
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
        if (filter.activeProducts) {
            params.set('active', filter.activeProducts ? '1' : '0');
        }
        if (filter.activeImages) {
            params.set('activeImages', filter.activeImages ? '1' : '0');
        }
        if (filter.preferredImage) {
            params.set('preferred', filter.preferredImage ? '1' : '0');
        }
        const url = `${PATH_FETCH_IMAGES}?${params.toString()}`;
        const res = await fetchJSON<{ images: ProductImage[] }>(url);
        return res?.images ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("fetchImages()", err.message);
            return Promise.reject(err);
        }
        console.warn("fetchImages()", err);
        return Promise.reject(new Error('Error in fetchImages()'));
    }
}

export async function fetchImage(filename: string | null): Promise<ProductImage | null> {
    try {
        if (!filename) {
            return null;
        }
        const url = PATH_FETCH_IMAGE.replace(':filename', encodeURIComponent(filename));
        const res = await fetchJSON<{ image: ProductImage }>(url);
        return res?.image ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("fetchImage()", err.message);
            return Promise.reject(err);
        }
        console.warn("fetchImage()", err);
        return Promise.reject(new Error('Error in fetchImage()'));
    }
}

export async function putImageUpdate(productImage: Partial<ProductImage>): Promise<ProductImage | null> {
    try {
        if (!productImage || !productImage.filename) {
            return Promise.reject(new Error('putImageUpdate(): Filename is required'))
        }
        const url = '/api/images/products/:filename'
            .replace(':filename', encodeURIComponent(productImage.filename));
        const body = JSON.stringify(productImage);
        const res = await fetchJSON<{ image: ProductImage | null }>(url, {method: 'put', body});
        return res?.image ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("putImageUpdate()", err.message);
            return Promise.reject(err);
        }
        console.debug("putImageUpdate()", err);
        return Promise.reject(new Error('Error in putImageUpdate()'));
    }
}

export async function postItemCode(filename: string, itemCode: string): Promise<ProductImage | null> {
    try {
        const url = '/api/images/products/set-preferred-item/:filename/:itemCode'
            .replace(':filename', encodeURIComponent(filename))
            .replace(':itemCode', encodeURIComponent(itemCode));
        const res = await fetchJSON<{ image: ProductImage | null }>(url, {method: 'POST'});
        return res?.image ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postItemCode()", err.message);
            return Promise.reject(err);
        }
        console.debug("postItemCode()", err);
        return Promise.reject(new Error('Error in postItemCode()'));
    }
}

export async function postAltItemCode(filename: string, itemCode: string): Promise<ProductImage | null> {
    try {
        const url = PATH_SET_ALT_ITEM_CODE
            .replace(':filename', encodeURIComponent(filename))
            .replace(':itemCode', encodeURIComponent(itemCode));
        const res = await fetchJSON<{ image: ProductImage | null }>(url, {method: 'post'})
        return res?.image || null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("postAltItemCodeAPI()", err.message);
            return Promise.reject(err);
        }
        console.warn("postAltItemCodeAPI()", err);
        return Promise.reject(new Error('Error in postAltItemCodeAPI()'));
    }
}

export async function deleteAltItemCode(filename: string, itemCode: string): Promise<ProductImage | null> {
    try {
        if (!filename || !itemCode) {
            return Promise.reject(new Error('deleteAltItemCode(): missing filename or item code'));
        }
        const url = PATH_SET_ALT_ITEM_CODE
            .replace(':filename', encodeURIComponent(filename))
            .replace(':itemCode', encodeURIComponent(itemCode));
        const res = await fetchJSON<{ image: ProductImage | null }>(url, {method: 'delete'})
        return res?.image ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("deleteAltItemCode()", err.message);
            return Promise.reject(err);
        }
        console.debug("deleteAltItemCode()", err);
        return Promise.reject(new Error('Error in deleteAltItemCode()'));
    }
}

export async function putImageActive(filename?: string, active?: boolean): Promise<ProductImage | null> {
    try {
        if (!filename) {
            return Promise.reject(new Error('Invalid filename: missing filename'));
        }
        const url = '/api/images/products/:filename/:active'
            .replace(':filename', encodeURIComponent(filename))
            .replace(':active', encodeURIComponent(active ? 1 : 0));
        const res = await fetchJSON<{ image?: ProductImage }>(url, {method: 'put'});
        return res?.image ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("putImageActive()", err.message);
            return Promise.reject(err);
        }
        console.warn("putImageActive()", err);
        return Promise.reject(new Error('Error in putImageActive()'));
    }
}

export async function deleteImage(filename: string): Promise<ProductImage[]> {
    try {
        const url = PATH_DELETE_IMAGE.replace(':filename', encodeURIComponent(filename));
        const res = await fetchJSON<{ result: ProductImage[] }>(url, {method: 'delete'});
        return res?.result ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("deleteImageAPI()", err.message);
            return Promise.reject(err);
        }
        console.warn("deleteImageAPI()", err);
        return Promise.reject(new Error('Error in deleteImageAPI()'));
    }
}

export async function deleteImageTag(filename: string, tag: string): Promise<ProductImage | null> {
    try {
        const url = PATH_SET_TAG
            .replace(':filename', encodeURIComponent(filename))
            .replace(':tag', encodeURIComponent(tag));
        const res = await fetchJSON<{ image: ProductImage }>(url, {method: 'delete'});
        return res?.image ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("deleteImageTag()", err.message);
            return Promise.reject(err);
        }
        console.warn("deleteImageTag()", err);
        return Promise.reject(new Error('Error in deleteImageTag()'));
    }
}

export async function postTagImage(filename: string, tag: string): Promise<ProductImage|null> {
    try {
        const url = PATH_SET_TAG
            .replace(':filename', encodeURIComponent(filename))
            .replace(':tag', encodeURIComponent(tag));
        const res = await fetchJSON<{ image: ProductImage }>(url, {method: 'post'});
        return res?.image ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("postTagImage()", err.message);
            return Promise.reject(err);
        }
        console.warn("postTagImage()", err);
        return Promise.reject(new Error('Error in postTagImage()'));
    }
}

export async function postPreferredImage(filename: string, itemCode: string): Promise<ProductImage|null> {
    try {
        const url = PATH_SET_PREFERRED_ITEM.replace(':filename', encodeURIComponent(filename))
            .replace(':itemCode', itemCode);
        const res = await fetchJSON<{ image: ProductImage }>(url, {method: 'POST'});
        return res?.image ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("setPreferredImage()", err.message);
            return Promise.reject(err);
        }
        console.warn("setPreferredImage()", err);
        return Promise.reject(new Error('Error in setPreferredImage()'));
    }
}
