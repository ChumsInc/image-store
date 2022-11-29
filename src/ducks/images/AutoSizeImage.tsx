import React from 'react';
import {imagePath, imagePreferredPath} from "./utils";
import {ImageSizePath, ProductImage} from "chums-types/product-image";


export interface AutoSizeImageProps {
    image: ProductImage;
    path: ImageSizePath;
}
const AutoSizeImage = ({image, path}:AutoSizeImageProps) => {
    if (!image) {
        return null;
    }
    const foundPath = imagePreferredPath(path, image.sizes)
    const {width, height} = image.sizes[foundPath] ?? {};
    const src = imagePath(foundPath, image.filename);

    return (
        <img src={src} alt={image.ItemCodeDesc || image.filename} className="img-fluid img-thumbnail"
             loading="lazy"
             width={width} height={height}/>
    );
};

export default AutoSizeImage;
