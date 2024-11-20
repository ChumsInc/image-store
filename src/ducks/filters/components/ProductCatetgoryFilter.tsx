import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../../app/hooks";
import {useSelector} from "react-redux";
import {selectCategories, selectFilter, selectProductLines} from "../selectors";
import {sortCategories, sortProductLines} from "../utils";
import {setProductCategory, setProductLine} from "../actions";

const ProductCategoryFilter = () => {
    const dispatch = useAppDispatch();
    const categories = useSelector(selectCategories);
    const {category} = useSelector(selectFilter);

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setProductCategory(ev.target.value));
    }

    return (
        <div>
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
