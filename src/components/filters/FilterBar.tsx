import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import {useAppDispatch} from "@/app/hooks";
import {useSelector} from "react-redux";
import {loadFilters} from "@/ducks/filters/actions";
import ProductLineFilter from "@/components/filters/ProductLineFilter";
import {selectIsUser, selectUserIsLoaded, selectUserIsLoading} from "@/ducks/userProfile";
import {loadUser} from "@/ducks/userProfile/actions";
import ProductCategoryFilter from "@/ducks/filters/components/ProductCatetgoryFilter";
import ProductBaseSKUFilter from "@/components/filters/ProductBaseSKUFilter";
import ProductCollectionFilter from "@/components/filters/ProductCollectionFilter";
import InactiveProductFilter from "@/ducks/filters/components/InactiveProductFilter";
import PreferredImageFilter from "@/ducks/filters/components/PreferredImageFilter";
import UnassignedImageFilter from "@/ducks/filters/components/UnassignedImageFilter";
import ToggleEditMode from "@/ducks/userProfile/ToggleEditMode";
import ShowItemCodeToggle from "@/ducks/settings/ShowItemCodeToggle";
import InactiveImageFilter from "@/ducks/filters/components/InactiveImageFilter";
import {Button, NavbarToggle, Offcanvas} from "react-bootstrap";
import {useMediaQuery} from "react-responsive";
import {
    selectFiltersLoaded,
    selectFiltersStatus,
    selectShowFilterBar,
    toggleFilterBar
} from "@/ducks/filters/filtersSlice";


const FilterBar = () => {
    const dispatch = useAppDispatch();
    const showFilterBar = useSelector(selectShowFilterBar);
    const isSmall = useMediaQuery({query: '(max-width: 600px)'});
    const [inTransition, setInTransition] = useState(false);
    const [timer, setTimer] = useState(0);
    const isUser = useSelector(selectIsUser);
    const userLoading = useSelector(selectUserIsLoading);
    const userLoaded = useSelector(selectUserIsLoaded);
    const filtersLoading = useSelector(selectFiltersStatus);
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
        if (isUser && !filtersLoaded) {
            dispatch(loadFilters());
        }
    }, [isUser])

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

    const asideClassName = classNames("drawer navbar bg-body-tertiary", {
        'drawer--open': showFilterBar,
        'drawer--in-transition': inTransition
    });

    if (!isUser) {
        return null;
    }

    return (
        <>
            <Button size="sm" onClick={toggleFilterBarHandler}>Filters <span className="bi-filter ms-1" /> </Button>
            <Offcanvas show={showFilterBar} onHide={toggleFilterBarHandler} scroll>
                <Offcanvas.Header>
                    <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ProductLineFilter className="mb-1"/>
                    <ProductCategoryFilter className="mb-1"/>
                    <ProductBaseSKUFilter className="mb-1"/>
                    <ProductCollectionFilter className="mb-1"/>
                    <hr/>
                    <PreferredImageFilter/>
                    <InactiveProductFilter/>
                    <InactiveImageFilter/>
                    <hr/>
                    <h4>Other Options</h4>
                    <UnassignedImageFilter/>
                    <ToggleEditMode/>
                    <ShowItemCodeToggle/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default FilterBar;
