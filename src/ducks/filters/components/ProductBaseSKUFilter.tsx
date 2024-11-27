import React, {ChangeEvent} from 'react';
import {useSelector} from "react-redux";
import {selectBaseSKUs, selectFilter} from "../selectors";
import {sortBaseSKUs} from "../utils";
import {useSearchParams} from "react-router";

const ProductBaseSKUFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const list = useSelector(selectBaseSKUs);
    const {baseSKU} = useSelector(selectFilter);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        setSearchParams((prev) => {
            if (ev.target.value) {
                prev.set('baseSKU', ev.target.value);
            } else {
                prev.delete('baseSKU');
            }
            return prev;
        })
    }

    return (
        <div className="mb-3">
            <label className="form-label">Base SKU</label>
            <select className="form-select form-select-sm" value={baseSKU ?? ''} onChange={changeHandler}>
                <option value="">All</option>
                {[...list]
                    .sort(sortBaseSKUs)
                    .map(sku => (
                            <option key={sku.Category4} value={sku.Category4}>
                                {sku.Category4} - {sku.description}
                            </option>
                        )
                    )}
            </select>
        </div>
    )
}

export default ProductBaseSKUFilter;
