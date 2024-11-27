import React, {ChangeEvent, useId} from 'react';
import {useSelector} from "react-redux";
import {selectFilter} from "../selectors";
import FormCheck from 'react-bootstrap/FormCheck'
import {useSearchParams} from "react-router";

const PreferredImageFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {preferredImage} = useSelector(selectFilter);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setSearchParams((prev) => {
            if (ev.target.checked) {
                prev.set('preferredImage', '1');
            } else {
                prev.delete('preferredImage');
            }
            return prev;
        })
    }

    return (
        <FormCheck type={"checkbox"} label={"Filter Preferred Images"} id={id}
                   checked={preferredImage} onChange={changeHandler}/>
    )
}

export default PreferredImageFilter;
