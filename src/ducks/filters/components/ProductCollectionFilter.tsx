import React, {ChangeEvent} from 'react';
import {useSelector} from "react-redux";
import {selectCollections, selectFilter} from "../selectors";
import {sortCollections} from "../utils";
import {useSearchParams} from "react-router";

const ProductCollectionFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const list = useSelector(selectCollections);
    const {collection} = useSelector(selectFilter);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        setSearchParams((prev) => {
            if (ev.target.value) {
                prev.set('collection', ev.target.value);
            } else {
                prev.delete('collection')
            }
            return prev;
        })
    }

    return (
        <div className="mb-3">
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
