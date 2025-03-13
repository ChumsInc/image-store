import React, {ChangeEvent, FormEvent, useEffect, useId, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentImage} from "../../currentImageSlice";
import {Badge, Button, ButtonGroup, FormControl, InputGroup} from "react-bootstrap";
import {tagImage} from "../../actions";
import {useAppDispatch} from "../../../../app/hooks";
import {selectCanEdit} from "../../../userProfile";

const ImageTagList: React.FC = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentImage);
    const canEdit: boolean = useSelector(selectCanEdit);
    const [tag, setTag] = useState('');
    const id = useId();

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

    if (!current || (!canEdit && current.tags.length === 0)) {
        return null;
    }
    return (
        <div className="mt-3">
            <h4 style={{fontSize: '18px'}}>Tags</h4>
            {canEdit && current && (
                <InputGroup as="form" size="sm" className="mb-1" onSubmit={onAddTag}>
                    <InputGroup.Text as="label" htmlFor={id} aria-label="Add Tag">
                        <span className="bi-tag-fill" aria-hidden/>
                    </InputGroup.Text>
                    <FormControl type="text" size="sm" value={tag} onChange={onChangeTag}/>
                    <Button type="submit" variant="secondary" size="sm" aria-label="Save Tag">
                        <span className="bi-plus" aria-hidden/>
                    </Button>
                </InputGroup>
            )}
            {canEdit && (
                <div className="d-flex justify-content-start gap-1 flex-wrap">
                    {current.tags.map(tag => (
                        <ButtonGroup key={tag} size="sm">
                            <Button type="button" variant="secondary" size="sm" disabled>{tag}</Button>
                            <Button type="button" variant="secondary" size="sm" onClick={() => onDeleteTag(tag)}>
                                <span className="bi-x"/>
                            </Button>
                        </ButtonGroup>
                    ))}
                </div>
            )}
            {!canEdit && current.tags.map(tag => (
                <Badge key={tag} bg="secondary" className="me-1">
                    {tag}
                </Badge>
            ))}
        </div>
    )
}

export default ImageTagList;
