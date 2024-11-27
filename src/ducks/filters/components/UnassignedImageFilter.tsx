import React, {ChangeEvent, useId} from 'react';
import {useSelector} from "react-redux";
import FormCheck from 'react-bootstrap/FormCheck'
import {selectShowUnassigned} from "../../images/selectors";
import {useAppDispatch} from "../../../app/hooks";
import {toggleFilterUnassigned} from "../../images/actions";

const UnassignedImageFilter = () => {
    const dispatch = useAppDispatch();
    const showUnassigned = useSelector(selectShowUnassigned);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleFilterUnassigned(ev.target.checked))
    }

    return (
        <FormCheck type={"checkbox"} label={"Only Unassigned Images"} id={id}
                   checked={showUnassigned} onChange={changeHandler}/>
    )
}

export default UnassignedImageFilter;
