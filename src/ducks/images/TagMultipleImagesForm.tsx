import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectMultipleSaving, selectSelectedForAction} from "./selectors";
import {selectCanEdit} from "../userProfile";
import {tagImage} from "./actions";
import {LoadingProgressBar} from "chums-components";


const TagMultipleImagesForm = () => {
    const dispatch = useAppDispatch();
    const images = useSelector(selectSelectedForAction);
    const canEdit: boolean = useSelector(selectCanEdit);
    const [tag, setTag] = useState('');
    const saving = useSelector(selectMultipleSaving);
    const [savePending, setSavePending] = useState(false);

    useEffect(() => {
        if (saving && !savePending) {
            setSavePending(true);
            return;
        }

        if (!saving && savePending) {
            setTag('')
            setSavePending(false);
        }
    }, [saving]);

    const onChangeTag = (ev: ChangeEvent<HTMLInputElement>) => setTag(ev.target.value);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!canEdit) {
            return;
        }

        images.forEach(img => {
            dispatch(tagImage({filename: img.filename, tag}));
        })
        // setTag('');
    }

    if (!canEdit) {
        return null;
    }

    return (
        <div className="mt-3">
            <label className="form-label">Tag Images</label>
            <form onSubmit={submitHandler} className="mt-1">
                <div className="input-group input-group-sm">
                    <span className="input-group-text bi-tag-fill"/>
                    <input type="text" className="form-control form-control-sm" value={tag} disabled={saving || savePending}
                           onChange={onChangeTag}/>
                    <button type="submit" className="btn btn-secondary" disabled={saving || savePending}>
                        <span className="bi-plus"/>
                    </button>
                </div>
            </form>
            {(savePending || saving) && (<LoadingProgressBar striped animated style={{height: '3px'}}/>)}
        </div>
    )
}

export default TagMultipleImagesForm;
