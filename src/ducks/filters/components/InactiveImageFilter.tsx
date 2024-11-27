import React, {ChangeEvent, useId, useState} from 'react';
import {useAppDispatch} from "../../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "../selectors";
import {toggleInactiveImages} from "../actions";
import FormCheck from 'react-bootstrap/FormCheck'
import {useSearchParams} from "react-router";

const InactiveProductFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {inactiveImages} = useSelector(selectFilter);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        setSearchParams(prev => {
            if (ev.target.checked) {
                prev.set('inactiveImages', '1');
            } else {
                prev.delete('inactiveImages');
            }
            return prev;
        })
    }
    return (
        <FormCheck type={"checkbox"} label={"Show Inactive Images"} id={id}
                   checked={inactiveImages} onChange={changeHandler}/>
    )
}

export default InactiveProductFilter;
