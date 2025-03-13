import React, {ChangeEvent, useEffect, useId} from 'react';
import {useSelector} from "react-redux";
import {selectCategories, selectCategory, setProductCategory} from "@/ducks/filters/productCategorySlice";
import {sortCategories} from "../utils";
import {useSearchParams} from "react-router";
import Form from "react-bootstrap/Form";
import {useAppDispatch} from "@/app/hooks";
import {FormGroupProps} from "react-bootstrap";

const ProductCategoryFilter = (props:FormGroupProps) => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams()
    const categories = useSelector(selectCategories);
    const value = useSelector(selectCategory);
    const id = useId();

    useEffect(() => {
        setSearchParams((prev) => {
            if (value) {
                prev.set('cat', value);
            } else {
                prev.delete('cat');
            }
            return prev;
        })

    }, [value]);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setProductCategory(ev.target.value))
    }

    return (
        <Form.Group {...props}>
            <Form.Label htmlFor={id}>Product Category</Form.Label>
            <Form.Select id={id} size="sm" value={value ?? ''} onChange={changeHandler}>
                <option value="">All</option>
                <option disabled>---</option>
                {[...categories]
                    .sort(sortCategories)
                    .map(cat => (
                            <option key={cat.Category2} value={cat.Category2}>
                                {cat.Category2} - {cat.description}
                            </option>
                        )
                    )}
            </Form.Select>
        </Form.Group>
    )
}

export default ProductCategoryFilter;
