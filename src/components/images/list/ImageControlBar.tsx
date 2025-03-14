import React, {useEffect} from 'react';
import ImageSearch from "./ImageSearch";
import {loadImages} from "@/ducks/images/actions";
import {useAppDispatch} from "@/app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "@/ducks/filters/filtersSlice";
import ImagesPerPage from "@/ducks/settings/ImagesPerPage";
import ImagesSize from "@/ducks/settings/ImagesSize";
import ImagePaginator from "@/ducks/settings/ImagePaginator";
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
