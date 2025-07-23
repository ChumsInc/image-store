import {type ChangeEvent, type FormEvent, useEffect, useId, useState} from 'react';
import {useAppDispatch} from "@/app/hooks";
import {removeAltItemCode, saveAltItemCode} from "@/ducks/images/actions";
import type {ProductAltItem} from "chums-types";
import {useSelector} from "react-redux";
import {selectCanEdit} from "@/ducks/userProfile";
import {Button, FormControl, InputGroup} from "react-bootstrap";

const AdditionalSKUForm = ({item}: { item: ProductAltItem }) => {
    const dispatch = useAppDispatch();
    const canEdit = useSelector(selectCanEdit);
    const [value, setValue] = useState(item.item_code);
    const id = useId();

    useEffect(() => {
        setValue(item.item_code);
    }, [item.item_code]);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!canEdit) {
            return;
        }
        dispatch(saveAltItemCode({...item, item_code: value}));
        setValue('');
    }

    const deleteHandler = () => {
        if (!canEdit) {
            return;
        }
        if (item.id) {
            dispatch(removeAltItemCode(item));
            setValue('');
        }
    }

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value);

    if (!canEdit) {
        return (
            <div className="mb-1">
                <strong className="me-3">{item.item_code}</strong>
                {item.ItemCodeDesc}
            </div>
        )
    }
    return (
        <div className="mb-1">
            <InputGroup as="form" size="sm" onSubmit={submitHandler}>
                <InputGroup.Text as="label" htmlFor={id}>Item</InputGroup.Text>
                <FormControl type="text" size="sm" id={id}
                             value={value} onChange={changeHandler}
                             readOnly={!!item.id}/>
                {!item.id && (
                    <Button type="submit" size="sm" aria-label="Add item code">
                        <span className="bi-plus" aria-hidden/>
                    </Button>
                )}
                {!!item.id && (
                    <Button type="button" size="sm" variant="danger" onClick={deleteHandler}
                            aria-label="Clear item code">
                        <span className="bi-x" aria-hidden/>
                    </Button>
                )}
            </InputGroup>
            <small className="text-muted">{item.ItemCodeDesc ?? null}</small>
        </div>
    )
}

export default AdditionalSKUForm;
