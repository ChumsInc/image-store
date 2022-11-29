import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectBaseSKUs, selectCategories, selectFilter, selectProductLines} from "./selectors";
import {sortBaseSKUs, sortCategories, sortProductLines} from "./utils";
import {setBaseSKU, setProductCategory, setProductLine} from "./actions";

const ProductBaseSKUFilter = () => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectBaseSKUs);
    const {baseSKU} = useSelector(selectFilter);

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setBaseSKU(ev.target.value));
    }

    return (
        <div>
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
