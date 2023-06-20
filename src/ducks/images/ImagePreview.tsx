import React, {ChangeEvent, MouseEvent} from 'react';
import {ProductImage} from "chums-types";
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectImagePath, selectShowItemCode} from "../settings";
import {selectCurrentImage, selectSelectedForAction} from "./selectors";
import classNames from "classnames";
import AutoSizeImage from "./AutoSizeImage";
import ImageSizeBadges from "../../components/ImageSizeBadges";

import ImageTagBadges from "../../components/ImageTagBadges";
import {selectCanEdit} from "../userProfile";
import {selectFilterPreferredImages} from "../filters/selectors";
import {selectAdditionalImage, setCurrentImage} from "./actions";
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
    const preferredImages = useSelector(selectFilterPreferredImages);
    const showItemCode = useSelector(selectShowItemCode);

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        if (canEdit) {
            ev.stopPropagation();
            dispatch(selectAdditionalImage(image));
        }
    }

    const selectImageHandler = (ev:MouseEvent) => {
        if (canEdit && (ev.ctrlKey || ev.shiftKey)) {
            return dispatch(selectAdditionalImage(image));
        }
        dispatch(setCurrentImage(image.filename));
    }

    const className = classNames({
        checked: selected.map(img => img.filename).includes(image.filename),
        preferred:  image.preferred_image,
        selected: currentImage?.filename === image.filename,
    })
    return (
        <figure className={classNames('default-' + path, 'preview-image', className)}>
            {canEdit && (
                <input type="checkbox" checked={selected.map(img => img.filename).includes(image.filename)}
                       className="taglist-select"
                       onChange={changeHandler} />
            )}
            <div className="preview-image-selector" onClick={selectImageHandler}>
                <AutoSizeImage image={image} path={path}/>
            </div>
            <figcaption className="figure-caption">
                {showItemCode && <div className="text-muted">{image.ItemCode ?? '-'}</div>}
                <ImageSizeBadges filename={image.filename} sizes={image.sizes} />
                <div className="filename">{image.filename}</div>
                {!preferredImages && image.preferred_image && (
                    <div className="my-1"><Badge color="primary">Preferred Image</Badge></div>
                )}
                <ImageTagBadges inactive={image.InactiveItem === 'Y' || !image.active} tags={image.tags}/>
            </figcaption>
        </figure>
    )
}

export default ImagePreview;
