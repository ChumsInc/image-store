import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "./selectors";
import {FormCheck} from "chums-components";
import {toggleActive, toggleAssigned} from "./actions";

const UnassignedImageFilter = () => {
    const dispatch = useAppDispatch();
    const {assigned} = useSelector(selectFilter);
    return (
        <FormCheck type={"checkbox"} label={"Show Unassigned Images"} checked={!assigned} onChange={() => dispatch(toggleAssigned(!assigned))} />
    )
}

export default UnassignedImageFilter;
