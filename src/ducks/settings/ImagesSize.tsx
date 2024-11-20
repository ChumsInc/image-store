import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectImagePath, setImagePath} from "./index";
import {ImageSizePath} from "chums-types";
import {localStorageKeys, setPreference} from "../../api/preferences";


export const IMAGE_PATHS = ['80', '125', '250', '400'];

const ImagesSize = () => {
    const dispatch = useAppDispatch();
    const path = useSelector(selectImagePath);
    const labelId = useId();
    const selectId = useId();

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        setPreference(localStorageKeys.imageSize, '250');
        dispatch(setImagePath(ev.target.value as ImageSizePath));
    }

    return (
        <div className="input-group input-group-sm">
            <div className="input-group-text">
                <label className="bi-aspect-ratio" aria-label="Images Size" htmlFor={selectId} id={labelId}/>
            </div>
            <select value={path} onChange={changeHandler} className="form-select form-select-sm" id={selectId}
                    aria-labelledby={labelId}>
                {IMAGE_PATHS.map(size => (<option key={size} value={size}>{size} x {size}</option>))}
            </select>
        </div>
    )
}

export default ImagesSize;
