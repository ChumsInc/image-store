import React, {ChangeEvent, FormEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {selectSelectedForAction} from "./selectors";
import AutoSizeImage from "./AutoSizeImage";
import {selectCanEdit} from "../userProfile";
import {clearAdditionalImages, saveAltItemCode, saveImage, tagImage} from "./actions";
import {useAppDispatch} from "../../app/hooks";
import {defaultAltItem} from "./utils";
import TagMultipleImagesForm from "./TagMultipleImagesForm";
import AdditionalSKUMultipleImagesForm from "./AdditionalSKUMultipleImagesForm";

const MultipleSelectedImages = () => {
    const dispatch = useAppDispatch();
    const images = useSelector(selectSelectedForAction);
    const canEdit: boolean = useSelector(selectCanEdit);
    const [tag, setTag] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [value, setValue] = useState('');


    const onChangeTag = (ev: ChangeEvent<HTMLInputElement>) => setTag(ev.target.value);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value);

    const onAddTag = (ev: FormEvent) => {
        ev.preventDefault();
        if (!canEdit) {
            return;
        }

        images.forEach(img => {
            dispatch(tagImage({filename: img.filename, tag}));
        })
        setTag('');
    }

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

    const secondaryItemSubmitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!canEdit) {
            return;
        }
        images.forEach(img => {
            dispatch(saveAltItemCode({...defaultAltItem, filename: img.filename, item_code: value}));
        })
    }

    const clearImagesHandler = () => {
        dispatch(clearAdditionalImages());
    }

    return (
        <div>
            <h3>Multiple Images</h3>
            <div className="row g-3">
                {images.map(img => (
                    <div className="col-auto" key={img.filename}>
                        <AutoSizeImage image={img} path="80"/>
                    </div>
                ))}
            </div>
            <div className="d-grid">
                <button type="button" className="btn btn-outline-secondary d-block" onClick={clearImagesHandler}>
                    Clear List
                </button>
            </div>
            {canEdit && (
                <div className="mt-3">
                    <label className="form-label">Primary Item Code</label>
                    <form className="input-group input-group-sm mb-3" onSubmit={primaryItemSubmitHandler}>
                        <div className="input-group-text">
                            <span className="bi-key-fill"/>
                        </div>
                        <input type="text" className="form-control form-control-sm"
                               value={itemCode} onChange={(ev) => setItemCode(ev.target.value)}/>
                        <button type="submit" className="btn btn-sm btn-primary">Save</button>
                    </form>
                </div>
            )}
            <AdditionalSKUMultipleImagesForm />
            <TagMultipleImagesForm />
            <pre>
                <code>
                    {JSON.stringify(images.map(f => f.filename), undefined, 2)};
                </code>
            </pre>
        </div>
    )
}
export default MultipleSelectedImages;