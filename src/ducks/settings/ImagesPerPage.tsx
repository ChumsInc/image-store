import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectImagesPerPage, setImagesPerPage} from "./index";
import {RowsPerPage} from "chums-components";
import {localStorageKeys, setPreference} from "../../api/preferences";

const ImagesPerPage = () => {
    const dispatch = useAppDispatch();
    const imagesPerPage = useSelector(selectImagesPerPage);
    const labelId = useId();
    const selectId = useId();

    const changeHandler = (value:number) => {
        setPreference(localStorageKeys.imagesPerPage, value);
        dispatch(setImagesPerPage(value));
    }

    return (
        <div className="input-group input-group-sm">
            <div className="input-group-text">
                <label className="bi-images" aria-label="Images per Page" htmlFor={selectId} id={labelId}/>
            </div>
            <RowsPerPage value={imagesPerPage} onChange={changeHandler} bsSize="sm" id={selectId} aria-labelledby={labelId}/>
        </div>
    )
}

export default ImagesPerPage;
