import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "./selectors";
import {FormCheck} from "chums-components";
import {toggleActiveProducts} from "./actions";

const InactiveProductFilter = () => {
    const dispatch = useAppDispatch();
    const {activeProducts} = useSelector(selectFilter);
    return (
        <FormCheck type={"checkbox"} label={"Show Inactive Items"} checked={!activeProducts}
                   onChange={() => dispatch(toggleActiveProducts(!activeProducts))}/>
    )
}

export default InactiveProductFilter;
