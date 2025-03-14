import React, {useId} from 'react';
import {useAppDispatch} from "@/app/hooks";
import {useSelector} from "react-redux";
import {selectImagesPerPage, setImagesPerPage} from "./index";
import {RowsPerPage} from "@chumsinc/sortable-tables";
import {localStorageKeys, setPreference} from "@/api/preferences";

const ImagesPerPage = () => {
    const dispatch = useAppDispatch();
    const imagesPerPage = useSelector(selectImagesPerPage);
    const labelId = useId();
    const selectId = useId();

    const changeHandler = (value: number) => {
        setPreference(localStorageKeys.imagesPerPage, value);
        dispatch(setImagesPerPage(value));
    }

    return (
        <RowsPerPage value={imagesPerPage} onChange={changeHandler} aria-label="images per page"
                     label={<span className="bi-images"/>} size="sm" id={selectId} aria-labelledby={labelId}/>
    )
}

export default ImagesPerPage;
