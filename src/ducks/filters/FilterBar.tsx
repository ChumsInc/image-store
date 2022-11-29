import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectFiltersLoaded, selectFiltersLoading, selectShowFilterBar} from "./selectors";
import {loadFilters, toggleFilterBar} from "./actions";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProductLineFilter from "./ProductLineFilter";
import {selectCanEdit, selectIsUser, selectUserIsLoaded, selectUserIsLoading} from "../userProfile";
import {loadUser} from "../userProfile/actions";
import ProductCategoryFilter from "./ProductCatetgoryFilter";
import ProductBaseSKUFilter from "./ProductBaseSKUFilter";
import ProductCollectionFilter from "./ProductCollectionFilter";
import InactiveImageFilter from "./InactiveImageFilter";
import PreferredImageFilter from "./PreferredImageFilter";
import UnassignedImageFilter from "./UnassignedImageFilter";
import ToggleEditMode from "../userProfile/ToggleEditMode";


const FilterBar = () => {
    const dispatch = useAppDispatch();
    const showFilterBar = useSelector(selectShowFilterBar);
    const isSmall = useMediaQuery('(max-width: 600px)');
    const [inTransition, setInTransition] = useState(false);
    const [timer, setTimer] = useState(0);
    const isUser = useSelector(selectIsUser);
    const canEdit = useSelector(selectCanEdit);
    const userLoading = useSelector(selectUserIsLoading);
    const userLoaded = useSelector(selectUserIsLoaded);
    const filtersLoading = useSelector(selectFiltersLoading);
    const filtersLoaded = useSelector(selectFiltersLoaded);


    useEffect(() => {
        if (!userLoading && !userLoaded) {
            dispatch(loadUser())
        }
        return () => {
            window.clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (isUser && !filtersLoading && !filtersLoaded) {
            dispatch(loadFilters());
        }
    }, [isUser])

    useEffect(() => {
        dispatch(toggleFilterBar(!isSmall));
    }, [isSmall]);

    useEffect(() => {
        window.clearTimeout(timer);
        setInTransition(true);
        setTimer(() => window.setTimeout(() => {
            setInTransition(false);
        }, 450));
    }, [showFilterBar])

    const toggleFilterBarHandler = () => {
        dispatch(toggleFilterBar());
    }

    const asideClassName = classNames("drawer navbar", {
        'drawer--open': showFilterBar,
        'drawer--in-transition': inTransition
    });
    if (!isUser) {
        return null;
    }
    return (
        <aside className={asideClassName}>
            <div className="navbar-light">
                <button className="navbar-toggler" onClick={toggleFilterBarHandler}>
                    <span className="navbar-toggler-icon"/>
                </button>
            </div>
            <div className="form bg-light" style={{visibility: showFilterBar ? 'visible' : 'hidden'}}>
                <hr/>
                <h4>Filters</h4>
                <ProductLineFilter/>
                <ProductCategoryFilter/>
                <ProductBaseSKUFilter/>
                <ProductCollectionFilter/>
                <hr/>
                <h4>Options</h4>
                <PreferredImageFilter/>
                <UnassignedImageFilter/>
                <InactiveImageFilter/>
                <ToggleEditMode />
            </div>
        </aside>
    )
}

export default FilterBar;
