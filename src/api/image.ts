import {
    PATH_DELETE_IMAGE, PATH_FETCH_IMAGE,
    PATH_FETCH_IMAGES,
    PATH_SET_ALT_ITEM_CODE,
    PATH_SET_PREFERRED_ITEM,
    PATH_SET_TAG
} from "../constants/image";
import {ProductImage, ProductAltItem} from 'chums-types/product-image'
import {fetchJSON} from "chums-components";
import {fetchPOST} from "../fetch";
import {ProductFilter} from "../ducks/filters";

export async function fetchImages(filter:ProductFilter):Promise<ProductImage[]> {
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

export async function fetchImage(filename:string):Promise<ProductImage> {
    try {
        const url = PATH_FETCH_IMAGE.replace(':filename', encodeURIComponent(filename));
        const {image} = await fetchJSON<{image: ProductImage}>(url);
        return image;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("fetchImage()", err.message);
            return Promise.reject(err);
        }
        console.warn("fetchImage()", err);
        return Promise.reject(new Error('Error in fetchImage()'));
    }
}

export async function putImageUpdate(productImage:Partial<ProductImage>):Promise<ProductImage|null> {
    try {
        if (!productImage || !productImage.filename) {
            return Promise.reject(new Error('putImageUpdate(): Filename is required'))
        }
        const url = '/api/images/products/:filename'
            .replace(':filename', encodeURIComponent(productImage.filename));
        const body = JSON.stringify(productImage);
        const {image} = await fetchJSON<{image:ProductImage|null}>(url, {method: 'put', body});
        return image ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("putImageUpdate()", err.message);
            return Promise.reject(err);
        }
        console.debug("putImageUpdate()", err);
        return Promise.reject(new Error('Error in putImageUpdate()'));
    }
}

export async function postItemCode(filename:string, itemCode: string):Promise<ProductImage|null> {
    try {
        const url = '/api/images/products/set-preferred-item/:filename/:itemCode'
            .replace(':filename', encodeURIComponent(filename))
            .replace(':itemCode', encodeURIComponent(itemCode));
        const {image} = await fetchJSON<{image:ProductImage|null}>(url, {method: 'POST'});
        return image ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("postItemCode()", err.message);
            return Promise.reject(err);
        }
        console.debug("postItemCode()", err);
        return Promise.reject(new Error('Error in postItemCode()'));
    }
}

export async function postAltItemCode(filename:string, itemCode:string):Promise<ProductAltItem[]> {
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

export async function deleteAltItemCode(filename:string, id: number):Promise<ProductAltItem[]> {
    try {
        const url = PATH_SET_ALT_ITEM_CODE
            .replace(':filename', encodeURIComponent(filename))
            .replace(':itemCode', encodeURIComponent(id));
        const {altItems} = await fetchJSON<{altItems: ProductAltItem[]}>(url, {method: 'delete'})
        return altItems;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("deleteAltItemCode()", err.message);
            return Promise.reject(err);
        }
        console.debug("deleteAltItemCode()", err);
        return Promise.reject(new Error('Error in deleteAltItemCode()'));
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

export async function deleteImage(filename: string):Promise<ProductImage[]> {
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

export async function deleteImageTag(filename: string, tag: string): Promise<ProductImage | null> {
    try {
        const url = PATH_SET_TAG
            .replace(':filename', encodeURIComponent(filename))
            .replace(':tag', encodeURIComponent(tag));
        const {image} = await fetchJSON<{ image: ProductImage }>(url, {method: 'delete'});
        return image ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.warn("deleteImageTag()", err.message);
            return Promise.reject(err);
        }
        console.warn("deleteImageTag()", err);
        return Promise.reject(new Error('Error in deleteImageTag()'));
    }
}

export async function postTagImage(filename: string, tag:string):Promise<ProductImage> {
    try {
        const url = PATH_SET_TAG
            .replace(':filename', encodeURIComponent(filename))
            .replace(':tag', encodeURIComponent(tag));
        const {image} = await fetchJSON<{ image: ProductImage }>(url, {method: 'post'});
        return image
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("postTagImage()", err.message);
            return Promise.reject(err);
        }
        console.warn("postTagImage()", err);
        return Promise.reject(new Error('Error in postTagImage()'));
    }
}

export async function postPreferredImage(filename: string, itemCode: string):Promise<ProductImage> {
    try {
        const url = PATH_SET_PREFERRED_ITEM.replace(':filename', encodeURIComponent(filename))
            .replace(':itemCode', itemCode);
        const {image} = await fetchJSON<{image:ProductImage}>(url, {method: 'POST'});
        return image;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.warn("setPreferredImage()", err.message);
            return Promise.reject(err);
        }
        console.warn("setPreferredImage()", err);
        return Promise.reject(new Error('Error in setPreferredImage()'));
    }
}
