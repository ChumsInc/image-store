import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectImagePath, selectImagesPerPage, setImagePath, setImagesPerPage} from "./index";
import {RowsPerPage} from "chums-components";
import {IMAGE_PATHS} from "../../constants/image";
import {ImageSizePath} from "chums-types/product-image";

const ImagesSize = () => {
    const dispatch = useAppDispatch();
    const path = useSelector(selectImagePath);
    const labelId = useId();
    const selectId = useId();

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        dispatch(setImagePath(ev.target.value as ImageSizePath));
    }

    return (
        <div className="input-group input-group-sm">
            <div className="input-group-text">
                <label className="bi-aspect-ratio" aria-label="Images Size" htmlFor={selectId} id={labelId}/>
            </div>
            <select value={path} onChange={changeHandler} className="form-select form-select-sm" id={selectId} aria-labelledby={labelId}>
                {IMAGE_PATHS.map(size => (<option key={size} value={size}>{size} x {size}</option>))}
            </select>
        </div>
    )
}

export default ImagesSize;
