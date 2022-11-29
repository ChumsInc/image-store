import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectBaseSKUs, selectCategories, selectCollections, selectFilter, selectProductLines} from "./selectors";
import {sortBaseSKUs, sortCategories, sortCollections, sortProductLines} from "./utils";
import {setBaseSKU, setProductCategory, setProductCollection, setProductLine} from "./actions";

const ProductCollectionFilter = () => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectCollections);
    const {collection} = useSelector(selectFilter);

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setProductCollection(ev.target.value));
    }

    return (
        <div>
            <label className="form-label">Collection</label>
            <select className="form-select form-select-sm" value={collection ?? ''} onChange={changeHandler}>
                <option value="">All</option>
                {[...list]
                    .sort(sortCollections)
                    .map(item => (
                            <option key={item.Category3} value={item.Category3}>
                                {item.Category3}
                            </option>
                        )
                    )}
            </select>
        </div>
    )
}

export default ProductCollectionFilter;
