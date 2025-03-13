import React, {ChangeEvent, MouseEvent} from 'react';
import {ProductImage} from "chums-types";
import {useAppDispatch} from "../../../../app/hooks";
import {useSelector} from "react-redux";
import {selectImagePath, selectShowItemCode} from "../../../settings";
import {selectCurrentImage} from "../../currentImageSlice";
import classNames from "classnames";
import AutoSizeImage from "../AutoSizeImage";
import ImageSizeBadges from "../../../../components/ImageSizeBadges";

import ImageTagBadges from "../../../../components/ImageTagBadges";
import {selectCanEdit} from "../../../userProfile";
import {loadImage} from "../../actions";
import {Badge} from "react-bootstrap";
import {addAdditionalImage, removeAdditionalImage, selectSelectedForAction} from "@/ducks/images/selectedImagesSlice";
import styled from "@emotion/styled";

const PreviewImage = styled.div`
    
    --preview-image-padding: calc(1.5rem + 2px);
    
    flex: 0 0 auto;
    padding: 0.5rem;
    text-align: center;
    img {
        height: auto;
    }
    &.preview-image {
        position: relative;
        &.selected img {
            //border-width: 3px;
        }
        &.preferred {
            img {
                //border-color: var(--bs-primary);
            }
        }
        .taglist-select {
            display:none;
            position: absolute;
            z-index: 30;
            top: var(--preview-image-top);
            right: var(--preview-image-top);
            &:checked {
                display: block;
            }
        }
        &:hover {
            .taglist-select {
                display: block;
            }
        }
    }
    .preview-image-selector {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    &.default-80 {
        max-width: calc(80px + 1rem);
        flex-basis: calc(80px + 1rem);
        .preview-image-selector {
            min-height: calc(80px + 0.5rem + 2px);
        }
    }
    &.default-125 {
        max-width: calc(125px + 1rem);
        flex-basis: calc(125px + 1rem);
        .preview-image-selector {
            min-height: calc(125px + 2px);
        }
    }
    &.default-250 {
        max-width: calc(250px + 1rem);
        flex-basis: calc(250px + 1rem);
        .preview-image-selector {
            min-height: calc(250px + 2px);
        }
    }
    &.default-400 {
        max-width: calc(400px + 1rem);
        flex-basis: calc(400px + 1rem);
        .preview-image-selector {
            min-height: calc(400px + 2px);
        }
    }
    figcaption {
        word-break: break-all;
        margin-top: 0.5rem;
        .tag-badges,
        .size-badges {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            a.badge {
                text-decoration: none;
            }
            .badge {
                margin-right: 3px;
                margin-bottom: 1px;
            }
        }
    }

`

export interface ImagePreviewProps {
    image: ProductImage,
}

const ImagePreview = ({image}: ImagePreviewProps) => {
    const dispatch = useAppDispatch();
    const path = useSelector(selectImagePath);
    const selected = useSelector(selectSelectedForAction);
    const currentImage = useSelector(selectCurrentImage);
    const canEdit = useSelector(selectCanEdit);
    const showItemCode = useSelector(selectShowItemCode);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {

        if (canEdit) {
            ev.stopPropagation();
            if (ev.target.checked) {
                dispatch(addAdditionalImage(image));
            } else {
                dispatch(removeAdditionalImage(image.filename));
            }

        }
    }

    const selectImageHandler = (ev: MouseEvent) => {
        if (canEdit && (ev.ctrlKey || ev.shiftKey)) {
            return dispatch(addAdditionalImage(image));
        }
        dispatch(loadImage(image.filename));
    }

    const className = classNames({
        checked: selected.map(img => img.filename).includes(image.filename),
        preferred: image.preferred_image,
        selected: currentImage?.filename === image.filename,
    })
    return (
        <PreviewImage className={classNames('default-' + path, 'preview-image', className)}>
            {canEdit && (
                <input type="checkbox" checked={selected.map(img => img.filename).includes(image.filename)}
                       className="taglist-select"
                       onChange={changeHandler}/>
            )}
            <div className="preview-image-selector" onClick={selectImageHandler}>
                <AutoSizeImage image={image} path={path}/>
            </div>
            <figcaption className="figure-caption">
                {showItemCode && <div className="text-body">{image.ItemCode ?? '-'}</div>}
                <ImageSizeBadges filename={image.filename} sizes={image.sizes}/>
                <div className="filename text-secondary">{image.filename}</div>
                {image.preferred_image && (
                    <div className="my-1"><Badge bg="primary">Preferred Image</Badge></div>
                )}
                <ImageTagBadges inactive={image.InactiveItem === 'Y' || !image.active} tags={image.tags}/>
            </figcaption>
        </PreviewImage>
    )
}

export default ImagePreview;
