import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "./selectors";
import {FormCheck} from "chums-components";
import {toggleActiveImages} from "./actions";

const InactiveProductFilter = () => {
    const dispatch = useAppDispatch();
    const {activeImages} = useSelector(selectFilter);
    return (
        <FormCheck type={"checkbox"} label={"Show Inactive Images"} checked={!activeImages}
                   onChange={() => dispatch(toggleActiveImages(!activeImages))}/>
    )
}

export default InactiveProductFilter;
