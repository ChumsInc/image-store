import {useSelector} from "react-redux";
import {selectCurrentImage} from "@/ducks/images/currentImagesSlice";
import {useAppDispatch} from "@/app/hooks";
import {selectCanDelete} from "@/ducks/userProfile";
import {removeImage} from "@/ducks/images/actions";
import {Button} from "react-bootstrap";

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
            <Button type="button" variant="danger" className="d-block" onClick={deleteHandler}>Delete</Button>
        </div>
    )
}

export default DeleteImagesButton;
