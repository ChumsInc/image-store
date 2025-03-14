import React from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {clearCurrentImage, selectCurrentFilename, selectCurrentImage} from "@/ducks/images/currentImagesSlice";
import AutoSizeImage from "../AutoSizeImage";
import ImageFilename from "./ImageFilename";
import SelectedItemForm from "./SelectedItemForm";
import AdditionalSKUForm from "./AdditionalSKUForm";
import {defaultAltItem} from "@/ducks/images/utils";
import ImageTagList from "./ImageTagList";
import ImageSizeList from "./ImageSizeList";
import DeleteImagesButton from "./DeleteImagesButton";
import ImageActiveToggle from "./ImageActiveToggle";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallback from "@/app/ErrorBoundaryFallback";
import {Card, CloseButton, Figure, ProgressBar} from "react-bootstrap";
import {selectStatusById} from "@/ducks/images/imageStatusSlice";

const CurrentImageCard = () => {
    const dispatch = useAppDispatch();
    const current = useAppSelector(selectCurrentImage);
    const filename = useAppSelector(selectCurrentFilename);
    const status = useAppSelector((state) => selectStatusById(state, filename ?? ''));

    const clearImagesHandler = () => {
        dispatch(clearCurrentImage());
    }

    if (!current) {
        return null;
    }

    return (
        <Card className="selected-image">
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                <Card.Header>
                    <div className="d-flex justify-content-between">
                        <h2>{current.item_code ?? ''}</h2>
                        <CloseButton type="button" onClick={clearImagesHandler}/>
                    </div>
                    <Figure>
                        <AutoSizeImage image={current} path="400"/>
                        <Figure.Caption>
                            <ImageFilename filename={current.filename}/>
                        </Figure.Caption>
                    </Figure>
                    <div style={{minHeight: '0.5rem'}}>
                        {status !== 'idle' && (<ProgressBar striped animated now={100} style={{height: '5px'}}/>)}
                    </div>
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

export default CurrentImageCard;
