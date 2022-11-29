import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentImage, selectSelectedImageTags} from "./selectors";
import {Badge} from "chums-components";
import {tagImage} from "./actions";
import {EditableImage} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {selectCanEdit} from "../userProfile";

const ImageTagList: React.FC = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentImage);
    const canEdit: boolean = useSelector(selectCanEdit);
    const [tag, setTag] = useState('');

    useEffect(() => {
        setTag('');
    }, [current]);

    const onDeleteTag = (tag: string) => {
        if (tag && current && current.filename) {
            dispatch(tagImage({filename: current.filename, tag, action: 'untag'}));
        }
    }

    const onChangeTag = (ev: ChangeEvent<HTMLInputElement>) => setTag(ev.target.value);

    const onAddTag = (ev: FormEvent) => {
        ev.preventDefault();
        if (!current || !current.filename) {
            return;
        }
        dispatch(tagImage({filename: current.filename, tag}));
    }

    if (!current) {
        return null;
    }
    return (
        <div className="mt-3">
            <h4>Tags</h4>
            {!canEdit && current.tags.map(tag => (
                <Badge key={tag} color="secondary" className="me-1">
                    {tag}
                    {canEdit && (
                        <button type="button" className="btn-sm ms-1 text-light btn-close" onClick={() => onDeleteTag(tag)}/>
                    )}
                </Badge>
            ))}
            {canEdit && current.tags.map(tag => (
                <div key={tag} className="btn-group btn-group-sm m-1" >
                    <button type="button" className="btn btn-sm btn-secondary" disabled>{tag}</button>
                    <button type="button" className="btn btn-sm btn-secondary" onClick={() => onDeleteTag(tag)}>
                        <span className="bi-x" />
                    </button>
                </div>
            ))}
            {canEdit && current && (
                <form onSubmit={onAddTag} className="mt-1">
                    <div className="input-group input-group-sm">
                        <span className="input-group-text bi-tag-fill"/>
                        <input type="text" className="form-control form-control-sm" value={tag} onChange={onChangeTag}/>
                        <button type="submit" className="btn btn-secondary"><span className="bi-plus"/></button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ImageTagList;
