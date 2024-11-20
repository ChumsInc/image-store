import React, {ChangeEvent, FormEvent, useEffect, useId, useState} from 'react';
import {useAppDispatch} from "../../../../app/hooks";
import {useSelector} from "react-redux";
import {selectMultipleSaving, selectSelectedForAction} from "../../selectors";
import {selectCanEdit} from "../../../userProfile";
import {saveAltItemCode} from "../../actions";
import {defaultAltItem} from "../../utils";
import {Button, FormControl, InputGroup, ProgressBar} from "react-bootstrap";


const AdditionalSKUMultipleImagesForm = () => {
    const dispatch = useAppDispatch();
    const images = useSelector(selectSelectedForAction);
    const canEdit = useSelector(selectCanEdit);
    const [value, setValue] = useState('');
    const saving = useSelector(selectMultipleSaving);
    const [savePending, setSavePending] = useState(false);
    const [itemCodes, setItemCodes] = useState<string[]>([]);
    const id = useId()

    useEffect(() => {
        if (saving && !savePending) {
            setSavePending(true);
            return;
        }

        if (!saving && savePending) {
            setValue('')
            setSavePending(false);
        }
    }, [saving]);

    useEffect(() => {
        const _itemCodes: string[] = [];
        const itemCodes = images.reduce((list, image) => {
            if (image.item_codes) {
                image.item_codes.forEach(item => {
                    if (!list.includes(item.item_code)) {
                        list.push(item.item_code);
                    }
                })
            }
            return list;
        }, [] as string[]);
        setItemCodes(itemCodes);
    }, [images])

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!canEdit) {
            return;
        }

        images.forEach(img => {
            dispatch(saveAltItemCode({...defaultAltItem, filename: img.filename, item_code: value}));
        })
    }


    if (!canEdit) {
        return null;
    }

    return (
        <div>
            <label className="form-label">Secondary Item Code</label>
            <InputGroup as="form" size="sm" onSubmit={submitHandler}>
                <InputGroup.Text as="label" htmlFor={id}>Item</InputGroup.Text>
                <FormControl type="text" id={id} size="sm"
                             value={value} onChange={changeHandler} disabled={saving || savePending}/>
                <Button type="submit" variant="primary" size="sm" disabled={saving || savePending} aria-label="Save">
                    <span className="bi-plus" aria-hidden/>
                </Button>
            </InputGroup>
            <small className="text-muted">Item Codes: {itemCodes.join(', ')}</small>
            {(savePending || saving) && (<ProgressBar striped animated style={{height: '3px'}} now={100}/>)}
        </div>
    )
}

export default AdditionalSKUMultipleImagesForm;
