import React, {ChangeEvent, FormEvent, useEffect, useId, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useSelector} from "react-redux";
import {selectMultipleBusy} from "@/ducks/images/currentImagesSlice";
import {selectCanEdit} from "@/ducks/userProfile";
import {saveAltItemCode} from "@/ducks/images/actions";
import {defaultAltItem} from "@/ducks/images/utils";
import {Button, FormControl, InputGroup, ProgressBar} from "react-bootstrap";
import {selectCurrentImages} from "@/ducks/images/currentImagesSlice";


const AdditionalSKUMultipleImagesForm = () => {
    const dispatch = useAppDispatch();
    const images = useSelector(selectCurrentImages);
    const canEdit = useSelector(selectCanEdit);
    const [value, setValue] = useState('');
    const saving = useSelector(selectMultipleBusy);
    const [savePending, setSavePending] = useState(false);
    const [itemCodes, setItemCodes] = useState<string[]>([]);
    const busy = useAppSelector(selectMultipleBusy);
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

    const submitHandler = async (ev: FormEvent) => {
        ev.preventDefault();
        if (!canEdit) {
            return;
        }

        for await (const img of images) {
            await dispatch(saveAltItemCode({...defaultAltItem, filename: img.filename, item_code: value}));
        }
        setValue('');
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
                             value={value} onChange={changeHandler} disabled={busy}/>
                <Button type="submit" variant="primary" size="sm" disabled={busy} aria-label="Save">
                    <span className="bi-plus" aria-hidden/>
                </Button>
            </InputGroup>
            <small className="text-muted">Item Codes: {itemCodes.join(', ')}</small>
            {busy && (<ProgressBar striped animated style={{height: '3px'}} now={100}/>)}
        </div>
    )
}

export default AdditionalSKUMultipleImagesForm;
