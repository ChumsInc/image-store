import React, {MouseEvent} from 'react';
import {ProductImage} from "chums-types/product-image";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectImagePath} from "../settings";
import {selectCurrentImage, selectSelectedForAction} from "./selectors";
import classNames from "classnames";
import AutoSizeImage from "./AutoSizeImage";
import ImageSizeBadges from "../../components/ImageSizeBadges";

import ImageTagBadges from "../../components/ImageTagBadges";
import {selectCanEdit} from "../userProfile";
import {selectFilterPreferredImages} from "../filters/selectors";
import {setCurrentImage} from "./actions";
import {Badge} from "chums-components";

export interface ImagePreviewProps {
    image: ProductImage,
}

const ImagePreview = ({image}:ImagePreviewProps) => {
    const dispatch = useAppDispatch();
    const path = useSelector(selectImagePath);
    const selected = useSelector(selectSelectedForAction);
    const currentImage = useSelector(selectCurrentImage);
    const canEdit = useSelector(selectCanEdit);
    const preferredImages = useSelector(selectFilterPreferredImages)

    const selectChangeHandler = () => {

    }

    const selectImageHandler = (ev:MouseEvent) => {
        if (ev.ctrlKey && !!currentImage) {
        }
        dispatch(setCurrentImage(image.filename));
    }

    const className = classNames({
        checked: selected.includes(image.filename),
        preferred:  image.preferred_image,
        selected: currentImage?.filename === image.filename,
    })
    return (
        <figure className={classNames('default-' + path, 'preview-image', className)}>
            {canEdit && (
                <input type="checkbox" checked={selected.includes(image.filename)}
                       className="taglist-select"
                       onChange={selectChangeHandler} />
            )}
            <div className="preview-image-selector" onClick={selectImageHandler}>
                <AutoSizeImage image={image} path={path}/>
            </div>
            <figcaption className="figure-caption">
                <ImageSizeBadges filename={image.filename} sizes={image.sizes} />
                <div className="filename">{image.filename}</div>
                {!preferredImages && image.preferred_image && (
                    <div className="my-1"><Badge color="primary">Preferred Image</Badge></div>
                )}
                <ImageTagBadges inactive={image.InactiveItem === 'Y'} tags={image.tags}/>
            </figcaption>
        </figure>
    )
}

export default ImagePreview;
