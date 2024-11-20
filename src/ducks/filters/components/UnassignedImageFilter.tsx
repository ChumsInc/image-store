import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "../selectors";
import FormCheck from 'react-bootstrap/FormCheck'
import {toggleActiveProducts, toggleAssigned} from "../actions";

const UnassignedImageFilter = () => {
    const dispatch = useAppDispatch();
    const {assigned} = useSelector(selectFilter);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleAssigned(ev.target.checked))
    }
    return (
        <FormCheck type={"checkbox"} label={"Show Unassigned Images"} id={id}
                   checked={!assigned} onChange={changeHandler} />
    )
}

export default UnassignedImageFilter;
