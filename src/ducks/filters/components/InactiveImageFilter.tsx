import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "../selectors";
import {toggleActiveImages} from "../actions";
import FormCheck from 'react-bootstrap/FormCheck'

const InactiveProductFilter = () => {
    const dispatch = useAppDispatch();
    const {activeImages} = useSelector(selectFilter);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleActiveImages(ev.target.checked))
    }
    return (
        <FormCheck type={"checkbox"} label={"Show Inactive Images"} id={id}
                   checked={!activeImages} onChange={changeHandler}/>
    )
}

export default InactiveProductFilter;
