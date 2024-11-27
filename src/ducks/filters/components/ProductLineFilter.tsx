import React, {ChangeEvent} from 'react';
import {useAppDispatch} from "../../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter, selectProductLines} from "../selectors";
import {sortProductLines} from "../utils";
import {setProductLine} from "../actions";
import {useSearchParams} from "react-router";

const ProductLineFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const productLines = useSelector(selectProductLines);
    const {productLine} = useSelector(selectFilter);

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        setSearchParams((prev) => {
            if (ev.target.value) {
                prev.set('pl', ev.target.value);
            } else {
                prev.delete('pl');
            }
            return prev;
        })
    }

    return (
        <div className="mb-3">
            <label className="form-label">Product Line</label>
            <select className="form-select form-select-sm" value={productLine ?? ''} onChange={changeHandler}>
                <option value="">All</option>
                {[...productLines]
                    .sort(sortProductLines)
                    .map(pl => (
                            <option key={pl.ProductLine} value={pl.ProductLine}>
                                {pl.ProductLineDesc} [{pl.ProductLine}]
                            </option>
                        )
                    )}
            </select>
        </div>
    )
}

export default ProductLineFilter;
