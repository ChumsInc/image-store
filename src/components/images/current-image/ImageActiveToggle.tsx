import {useId} from 'react';
import {useAppDispatch} from "@/app/hooks";
import {useSelector} from "react-redux";
import {selectCurrentImage} from "@/ducks/images/currentImagesSlice";
import {selectCanEdit} from "@/ducks/userProfile";
import {ToggleButton} from "react-bootstrap";
import {setImageActive} from "@/ducks/images/actions";
import {Col, Row} from "react-bootstrap";

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
        <Row className="g-3 mb-1 align-items-baseline">
            <Col xs="auto">
                Image Status
            </Col>
            <Col xs="auto">
                <ToggleButton id={activeButtonId} value={1} type="checkbox" disabled={!canEdit}
                              variant="outline-success" size="sm"
                              checked={current.active ?? false} onChange={activeClickHandler} >
                    Active
                </ToggleButton>
            </Col>
            <Col xs="auto">
                <ToggleButton id={inactiveButtonId} value={1} type="checkbox" disabled={!canEdit}
                              variant="outline-danger" size="sm"
                              checked={!current.active} onChange={inactiveClickHandler}>
                    Inactive
                </ToggleButton>
            </Col>
        </Row>
    )
}

export default ImageActiveToggle;
