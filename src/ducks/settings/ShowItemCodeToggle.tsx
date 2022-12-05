import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {FormCheck} from "chums-components";
import {selectShowItemCode, toggleShowItemCode} from "./index";

const ShowItemCodeToggle = () => {
    const dispatch = useAppDispatch();
    const show = useSelector(selectShowItemCode);
    return (
        <FormCheck type={"checkbox"} label={"Show Item Codes"} checked={show} onChange={(ev) => dispatch(toggleShowItemCode(ev.target.checked))} />
    )
}

export default ShowItemCodeToggle;
