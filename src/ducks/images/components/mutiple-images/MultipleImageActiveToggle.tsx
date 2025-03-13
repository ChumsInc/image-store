import React, {useId} from 'react';
import {useAppDispatch} from "../../../../app/hooks";
import {useSelector} from "react-redux";
import {selectCanEdit} from "../../../userProfile";
import {Col, Row, ToggleButton} from "react-bootstrap";
import {setImageActive} from "../../actions";
import {selectSelectedForAction} from "@/ducks/images/selectedImagesSlice";

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
        <Row className="g-3 align-items-baseline">
            <Col xs="auto">
                Image Status
            </Col>
            <Col xs="auto">
                <ToggleButton id={activeButtonId} type="checkbox" value={1}
                              checked={count === activeImages} onChange={activeClickHandler} variant="outline-success"
                              size="sm">
                    Active ({activeImages})
                </ToggleButton>
            </Col>
            <Col xs="auto">
                <ToggleButton id={inactiveButtonId} type="checkbox" value={1}
                              checked={count === inactiveImages} onChange={inactiveClickHandler}
                              variant="outline-danger" size="sm">
                    Inactive ({inactiveImages})
                </ToggleButton>
            </Col>
        </Row>
    )
}

export default MultipleImageActiveToggle;
