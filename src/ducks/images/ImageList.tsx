import React from 'react';
import {useSelector} from "react-redux";
import {selectFilteredImages, selectImagesLoading} from "./selectors";
import ImageControlBar from "./ImageControlBar";
import {LoadingProgressBar} from "chums-components";
import {selectImagesPerPage, selectPage} from "../settings";
import ImagePreview from "./ImagePreview";
import InvalidURLAlert from "./InvalidURLAlert";

const ImageList = () => {
    const images = useSelector(selectFilteredImages)
    const loading = useSelector(selectImagesLoading);
    const page = useSelector(selectPage);
    const imagesPerPage = useSelector(selectImagesPerPage);

    const first = page * imagesPerPage;
    const last = first + imagesPerPage;

    return (
        <div>
            <ImageControlBar/>
            <div className="mt-1" style={{minHeight: '1rem'}}>
                {loading && (<LoadingProgressBar striped animated style={{height: '3px'}}/>)}
            </div>
            <InvalidURLAlert/>
            {!loading && !images.length && (
                <h3>Sorry, no images found.</h3>
            )}
            <div id="preview-images">
                {images
                    .slice(first, last)
                    .map((img, index) => <ImagePreview key={index} image={img}/>)}
            </div>

        </div>
    )
}
export default ImageList;
