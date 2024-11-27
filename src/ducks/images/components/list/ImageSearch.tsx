import React, {ChangeEvent, useCallback, useEffect, useId, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {FormControl, InputGroup} from "react-bootstrap";
import {selectSearch} from "../../selectors";
import {useAppDispatch} from "../../../../app/hooks";
import {setSearch} from "../../actions";

const ImageSearch = () => {
    const dispatch = useAppDispatch();
    const search = useSelector(selectSearch);
    const [value, setValue] = useState(search);
    const timerHandle = useRef<number>(0);
    const id = useId();

    const updateSearch = useCallback(() => {
        dispatch(setSearch(value))
    }, [value]);

    useEffect(() => {

        return () => {
            window.clearTimeout(timerHandle.current);
        }
    }, []);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        window.clearTimeout(timerHandle.current);
        setValue(ev.target.value);

        timerHandle.current = window.setTimeout(updateSearch, 450);
    }

    const blurHandler = () => {
        window.clearTimeout(timerHandle.current);
        updateSearch();
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
