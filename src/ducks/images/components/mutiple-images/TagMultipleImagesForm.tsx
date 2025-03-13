import React, {ChangeEvent, FormEvent, useEffect, useId, useState} from 'react';
import {useAppDispatch} from "../../../../app/hooks";
import {useSelector} from "react-redux";
import {selectMultipleSaving, selectSelectedForAction} from "../../selectedImagesSlice";
import {selectCanEdit} from "../../../userProfile";
import {tagImage} from "../../actions";
import ImageTagBadges from "../../../../components/ImageTagBadges";
import {Button, FormControl, InputGroup, ProgressBar} from "react-bootstrap";


const TagMultipleImagesForm = () => {
    const dispatch = useAppDispatch();
    const images = useSelector(selectSelectedForAction);
    const canEdit: boolean = useSelector(selectCanEdit);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const saving = useSelector(selectMultipleSaving);
    const [savePending, setSavePending] = useState(false);
    const id = useId();


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

    useEffect(() => {
        let _tags: string[] = [];
        const tags = images.reduce((tags, image) => {
            image.tags.forEach(tag => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
            return tags;
        }, _tags);
        setTags(tags);
    }, [images])

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
        <div>
            <label className="form-label">Tag Images</label>
            <form onSubmit={submitHandler} className="mt-1">
                <InputGroup size="sm">
                    <InputGroup.Text as="label" htmlFor={id} aria-label="Add Tag">
                        <span className="bi-tag" aria-hidden/>
                    </InputGroup.Text>
                    <FormControl type="text" size="sm" value={tag} disabled={saving || savePending}
                                 onChange={onChangeTag}/>
                    <Button type="submit" variant="secondary" disabled={saving || savePending} aria-label="Save">
                        <span className="bi-plus" aria-hidden/>
                    </Button>
                </InputGroup>
                <ImageTagBadges inactive={false} tags={tags}/>
            </form>
            {(savePending || saving) && (<ProgressBar striped animated style={{height: '3px'}} now={100}/>)}
        </div>
    )
}

export default TagMultipleImagesForm;
