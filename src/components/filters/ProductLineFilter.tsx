import {type ChangeEvent, useEffect, useId} from 'react';
import {useAppDispatch} from "@/app/hooks";
import {useSelector} from "react-redux";
import {sortProductLines} from "@/ducks/filters/utils";
import {useSearchParams} from "react-router";
import {selectProductLine, selectProductLines, setProductLine} from "@/ducks/filters/productLineSlice";
import Form from "react-bootstrap/Form";
import {type FormGroupProps} from "react-bootstrap";

const ProductLineFilter = (props:FormGroupProps) => {
    const dispatch = useAppDispatch();
    const [, setSearchParams] = useSearchParams();
    const productLines = useSelector(selectProductLines);
    const productLine = useSelector(selectProductLine);
    const id = useId();

    useEffect(() => {
        setSearchParams((prev) => {
            if (productLine) {
                prev.set('pl', productLine);
            } else {
                prev.delete('pl');
            }
            return prev;
        })
    }, [productLine]);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setProductLine(ev.target.value));
    }


    return (
        <Form.Group {...props}>
            <Form.Label htmlFor={id}>Product Line</Form.Label>
            <Form.Select id={id} size="sm" value={productLine ?? ''} onChange={changeHandler}>
                <option value="">All</option>
                {[...productLines]
                    .sort(sortProductLines)
                    .map(pl => (
                            <option key={pl.ProductLine} value={pl.ProductLine}>
                                {pl.ProductLineDesc} [{pl.ProductLine}]
                            </option>
                        )
                    )}
            </Form.Select>
        </Form.Group>
    )
}

export default ProductLineFilter;
