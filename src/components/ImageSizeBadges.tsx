import React from 'react';
import {imagePath} from "../utils";
import LinkBadge from "./LinkBadge";
import {ImageSizeList, ImageSizePath} from "chums-types";


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
                .map(size => <LinkBadge color="info" href={imagePath({path: size.key, filename})}
                                        key={size.key}>{size.key}</LinkBadge>)}
        </div>
    );
}

export default ImageSizeBadges;
