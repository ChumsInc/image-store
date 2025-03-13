import React, {ChangeEvent, useEffect, useId} from 'react';
import {useAppDispatch} from "@/app/hooks";
import {useSelector} from "react-redux";
import {toggleInactiveProducts} from "../actions";
import FormCheck from 'react-bootstrap/FormCheck'
import {useSearchParams} from "react-router";
import {selectShowInactiveProducts} from "@/ducks/filters/filtersSlice";

const InactiveProductFilter = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const checked = useSelector(selectShowInactiveProducts);
    const id = useId();

    useEffect(() => {
        setSearchParams((prev) => {
            if (checked) {
                prev.set('inactiveProducts', '1');
            } else {
                prev.delete('inactiveProducts');
            }
            return prev;
        })
    }, [checked]);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleInactiveProducts(ev.target.checked))
    }
    return (
        <FormCheck type={"checkbox"} label={"Show Inactive Items"} id={id}
                   checked={checked} onChange={changeHandler}/>
    )
}

export default InactiveProductFilter;
