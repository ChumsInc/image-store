import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {saveAltItemCode} from "./actions";
import {ProductAltItemKey} from "../../types";
import {ProductAltItem} from "chums-types/product-image";
import {useSelector} from "react-redux";
import {selectCanEdit} from "../userProfile";

const AdditionalSKUForm = ({item}: { item: ProductAltItem}) => {
    const dispatch = useAppDispatch();
    const canEdit = useSelector(selectCanEdit);
    const [value, setValue] = useState(item.item_code);

    useEffect(() => {
        setValue(item.item_code);
    }, [item.item_code]);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!canEdit) {
            return;
        }
        dispatch(saveAltItemCode({...item, item_code: value}));
    }
    const deleteHandler = () => {
        if (!canEdit) {
            return;
        }
        if (item.id) {
            dispatch(saveAltItemCode({...item, item_code: ''}));
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
            <form className="input-group input-group-sm" onSubmit={submitHandler}>
                <div className="input-group-text">Item</div>
                <input type="text" className="form-control form-control-sm" value={value} onChange={changeHandler}
                       readOnly={!!item.id}/>
                {!item.id && (
                    <button type="submit" className="btn btn-sm btn-primary">
                        <span className="bi-plus"/>
                    </button>
                )}
                {!!item.id && (
                    <button type="button" className="btn btn-sm btn-danger" onClick={deleteHandler}>
                        <span className="bi-x"/>
                    </button>
                )}
            </form>
            <small className="text-muted">{item.ItemCodeDesc ?? null}</small>
        </div>
    )
}

export default AdditionalSKUForm;
