import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "./selectors";
import {FormCheck} from "chums-components";
import {toggleActive} from "./actions";

const InactiveImageFilter = () => {
    const dispatch = useAppDispatch();
    const {active} = useSelector(selectFilter);
    return (
        <FormCheck type={"checkbox"} label={"Show Inactive Items"} checked={!active} onChange={() => dispatch(toggleActive(!active))} />
    )
}

export default InactiveImageFilter;
