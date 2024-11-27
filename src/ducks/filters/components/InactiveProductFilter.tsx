import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "../selectors";
import {toggleInactiveProducts} from "../actions";
import FormCheck from 'react-bootstrap/FormCheck'
import {useSearchParams} from "react-router";

const InactiveProductFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {inactiveProducts} = useSelector(selectFilter);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        setSearchParams((prev) => {
            if (ev.target.checked) {
                prev.set('inactiveProducts', '1');
            } else {
                prev.delete('inactiveProducts');
            }
            return prev;
        })
    }
    return (
        <FormCheck type={"checkbox"} label={"Show Inactive Items"} id={id}
                   checked={inactiveProducts} onChange={changeHandler}/>
    )
}

export default InactiveProductFilter;
