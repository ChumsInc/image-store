import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "./selectors";
import {FormCheck} from "chums-components";
import {toggleFeaturedImage} from "./actions";

const PreferredImageFilter = () => {
    const dispatch = useAppDispatch();
    const {preferredImage} = useSelector(selectFilter);

    const changeHandler = () => {
        dispatch(toggleFeaturedImage(!preferredImage));
    }

    return (
        <FormCheck type={"checkbox"} label={"Filter Preferred Images"} checked={preferredImage}
                   onChange={changeHandler}/>
    )
}

export default PreferredImageFilter;
