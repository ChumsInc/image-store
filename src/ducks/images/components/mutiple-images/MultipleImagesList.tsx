import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import AutoSizeImage from "../AutoSizeImage";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../../app/hooks";
import {clearAdditionalImages} from "../../selectedImagesSlice";
import {selectSelectedForAction} from "@/ducks/images/selectedImagesSlice";

export default function MultipleImagesList() {
    const dispatch = useAppDispatch();
    const images = useSelector(selectSelectedForAction);

    const clearImagesHandler = () => {
        dispatch(clearAdditionalImages());
    }

    return (
        <div>
            <Row className="g-3 mb-1">
                {images.map(img => (
                    <Col xs="auto" key={img.filename}>
                        <AutoSizeImage image={img} path="80"/>
                    </Col>
                ))}
            </Row>
            <div className="d-grid">
                <Button type="button" variant="outline-secondary" className="d-block" onClick={clearImagesHandler}>
                    Clear List
                </Button>
            </div>

        </div>
    )
}
