export const invalidHashValue = '#N/A';

export interface ProductFilter {
    baseSKU: string | null;
    category: string | null;
    collection: string | null;
    productLine: string | null;
    preferredImage: boolean;
    inactiveProducts?: boolean;
    inactiveImages?: boolean;
}


export type ProductFilterKey = keyof ProductFilter;

