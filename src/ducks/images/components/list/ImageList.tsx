import React from 'react';
import {useSelector} from "react-redux";
import {selectImagesStatus} from "../../imageListSlice";
import ImageControlBar from "./ImageControlBar";
import {selectImagesPerPage, selectPage} from "../../../settings";
import ImagePreview from "./ImagePreview";
import InvalidURLAlert from "./InvalidURLAlert";
import {ProgressBar} from "react-bootstrap";
import {selectFilteredImages} from "@/ducks/images/imageListSlice";
import styled from "@emotion/styled";


const PreviewImageList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    --preview-image-top: calc(1.5rem + 2px / 1.5);
`
const ImageList = () => {
    const images = useSelector(selectFilteredImages)
    const status = useSelector(selectImagesStatus);
    const page = useSelector(selectPage);
    const imagesPerPage = useSelector(selectImagesPerPage);

    return (
        <div>
            <ImageControlBar/>
            <div className="mt-1" style={{minHeight: '1rem'}}>
                {status === 'loading' && (<ProgressBar striped animated style={{height: '3px'}} now={100}/>)}
            </div>
            <InvalidURLAlert/>
            {status === 'idle' && !images.length && (
                <h3>Sorry, no images found.</h3>
            )}
            <PreviewImageList>
                {images
                    .slice(page * imagesPerPage, page * imagesPerPage + imagesPerPage)
                    .map((img, index) => <ImagePreview key={index} image={img}/>)}
            </PreviewImageList>

        </div>
    )
}
export default ImageList;
