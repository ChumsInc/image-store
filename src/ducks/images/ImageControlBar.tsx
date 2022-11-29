import React, {useEffect} from 'react';
import ImageSearch from "../filters/ImageSearch";
import {loadImages} from "./actions";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectFilter} from "../filters/selectors";
import ImagesPerPage from "../settings/ImagesPerPage";
import ImagesSize from "../settings/ImagesSize";
import ImagePaginator from "../settings/ImagePaginator";

const ImageControlBar = () => {
    const dispatch = useAppDispatch();
    const filters = useSelector(selectFilter);

    useEffect(() => {
        dispatch(loadImages(filters));
    }, [filters])

    return (
        <div className="row g-3">
            <div className="col-auto">
                <button type="button" className="btn btn-sm btn-primary"
                        onClick={() => dispatch(loadImages(filters))}>Reload
                </button>
            </div>
            <div className="col-auto">
                <ImageSearch/>
            </div>
            <div className="col-auto">
                <ImagesSize/>
            </div>
            <div className="col-auto">
                <ImagesPerPage/>
            </div>
            <div className="col" />
            <div className="col-auto">
                <ImagePaginator/>
            </div>
        </div>
    )
}

export default ImageControlBar;
