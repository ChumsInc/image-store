import React from 'react';
import {useSelector} from "react-redux";
import {selectFilteredImages, selectImagesLoading} from "../../selectors";
import ImageControlBar from "./ImageControlBar";
import {selectImagesPerPage, selectPage} from "../../../settings";
import ImagePreview from "./ImagePreview";
import InvalidURLAlert from "./InvalidURLAlert";
import {ProgressBar} from "react-bootstrap";

const ImageList = () => {
    const images = useSelector(selectFilteredImages)
    const loading = useSelector(selectImagesLoading);
    const page = useSelector(selectPage);
    const imagesPerPage = useSelector(selectImagesPerPage);

    return (
        <div>
            <ImageControlBar/>
            <div className="mt-1" style={{minHeight: '1rem'}}>
                {loading && (<ProgressBar striped animated style={{height: '3px'}} now={100}/>)}
            </div>
            <InvalidURLAlert/>
            {!loading && !images.length && (
                <h3>Sorry, no images found.</h3>
            )}
            <div id="preview-images">
                {images
                    .slice(page * imagesPerPage, page * imagesPerPage + imagesPerPage)
                    .map((img, index) => <ImagePreview key={index} image={img}/>)}
            </div>

        </div>
    )
}
export default ImageList;
