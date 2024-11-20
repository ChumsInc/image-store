import React, {ChangeEvent, useEffect, useId, useRef, useState} from 'react';
import {useAppDispatch} from "../../../app/hooks";
import {useSelector} from "react-redux";
import {selectSearch} from "../selectors";
import {setSearch} from "../actions";
import {FormControl, InputGroup} from "react-bootstrap";

const ImageSearch = () => {
    const dispatch = useAppDispatch();
    const search = useSelector(selectSearch);
    const [value, setValue] = useState(search);
    const timerHandle = useRef<number>(0);
    const id = useId();

    useEffect(() => {

        return () => {
            window.clearTimeout(timerHandle.current);
        }
    }, [])
    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        window.clearTimeout(timerHandle.current);
        setValue(ev.target.value);

        timerHandle.current = window.setTimeout(
            () => {
                dispatch(setSearch(ev.target.value));
            },
            450);
    }

    const blurHandler = () => {
        window.clearTimeout(timerHandle.current);
        dispatch(setSearch(value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id} aria-label="Search for images">
                <span className="bi-funnel-fill" aria-hidden/>
            </InputGroup.Text>
            <FormControl type="search" size="sm" value={value} onChange={changeHandler} onBlur={blurHandler}/>
        </InputGroup>
    )
}
export default ImageSearch;
