import React, {ChangeEvent, useEffect, useId} from 'react';
import {useSelector} from "react-redux";
import {FormControl, InputGroup} from "react-bootstrap";
import {selectSearch} from "../../selectors";
import {useAppDispatch} from "../../../../app/hooks";
import {setSearch} from "../../actions";
import {useDebounceValue} from "usehooks-ts";

const ImageSearch = () => {
    const dispatch = useAppDispatch();
    const search = useSelector(selectSearch);
    const id = useId();
    const [value, setValue] = useDebounceValue(search, 500);

    useEffect(() => {
        setValue(search);
    }, [search]);

    useEffect(() => {
        dispatch(setSearch(value));
    }, [value]);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.value);
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id} aria-label="Search for images">
                <span className="bi-funnel-fill" aria-hidden/>
            </InputGroup.Text>
            <FormControl type="search" size="sm" defaultValue={search} onChange={changeHandler}/>
        </InputGroup>
    )
}
export default ImageSearch;
