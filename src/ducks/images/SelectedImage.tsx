import React, {FormEvent} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectCurrentImage} from "./selectors";
import AutoSizeImage from "./AutoSizeImage";
import {ErrorBoundary, LoadingProgressBar} from "chums-components";
import ImageFilename from "./ImageFilename";
import {selectCanEdit} from "../userProfile";
import SelectedItemForm from "./SelectedItemForm";
import PreferredImageButton from "./PreferredImageButton";
import AdditionalSKUForm from "./AdditionalSKUForm";
import {defaultAltItem} from "./utils";
import ImageTagList from "./ImageTagList";
import ImageSizeList from "./ImageSizeList";
import DeleteImagesButton from "./DeleteImagesButton";

const SelectedImage = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentImage);
    const canEdit = useSelector(selectCanEdit);

    const primaryItemSubmitHandler = (ev: FormEvent) => {
        ev.preventDefault();
    }

    if (!current) {
        return null;
    }
    return (
        <div className="selected-image">
            <ErrorBoundary>
                <figure>
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
                <ImageTagList />
                <ImageSizeList />
                <DeleteImagesButton />
            </ErrorBoundary>
        </div>
    )
}

export default SelectedImage;
