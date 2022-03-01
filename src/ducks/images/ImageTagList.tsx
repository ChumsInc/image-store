import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectSelectedImage, selectSelectedImageTags} from "./selectors";
import Badge from "../../components/Badge";
import {tagImageAction, untagImageAction} from "./actions";
import {ImageRecord} from "../../types";
import {selectCanEdit} from "../../selectors";

const ImageTagList:React.FC = () => {
    const dispatch = useDispatch();
    const selectedImage:ImageRecord = useSelector(selectSelectedImage);
    const selectedTags:string[] = useSelector(selectSelectedImageTags);
    const canEdit:boolean = useSelector(selectCanEdit);
    const [tag, setTag] = useState('');

    useEffect(() => {
        setTag('');
    }, [selectedTags]);

    const onDeleteTag = (tag:string) => {
        if (tag && selectedImage?.filename) {
            dispatch(untagImageAction(tag, selectedImage.filename));
        }
    }

    const onChangeTag = (ev:ChangeEvent<HTMLInputElement>) => setTag(ev.target.value);

    const onAddTag = (ev:FormEvent) => {
        ev.preventDefault();
        if (!selectedImage || !selectedImage.filename) {
            return;
        }
        dispatch(tagImageAction(tag, selectedImage.filename));
    }

    return (
        <div className="mt-3">
            <h4>Tags</h4>
            {selectedTags.map(tag => (
                <Badge key={tag} type="secondary" className="me-1">
                    {tag}
                    {canEdit && <button type="button" className="ms-1 btn-close" onClick={() => onDeleteTag(tag)}/>}
                </Badge>
            ))}
            {canEdit && (
                <form onSubmit={onAddTag} className="mt-1">
                    <div className="input-group">
                        <span className="input-group-text bi-tag-fill" />
                        <input type="text" className="form-control form-control-sm" value={tag} onChange={onChangeTag} />
                        <button type="submit" className="btn btn-secondary"><span className="bi-cloud-plus-fill" /></button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ImageTagList;
