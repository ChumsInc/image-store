import {type ChangeEvent, useEffect, useId} from 'react';
import {useSelector} from "react-redux";
import {FormControl, InputGroup} from "react-bootstrap";
import {useAppDispatch} from "@/app/hooks";
import {useDebounceValue} from "usehooks-ts";
import {selectSearch, setSearch} from "@/ducks/filters/filtersSlice";
import {useSearchParams} from "react-router";

const ImageSearch = () => {
    const dispatch = useAppDispatch();
    const [, setSearchParams] = useSearchParams();
    const search = useSelector(selectSearch);
    const id = useId();
    const [value, setValue] = useDebounceValue(search, 500);

    useEffect(() => {
        setValue(search);
        try {
            // @ts-ignore
            const re = new RegExp(search);
        } catch(err:unknown) {
            return;
        }
        setSearchParams(prev => {
            if (search) {
                prev.set('search', search);
            } else {
                prev.delete('search');
            }
            return prev;
        })

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
            <FormControl type="search" size="sm" id={id} defaultValue={search} onChange={changeHandler}/>
        </InputGroup>
    )
}
export default ImageSearch;
