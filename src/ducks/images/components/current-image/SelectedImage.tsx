import React from 'react';
import {useAppDispatch} from "../../../../app/hooks";
import {useSelector} from "react-redux";
import {selectCurrentImage} from "../../selectors";
import AutoSizeImage from "../AutoSizeImage";
import ImageFilename from "./ImageFilename";
import SelectedItemForm from "./SelectedItemForm";
import AdditionalSKUForm from "./AdditionalSKUForm";
import {defaultAltItem} from "../../utils";
import ImageTagList from "./ImageTagList";
import ImageSizeList from "./ImageSizeList";
import DeleteImagesButton from "./DeleteImagesButton";
import {setCurrentImage} from "../../actions";
import ImageActiveToggle from "./ImageActiveToggle";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallback from "../../../../app/ErrorBoundaryFallback";
import {Card, CloseButton, ProgressBar} from "react-bootstrap";

const SelectedImage = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentImage);

    const clearImagesHandler = () => {
        dispatch(setCurrentImage(null));
    }

    if (!current) {
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
                            {(current.loading || current.saving) && (
                                <ProgressBar striped animated style={{height: "3px"}} now={100}/>
                            )}
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
