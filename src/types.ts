export interface Warehouse {
    WarehouseCode: string,
    WarehouseDesc: string,
    WarehouseStatus: string
}
export interface ProductLine {
    ProductLine: string,
    ProductLineDesc: string,
    ProductType: string,
    Valuation: '1'|'2'|'3'|'4'|'5'|'6',
    ExplodedKitItems: 'P'|'N'|'A',
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
    active:boolean,
    notes:string|null,
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
    [key:string]: ImageSize,
}
export interface ColorSpaceList {
    [key:string]: string,
}
export interface ImageFormatList {
    [key:string]: string,
}

export interface ImageRecord {
    filename: string,
    pathnames: string[],
    sizes: ImageSizeList,
    color_space?: ColorSpaceList,
    img_format?: ImageFormatList,
    tags: string[],
    notes: string,
    item_code?: string,
    timestamp:string,
    ItemCodeDesc?: string,
    InactiveItem?:string,
    ProductType?: string,
    ProductLine?: string,
    Category1?:string|null,
    Category?:string|null,
    ItemCollection?: string|null,
    BaseSKU?:string,
    item_codes?: string[],
}
