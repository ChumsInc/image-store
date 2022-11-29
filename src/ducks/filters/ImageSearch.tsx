import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectSearch} from "./selectors";
import {setSearch} from "./actions";

const ImageSearch = () => {
    const dispatch = useAppDispatch();
    const search = useSelector(selectSearch);
    const [value, setValue] = useState(search);
    const [timerHandle, setTimerHandle] = useState(0);

    useEffect(() => {

        return () => {
            window.clearTimeout(timerHandle);
        }
    }, [])
    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        window.clearTimeout(timerHandle);
        setValue(ev.target.value);

        setTimerHandle(window.setTimeout(() => {
            dispatch(setSearch(ev.target.value));
        }, 450));
    }

    const blurHandler = () => {
        window.clearTimeout(timerHandle);
        dispatch(setSearch(value));
    }

    return (
        <div className="input-group input-group-sm">
            <div className="input-group-text">
                <span className="bi-funnel-fill" />
            </div>
            <input type="search" className="form-control form-select-sm" value={value}
                   onChange={changeHandler} onBlur={blurHandler}/>
        </div>
    )
}
export default ImageSearch;
