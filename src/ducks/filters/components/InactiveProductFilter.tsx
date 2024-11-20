import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "../selectors";
import {toggleActiveProducts} from "../actions";
import FormCheck from 'react-bootstrap/FormCheck'

const InactiveProductFilter = () => {
    const dispatch = useAppDispatch();
    const {activeProducts} = useSelector(selectFilter);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleActiveProducts(ev.target.checked));
    }
    return (
        <FormCheck type={"checkbox"} label={"Show Inactive Items"} id={id}
                   checked={!activeProducts} onChange={changeHandler}/>
    )
}

export default InactiveProductFilter;
