import React, {useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useSelector} from "react-redux";
import {selectCanEdit} from "@/ducks/userProfile";
import {Col, Row, ToggleButton} from "react-bootstrap";
import {setImageActive} from "@/ducks/images/actions";
import {selectMultipleBusy, selectCurrentImages} from "@/ducks/images/currentImagesSlice";

const MultipleImageActiveToggle = () => {
    const dispatch = useAppDispatch();
    const images = useSelector(selectCurrentImages);
    const canEdit: boolean = useSelector(selectCanEdit);
    const activeButtonId = useId();
    const inactiveButtonId = useId();
    const busy = useAppSelector(selectMultipleBusy);

    if (!images.length || !canEdit) {
        return null;
    }

    const setImageStatus = async (active: boolean) => {
        for await (const img of images) {
            await dispatch(setImageActive({filename: img.filename, active}));
        }
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
                <ToggleButton id={activeButtonId} type="checkbox" value={1} disabled={busy}
                              checked={count === activeImages} onChange={() => setImageStatus(true)}
                              variant="outline-success"
                              size="sm">
                    Active ({activeImages})
                </ToggleButton>
            </Col>
            <Col xs="auto">
                <ToggleButton id={inactiveButtonId} type="checkbox" value={1} disabled={busy}
                              checked={count === inactiveImages} onChange={() => setImageStatus(false)}
                              variant="outline-danger" size="sm">
                    Inactive ({inactiveImages})
                </ToggleButton>
            </Col>
        </Row>
    )
}

export default MultipleImageActiveToggle;
