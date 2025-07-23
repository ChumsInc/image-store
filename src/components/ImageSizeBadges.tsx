import React from 'react';
import {imagePath} from "../utils";
import LinkBadge from "./LinkBadge";
import type {ImageSizeList, ImageSizePath} from "chums-types";


export interface ImageSizeBadgedProps {
    filename: string,
    sizes: ImageSizeList,
}

const ImageSizeBadges: React.FC<ImageSizeBadgedProps> = ({filename = '', sizes = {}}) => {
    return (
        <div className="size-badges">
            {Object.keys(sizes)
                .map(key => ({...sizes[key as ImageSizePath], key}))
                .sort((a, b) => (a.width ?? 0) - (b.width ?? 0))
                .map(size => (
                    <LinkBadge key={size.key} bg="info" text="dark"
                               href={imagePath({path: size.key, filename})}
                               linkProps={{target: '_blank', rel: 'noreferrer nofollow'}}>
                        {size.key}
                    </LinkBadge>
                ))}
        </div>
    );
}

export default ImageSizeBadges;
