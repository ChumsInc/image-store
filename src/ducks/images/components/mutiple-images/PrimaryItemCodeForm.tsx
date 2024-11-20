import React, {FormEvent, useEffect, useId, useState} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {saveImage} from "../../actions";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {selectSelectedForAction} from "../../selectors";
import {useSelector} from "react-redux";
import {selectCanEdit} from "../../../userProfile";

export default function PrimaryItemCodeForm() {
    const dispatch = useAppDispatch();
    const images = useAppSelector(selectSelectedForAction);
    const canEdit = useSelector(selectCanEdit);
    const [itemCode, setItemCode] = useState('');
    const [itemCodes, setItemCodes] = useState<string[]>([]);
    const id = useId();

    useEffect(() => {
        const itemCodes = images.reduce((list, image) => {
            if (!!image.item_code && !list.includes(image.item_code)) {
                list.push(image.item_code);
            }
            return list;
        }, [] as string[]);
        setItemCodes(itemCodes.sort());
    }, [images])

    const primaryItemSubmitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!canEdit) {
            return;
        }
        images.forEach(img => {
            dispatch(saveImage({filename: img.filename, item_code: itemCode}));
        })
        setItemCode('');
    }

    if (!canEdit) {
        return null;
    }

    return (
        <div>
            <label className="form-label">Primary Item Code</label>
            <InputGroup as="form" size="sm" onSubmit={primaryItemSubmitHandler}>
                <InputGroup.Text as="label" htmlFor={id} aria-label="Primary Item Code">
                    <span className="bi-key-fill" aria-hidden/>
                </InputGroup.Text>
                <FormControl type="text" size="sm"
                             value={itemCode} onChange={(ev) => setItemCode(ev.target.value)}/>
                <Button type="submit" variant="primary" size="sm">Save</Button>
            </InputGroup>
            <small className="text-muted">Item codes: {itemCodes.join(', ')}</small>
        </div>
    )
}
