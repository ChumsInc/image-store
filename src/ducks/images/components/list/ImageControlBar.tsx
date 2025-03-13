import React, {useEffect} from 'react';
import ImageSearch from "./ImageSearch";
import {loadImages} from "../../actions";
import {useAppDispatch} from "../../../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "../../../filters/filtersSlice";
import ImagesPerPage from "../../../settings/ImagesPerPage";
import ImagesSize from "../../../settings/ImagesSize";
import ImagePaginator from "../../../settings/ImagePaginator";
import {Button, Col, Row} from "react-bootstrap";
import FilterBar from "@/components/filters/FilterBar";

const ImageControlBar = () => {
    const dispatch = useAppDispatch();
    const filters = useSelector(selectFilter);

    useEffect(() => {
        dispatch(loadImages(filters));
    }, [filters])

    return (
        <Row className="row g-3">
            <Col xs="auto">
                <FilterBar />
            </Col>
            <Col xs="auto">
                <Button type="button" size="sm" variant="primary" onClick={() => dispatch(loadImages(filters))}>
                    Reload
                </Button>
            </Col>
            <Col xs="auto">
                <ImageSearch/>
            </Col>
            <Col xs />
            <Col xs="auto">
                <ImagesSize/>
            </Col>
            <Col xs="auto">
                <ImagesPerPage/>
            </Col>
            <Col xs="auto">
                <ImagePaginator/>
            </Col>
        </Row>
    )
}

export default ImageControlBar;
