import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentImage} from "./selectors";
import {useAppDispatch} from "../../app/hooks";
import {selectCanDelete} from "../userProfile";
import {removeImage} from "./actions";

const DeleteImagesButton = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentImage);
    const canDelete = useSelector(selectCanDelete);

    if (!current || !canDelete) {
        return null;
    }

    const deleteHandler = () => {
        if (window.confirm(`Are you sure you want to delete all sizes of ${current.filename}?`)) {
            dispatch(removeImage(current.filename))
        }
    }

    return (
        <div className="d-grid">
            <button type="button" className="btn btn-danger d-block" onClick={deleteHandler}>Delete</button>
        </div>
    )
}

export default DeleteImagesButton;
