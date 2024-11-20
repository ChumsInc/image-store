import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "../selectors";
import FormCheck from 'react-bootstrap/FormCheck'
import {toggleFeaturedImage} from "../actions";

const PreferredImageFilter = () => {
    const dispatch = useAppDispatch();
    const {preferredImage} = useSelector(selectFilter);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleFeaturedImage(ev.target.checked));
    }

    return (
        <FormCheck type={"checkbox"} label={"Filter Preferred Images"} id={id}
                   checked={preferredImage} onChange={changeHandler}/>
    )
}

export default PreferredImageFilter;
