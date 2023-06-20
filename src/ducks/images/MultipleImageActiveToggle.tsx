import React, {useId} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectCurrentImage, selectSelectedForAction} from "./selectors";
import {selectCanEdit} from "../userProfile";
import {ToggleButton} from "chums-components";
import {setImageActive, tagImage} from "./actions";

const MultipleImageActiveToggle = () => {
    const dispatch = useAppDispatch();
    const images = useSelector(selectSelectedForAction);
    const canEdit: boolean = useSelector(selectCanEdit);
    const activeButtonId = useId();
    const inactiveButtonId = useId();

    if (!images.length || !canEdit) {
        return null;
    }

    const activeClickHandler = () => {
        if (!canEdit) {
            return;
        }
        images.forEach(img => {
            dispatch(setImageActive({filename: img.filename, active: true}));
        })
    }

    const inactiveClickHandler = () => {
        if (!canEdit) {
            return;
        }
        images.forEach(img => {
            dispatch(setImageActive({filename: img.filename, active: false}));
        })
    }

    const activeImages = images.filter(img => img.active).length;
    const inactiveImages = images.filter(img => !img.active).length;
    const count = images.length;

    return (
        <div className="row g-3 mt-3 align-items-baseline">
            <div className="col-auto">
                Image Status
            </div>
            <div className="col-auto">
                <ToggleButton id={activeButtonId} checked={count === activeImages} onChange={activeClickHandler} color="success" size="sm" >
                    Active ({activeImages})
                </ToggleButton>
            </div>
            <div className="col-auto">
                <ToggleButton id={inactiveButtonId} checked={count === inactiveImages} onChange={inactiveClickHandler} color="danger" size="sm" >
                    Inactive ({inactiveImages})
                </ToggleButton>
            </div>
        </div>
    )
}

export default MultipleImageActiveToggle;
