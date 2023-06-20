import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectCurrentImage} from "./selectors";
import AutoSizeImage from "./AutoSizeImage";
import {ErrorBoundary, LoadingProgressBar} from "chums-components";
import ImageFilename from "./ImageFilename";
import SelectedItemForm from "./SelectedItemForm";
import AdditionalSKUForm from "./AdditionalSKUForm";
import {defaultAltItem} from "./utils";
import ImageTagList from "./ImageTagList";
import ImageSizeList from "./ImageSizeList";
import DeleteImagesButton from "./DeleteImagesButton";
import {setCurrentImage} from "./actions";
import ImageActiveToggle from "./ImageActiveToggle";

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
        <div className="selected-image">
            <ErrorBoundary>
                <figure>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn-close" onClick={clearImagesHandler}/>
                    </div>
                    <AutoSizeImage image={current} path="400"/>
                    <div style={{minHeight: '0.5rem'}}>
                        {(current.loading || current.saving) && <LoadingProgressBar striped animated height="3px"/>}
                    </div>
                    <figcaption className="figure-caption">
                        <ImageFilename filename={current.filename}/>
                    </figcaption>
                </figure>
                <h3 className="item-description">{current.ItemCodeDesc}</h3>
                <SelectedItemForm/>
                {current?.item_codes?.map(item => <AdditionalSKUForm key={item.id} item={item}/>)}
                <AdditionalSKUForm item={{...defaultAltItem, filename: current.filename}}/>
                <ImageActiveToggle />
                <ImageTagList/>
                <ImageSizeList/>
                <DeleteImagesButton/>
            </ErrorBoundary>
        </div>
    )
}

export default SelectedImage;
