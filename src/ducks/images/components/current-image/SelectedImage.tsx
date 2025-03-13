import React from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useSelector} from "react-redux";
import {clearCurrentImage, selectCurrentFilename, selectCurrentImage} from "../../currentImageSlice";
import AutoSizeImage from "../AutoSizeImage";
import ImageFilename from "./ImageFilename";
import SelectedItemForm from "./SelectedItemForm";
import AdditionalSKUForm from "./AdditionalSKUForm";
import {defaultAltItem} from "../../utils";
import ImageTagList from "./ImageTagList";
import ImageSizeList from "./ImageSizeList";
import DeleteImagesButton from "./DeleteImagesButton";
import {loadImage} from "../../actions";
import ImageActiveToggle from "./ImageActiveToggle";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallback from "@/app/ErrorBoundaryFallback";
import {Card, CloseButton, ProgressBar} from "react-bootstrap";
import {selectStatusById} from "@/ducks/images/imageStatusSlice";

const SelectedImage = () => {
    const dispatch = useAppDispatch();
    const current = useAppSelector(selectCurrentImage);
    const filename = useAppSelector(selectCurrentFilename);
    const status = useAppSelector((state) => selectStatusById(state, filename ?? ''));

    const clearImagesHandler = () => {
        dispatch(clearCurrentImage());
    }

    if (!current) {
        if (filename) {
            return (
                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                    <Card className="selected-image">
                        <Card.Header>{filename}</Card.Header>
                        <Card.Body>
                            {status === 'loading' && (<ProgressBar striped animated now={100} style={{height: '5px'}}/>)}
                        </Card.Body>
                    </Card>
                </ErrorBoundary>
            )
        }
        return null;
    }

    return (
        <Card className="selected-image">
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                <Card.Header>
                    <figure>
                        <div className="d-flex justify-content-between">
                            {current.item_code ?? ''}
                            <CloseButton type="button" onClick={clearImagesHandler}/>
                        </div>
                        <AutoSizeImage image={current} path="400"/>
                        <figcaption className="figure-caption text-secondary mt-1">
                            <ImageFilename filename={current.filename}/>
                        </figcaption>
                        <div style={{minHeight: '0.5rem'}}>
                            {status !== 'idle' && (<ProgressBar striped animated now={100} style={{height: '5px'}}/>)}
                        </div>
                    </figure>
                    <h3 className="item-description" style={{fontSize: '18px'}}>{current.ItemCodeDesc}</h3>
                </Card.Header>
                <Card.Body>
                    <SelectedItemForm/>
                    {current?.item_codes?.map(item => <AdditionalSKUForm key={item.id} item={item}/>)}
                    <AdditionalSKUForm item={{...defaultAltItem, filename: current.filename}}/>
                    <ImageActiveToggle/>
                </Card.Body>
                <Card.Body>
                    <ImageTagList/>
                </Card.Body>
                <Card.Body>
                    <ImageSizeList/>
                </Card.Body>
                <Card.Body>
                    <DeleteImagesButton/>
                </Card.Body>
            </ErrorBoundary>
        </Card>
    )
}

export default SelectedImage;
