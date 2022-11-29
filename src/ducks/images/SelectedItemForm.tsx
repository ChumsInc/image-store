import React, {FormEvent, useEffect, useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectCurrentImage} from "./selectors";
import {saveImage} from "./actions";
import {selectCanEdit} from "../userProfile";
import PreferredImageButton from "./PreferredImageButton";

const SelectedItemForm = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentImage);
    const [itemCode, setItemCode] = useState(current?.ItemCode ?? '');
    const canEdit = useSelector(selectCanEdit);

    useEffect(() => {
        setItemCode(current?.ItemCode ?? '');
    }, [current?.ItemCode]);

    const primaryItemSubmitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!current || !canEdit) {
            return;
        }
        dispatch(saveImage({filename: current.filename, item_code: itemCode}));
    }


    if (!current) {
        return null;
    }

    if (!canEdit) {
        return (
            <h4>Item: {current.ItemCode}</h4>
        )
    }

    return (
        <div className="row g-3">
            <div className="col">
                <form className="input-group input-group-sm mb-3" onSubmit={primaryItemSubmitHandler}>
                    <div className="input-group-text">
                        <span className="bi-key-fill"/>
                    </div>
                    <input type="text" className="form-control form-control-sm"
                           value={itemCode} onChange={(ev) => setItemCode(ev.target.value)}/>
                    <button type="submit" className="btn btn-sm btn-primary">Save</button>
                </form>
            </div>
            <div className="col-auto">
                <PreferredImageButton/>
            </div>
        </div>
    )
}

export default SelectedItemForm;
