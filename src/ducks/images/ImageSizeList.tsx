import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentImage} from "./selectors";
import {imageSizeSort, parseSingleImages} from "./utils";
import numeral from "numeral";
import {imagePath} from "../../utils";
import {SingleImage} from "../../types";
import {Badge} from "chums-components";

const ImageLink = ({path, filename, children}:{path:string; filename: string; children:React.ReactNode}) => (
    <a href={imagePath({path, filename})} target="_blank">
        {children}
    </a>
);

const ImageSizeList = () => {
    const current = useSelector(selectCurrentImage);
    const [images, setImages] = useState(parseSingleImages(current));

    useEffect(() => {
        setImages(parseSingleImages(current));
    },  [current]);

    if (!current) {
        return null;
    }

    return (
        <div className="mt-3">
            <h4>Sizes</h4>
            <table className="table table-xs">
                <thead>
                <tr>
                    <th>Dimensions</th>
                    <th>Attributes</th>
                    <th className="text-end">Size</th>
                </tr>
                </thead>
                <tbody>
                {images.map(img => (
                    <tr key={img.path}>
                        <td>
                            <ImageLink path={img.path} filename={img.filename}>
                                {img.size?.width ?? 0} x {img.size?.height ?? 0}
                            </ImageLink>
                        </td>
                        <td>
                            {!!img.imageFormat && <Badge color="info" className="me-1">{img.imageFormat}</Badge>}
                            {!!img.colorSpace && <Badge color="danger" className="me-1">{img.colorSpace}</Badge>}
                        </td>
                        <td className="text-end">{numeral(img.size?.size ?? 0).format('0.0b')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default ImageSizeList;
