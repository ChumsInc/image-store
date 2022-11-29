import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentImage, selectIsPreferredImage} from "./selectors";
import {saveImage} from "./actions";
import {useAppDispatch} from "../../app/hooks";
import {selectCanEdit} from "../userProfile";

const PreferredImageButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentImage);
    const isPreferredImage = useSelector(selectIsPreferredImage);
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
        <button type="button" className="btn btn-sm btn-outline-secondary text-warning"
                onClick={clickHandler} title="Set preferred image">
            <span className={isPreferredImage ? "bi-star-fill" : 'bi-star'}/>
        </button>
    )
}

export default PreferredImageButton;
