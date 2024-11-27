import React, {ChangeEvent} from 'react';
import {useSelector} from "react-redux";
import {selectCategories, selectFilter} from "../selectors";
import {sortCategories} from "../utils";
import {useSearchParams} from "react-router";

const ProductCategoryFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const categories = useSelector(selectCategories);
    const {category} = useSelector(selectFilter);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        setSearchParams((prev) => {
            if (ev.target.value) {
                prev.set('cat', ev.target.value);
            } else {
                prev.delete('cat');
            }
            return prev;
        })
    }

    return (
        <div className="mb-3">
            <label className="form-label">Product Category</label>
            <select className="form-select form-select-sm" value={category ?? ''} onChange={changeHandler}>
                <option value="">All</option>
                {[...categories]
                    .sort(sortCategories)
                    .map(cat => (
                            <option key={cat.Category2} value={cat.Category2}>
                                {cat.Category2} - {cat.description}
                            </option>
                        )
                    )}
            </select>
        </div>
    )
}

export default ProductCategoryFilter;
