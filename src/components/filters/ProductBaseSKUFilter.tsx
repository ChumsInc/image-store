import {type ChangeEvent, useEffect, useId} from 'react';
import {useSelector} from "react-redux";
import {selectBaseSKU, selectBaseSKUs, setBaseSKU} from "@/ducks/filters/baseSKUSlice";
import {sortBaseSKUs} from "@/ducks/filters/utils";
import {useSearchParams} from "react-router";
import Form from "react-bootstrap/Form";
import {useAppDispatch} from "@/app/hooks";
import {type FormGroupProps} from "react-bootstrap";

const ProductBaseSKUFilter = (props:FormGroupProps) => {
    const dispatch = useAppDispatch();
    const [_, setSearchParams] = useSearchParams()
    const list = useSelector(selectBaseSKUs);
    const baseSKU = useSelector(selectBaseSKU);
    const id = useId();

    useEffect(() => {
        setSearchParams((prev) => {
            if (!baseSKU) {
                prev.delete('baseSKU');
            } else {
                prev.set('baseSKU', baseSKU);
            }
            return prev;
        })
    }, [baseSKU]);

    const changeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setBaseSKU(ev.currentTarget.value));
    }

    return (
        <Form.Group {...props}>
            <Form.Label htmlFor={id}>Base SKU</Form.Label>
            <Form.Select id={id} size="sm" value={baseSKU ?? ''} onChange={changeHandler}>
                <option value="">All</option>
                {[...list]
                    .sort(sortBaseSKUs)
                    .map(sku => (
                            <option key={sku.Category4} value={sku.Category4}>
                                {sku.Category4} - {sku.description}
                            </option>
                        )
                    )}
            </Form.Select>
        </Form.Group>
    )
}

export default ProductBaseSKUFilter;
