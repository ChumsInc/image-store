import React, {useId} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectCurrentImage} from "./selectors";
import {selectCanEdit} from "../userProfile";
import {ToggleButton} from "chums-components";
import {setImageActive} from "./actions";

const ImageActiveToggle = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentImage);
    const canEdit: boolean = useSelector(selectCanEdit);
    const activeButtonId = useId();
    const inactiveButtonId = useId();

    if (!current || !canEdit) {
        return null;
    }

    const activeClickHandler = () => {
        if (!current) {
            return;
        }
        dispatch(setImageActive({filename: current.filename, active: true}));
    }

    const inactiveClickHandler = () => {
        if (!current) {
            return;
        }
        dispatch(setImageActive({filename: current.filename, active: false}));
    }

    return (
        <div className="row g-3 mb-1 align-items-baseline">
            <div className="col-auto">
                Image Status
            </div>
            <div className="col-auto">
                <ToggleButton id={activeButtonId} checked={current.active ?? false} onChange={activeClickHandler} color="success" size="sm" >
                    Active
                </ToggleButton>
            </div>
            <div className="col-auto">
                <ToggleButton id={inactiveButtonId} checked={!current.active} onChange={inactiveClickHandler} color="danger" size="sm" >
                    Inactive
                </ToggleButton>
            </div>
        </div>
    )
}

export default ImageActiveToggle;
