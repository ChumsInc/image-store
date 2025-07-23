import {type MouseEvent} from 'react';
import type {ProductImage} from "chums-types";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useSelector} from "react-redux";
import {selectImagePath, selectShowItemCode} from "@/ducks/settings";
import {removeAdditionalImage, selectIsCurrentImage} from "@/ducks/images/currentImagesSlice";
import classNames from "classnames";
import AutoSizeImage from "../AutoSizeImage";
import ImageSizeBadges from "../../ImageSizeBadges";

import ImageTagBadges from "../../ImageTagBadges";
import {selectCanEdit} from "@/ducks/userProfile";
import {loadAdditionalImage, loadImage} from "@/ducks/images/actions";
import {Badge} from "react-bootstrap";
import styled from "@emotion/styled";

const PreviewImage = styled.div`
    --preview-image-padding: calc(1.5rem + 2px);

    flex: 0 0 auto;
    padding: 0.5rem;
    text-align: center;

    img {
        height: auto;
    }

    .preview-image-selector {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    &.checked .preview-image-selector {
        border: var(--bs-border-width) solid var(--bs-border-color);
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
    const checked = useAppSelector((state) => selectIsCurrentImage(state, image.filename));
    const canEdit = useSelector(selectCanEdit);
    const showItemCode = useSelector(selectShowItemCode);

    const selectImageHandler = (ev: MouseEvent) => {
        if (canEdit && (ev.ctrlKey || ev.shiftKey)) {
            if (checked) {
                dispatch(removeAdditionalImage(image.filename));
                return;
            }
            return dispatch(loadAdditionalImage(image));
        }
        dispatch(loadImage(image));
    }

    const className = classNames({
        checked: checked,
        preferred: image.preferred_image,
    })
    return (
        <PreviewImage className={classNames('default-' + path, 'preview-image', className)}>
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
