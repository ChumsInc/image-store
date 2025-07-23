import {useId} from 'react';
import {useSelector} from "react-redux";
import {selectCanEdit} from "./index";
import {useAppDispatch} from "../../app/hooks";
import {FormCheck} from "react-bootstrap";
import {toggleEditMode} from "./actions";

const ToggleEditMode = () => {
    const dispatch = useAppDispatch();
    const canEdit = useSelector(selectCanEdit);
    const id = useId();

    return (
        <FormCheck id={id} type="checkbox" label="Edit Mode" checked={canEdit}
                   onChange={(ev) => dispatch(toggleEditMode(ev.target.checked))} />
    )
}

export default ToggleEditMode;
