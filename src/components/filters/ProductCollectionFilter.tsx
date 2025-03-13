import React, {ChangeEvent, useEffect, useId} from 'react';
import {useSelector} from "react-redux";
import {selectCollections, selectCollection, setProductCollection} from "@/ducks/filters/productCollectionSlice";
import {sortCollections} from "@/ducks/filters/utils";
import {useSearchParams} from "react-router";
import {useAppDispatch} from "@/app/hooks";
import Form from "react-bootstrap/Form";
import {FormGroupProps} from "react-bootstrap";

const ProductCollectionFilter = (props:FormGroupProps) => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const list = useSelector(selectCollections);
    const value = useSelector(selectCollection);
    const id = useId();

    useEffect(() => {
        setSearchParams((prev) => {
            if (value) {
                prev.set('collection', value);
            } else {
                prev.delete('collection')
            }
            return prev;
        })

    }, [value]);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setProductCollection(ev.currentTarget.value));
    }

    return (
        <Form.Group {...props}>
            <Form.Label htmlFor={id}>Collection</Form.Label>
            <Form.Select id={id} size="sm" value={value ?? ''} onChange={changeHandler}>
                <option value="">All</option>
                {[...list]
                    .sort(sortCollections)
                    .map(item => (
                            <option key={item.Category3} value={item.Category3}>
                                {item.Category3}
                            </option>
                        )
                    )}
            </Form.Select>
        </Form.Group>
    )
}

export default ProductCollectionFilter;
