import {ProductCategory, ProductCollection, ProductImage} from "chums-types";
import {BasicAlert} from "@chumsinc/alert-list";

export interface ErrorAlert extends BasicAlert {
    id: number;
    count: number;
}


export interface Warehouse {
    WarehouseCode: string,
    WarehouseDesc: string,
    WarehouseStatus: string
}

export interface ProductLine {
    ProductLine: string,
    ProductLineDesc: string,
    ProductType: string,
    Valuation: '1' | '2' | '3' | '4' | '5' | '6',
    ExplodedKitItems: 'P' | 'N' | 'A',
    active: boolean,
}

export interface Category {
    Category2: string,
    id: number,
    code: string,
    description: string,
    active: boolean,
    notes: string,
    tags: unknown,
    productLine: string,
}

export interface Collection {
    Category3: string,
}

export interface BaseSKU {
    Category4: string,
    id: number,
    sku_group_id: number,
    sku: string,
    description: string,
    upc: string,
    active: boolean,
    notes: string | null,
    tags: unknown,
}

export interface PrimaryVendor {
    PrimaryVendorNo: string,
    VendorName: string,
}

export interface CountryOfOrigin {
    countryOfOrigin: string,
}

export interface ImageSize {
    width: number,
    height: number,
    size: number,
}

export interface ImageSizeList {
    [key: string]: ImageSize,
}

export interface ColorSpaceList {
    [key: string]: string,
}

export interface ImageFormatList {
    [key: string]: string,
}

export interface EditableImage extends ProductImage {
    changed?: boolean;
    saving?: boolean;
    loading?: boolean;
}


export interface LoadFiltersResult {
    baseSKUs: BaseSKU[];
    categories: ProductCategory[];
    collections: ProductCollection[];
    productLines: ProductLine[],
}


export interface ProductAltItemKey {
    id: number,
    filename: string,
    item_code: string,
}

export interface SingleImage {
    filename: string;
    path: string;
    size?: ImageSize,
    colorSpace?: string;
    imageFormat?: string;
}

export interface FilterExtraState {
    value: string|null;
}
