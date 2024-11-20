import React, {useEffect} from 'react';
import {loadFilters} from "../actions";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter, selectFiltersLoaded, selectFiltersLoading} from "../selectors";

const ProductFilters = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectFiltersLoading);
    const loaded = useSelector(selectFiltersLoaded);
    const filters = useAppSelector(selectFilter);

    useEffect(() => {
        if (!loading && !loaded) {
            dispatch(loadFilters());
        }
    }, [])

    return (
        <div>
            {JSON.stringify(Object.keys(filters), undefined, 2)}
        </div>
    )
}

export default ProductFilters;
