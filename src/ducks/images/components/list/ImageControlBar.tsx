import React, {useEffect} from 'react';
import ImageSearch from "../../../filters/components/ImageSearch";
import {loadImages} from "../../actions";
import {useAppDispatch} from "../../../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "../../../filters/selectors";
import ImagesPerPage from "../../../settings/ImagesPerPage";
import ImagesSize from "../../../settings/ImagesSize";
import ImagePaginator from "../../../settings/ImagePaginator";
import {useSearchParams} from "react-router-dom";
import {ProductFilter} from "../../../filters";
import {filterToURLSearchParams} from "../../../filters/utils";
import {Button, Col, Row} from "react-bootstrap";

const ImageControlBar = () => {
    const dispatch = useAppDispatch();
    const filters = useSelector(selectFilter);
    let [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setSearchParams(filterToURLSearchParams(filters), {replace: true})
        dispatch(loadImages(filters));
    }, [filters])

    return (
        <Row className="row g-3">
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
