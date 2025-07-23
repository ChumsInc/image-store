import {type ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {FormCheck} from "react-bootstrap";
import {selectShowItemCode, toggleShowItemCode} from "./index";

const ShowItemCodeToggle = () => {
    const dispatch = useAppDispatch();
    const show = useSelector(selectShowItemCode);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleShowItemCode(ev.target.checked))
    }

    return (
        <FormCheck type={"checkbox"} label={"Show Item Codes"} id={id} checked={show} onChange={changeHandler} />
    )
}

export default ShowItemCodeToggle;
