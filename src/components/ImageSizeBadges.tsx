import React from 'react';
import {imagePath} from "../utils";
import Badge from "./Badge";
import {ImageSizeList} from "../types";

export interface ImageSizeBadgedProps {
    filename: string,
    sizes: ImageSizeList,
}
const ImageSizeBadges:React.FC<ImageSizeBadgedProps> = ({filename = '', sizes = {}}) => {
    return (
        <div className="size-badges">
            {Object.keys(sizes)
                .map(key => ({...sizes[key], key}))
                .sort((a, b) => a.width - b.width)
                .map(size => <Badge type="info" href={imagePath({path: size.key, filename})}
                                    key={size.key}>{size.key}</Badge>)}
        </div>
    );
}

export default ImageSizeBadges;
