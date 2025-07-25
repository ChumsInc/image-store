import {type ChangeEvent, type FormEvent, useEffect, useId, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useSelector} from "react-redux";
import {selectMultipleBusy, selectCurrentImages} from "@/ducks/images/currentImagesSlice";
import {selectCanEdit} from "@/ducks/userProfile";
import {tagImage} from "@/ducks/images/actions";
import ImageTagBadges from "../../ImageTagBadges";
import {Button, FormControl, InputGroup, ProgressBar} from "react-bootstrap";


const TagMultipleImagesForm = () => {
    const dispatch = useAppDispatch();
    const images = useSelector(selectCurrentImages);
    const canEdit: boolean = useSelector(selectCanEdit);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const saving = useSelector(selectMultipleBusy);
    const [savePending, setSavePending] = useState(false);
    const busy = useAppSelector(selectMultipleBusy);
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

    const submitHandler = async (ev: FormEvent) => {
        ev.preventDefault();
        if (!canEdit) {
            return;
        }
        for await (const img of images) {
            await dispatch(tagImage({filename: img.filename, tag}));
        }
        setTag('');
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
                    <FormControl type="text" size="sm" id={id}
                                 value={tag} disabled={busy}
                                 onChange={onChangeTag}/>
                    <Button type="submit" variant="secondary" disabled={busy} aria-label="Save">
                        <span className="bi-plus" aria-hidden/>
                    </Button>
                </InputGroup>
                <ImageTagBadges inactive={false} tags={tags}/>
            </form>
            {busy && (<ProgressBar striped animated style={{height: '3px'}} now={100}/>)}
        </div>
    )
}

export default TagMultipleImagesForm;
