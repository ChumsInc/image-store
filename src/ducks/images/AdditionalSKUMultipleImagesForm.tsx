import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectMultipleSaving, selectSelectedForAction} from "./selectors";
import {selectCanEdit} from "../userProfile";
import {saveAltItemCode} from "./actions";
import {LoadingProgressBar} from "chums-components";
import {defaultAltItem} from "./utils";


const AdditionalSKUMultipleImagesForm = () => {
    const dispatch = useAppDispatch();
    const images = useSelector(selectSelectedForAction);
    const canEdit = useSelector(selectCanEdit);
    const [value, setValue] = useState('');
    const saving = useSelector(selectMultipleSaving);
    const [savePending, setSavePending] = useState(false);
    const [itemCodes, setItemCodes] = useState<string[]>([]);

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
        const _itemCodes:string[] = [];
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
        <div className="mt-3">
            <label className="form-label">Secondary Item Code</label>
            <form className="input-group input-group-sm" onSubmit={submitHandler}>
                <div className="input-group-text">Item</div>
                <input type="text" className="form-control form-control-sm" value={value} onChange={changeHandler}
                       disabled={saving || savePending}/>
                <button type="submit" className="btn btn-sm btn-primary" disabled={saving || savePending}>
                    <span className="bi-plus"/>
                </button>
            </form>
            <small className="text-muted">{itemCodes.join(', ')}</small>
            {(savePending || saving) && (<LoadingProgressBar striped animated style={{height: '3px'}}/>)}
        </div>
    )
}

export default AdditionalSKUMultipleImagesForm;
