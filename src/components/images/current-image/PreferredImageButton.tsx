import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentImage} from "@/ducks/images/currentImagesSlice";
import {saveImage} from "@/ducks/images/actions";
import {useAppDispatch} from "@/app/hooks";
import {selectCanEdit} from "@/ducks/userProfile";
import {Button} from "react-bootstrap";

const PreferredImageButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentImage);
    const canEdit = useSelector(selectCanEdit);

    const clickHandler = () => {
        if (current && canEdit) {
            const {filename, item_code} = current;
            dispatch(saveImage({filename, item_code, preferred_image: true}))
        }
    }

    if (!canEdit) {
        return null;
    }
    return (
        <Button type="button" size="sm" variant="outline-secondary" className="text-warning"
                onClick={clickHandler} title="Set preferred image">
            <span className={current.preferred_image ? "bi-star-fill" : 'bi-star'}
                  aria-label={current.preferred_image ? 'preferred image' : ''}/>
        </Button>
    )
}

export default PreferredImageButton;
