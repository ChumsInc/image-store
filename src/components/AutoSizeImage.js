import React from 'react';
import {imagePath, imagePreferredPath} from "../utils";


const AutoSizeImage = ({filename, sizes, preferredPath = '400', altText = '', className="img-fluid"}) => {
    const src = imagePath({path: imagePreferredPath({preferredPath, sizes}), filename})
    return (
        <img src={src} alt={altText || filename} className={className} loading="lazy" />
    );
};

export default AutoSizeImage;
