import React, {useEffect} from 'react';
import {fetchFilters} from "./index";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useSelector} from "react-redux";

const ProductFilters = () => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => {
        return state['productFilters']
    })
    useEffect(() => {
        dispatch(fetchFilters());
    }, [])

    return (
        <div>
            <div className="text-muted">Loading: {filters.loading}</div>
            {JSON.stringify(Object.keys(filters), undefined, 2)}
        </div>
    )
}

export default ProductFilters;
