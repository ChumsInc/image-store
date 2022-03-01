import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {imagePath} from "../utils";
import Badge from "./Badge";

/**
 *
 * @param {String} filename
 * @param {Object} sizes
 * @param color_space
 * @returns {*}
 * @constructor
 */
const ImageSizeBadges = ({filename = '', sizes = {}, color_space = {}}) => {
    return (
        <div className="size-badges">
            {Object.keys(sizes)
                .map(key => ({...sizes[key], key}))
                .sort((a, b) => a.width - b.width)
                .map(size => <Badge type="info" href={imagePath({path: size.key, filename})} key={size.key} >{size.key}</Badge>)}
        </div>
    );
}

export default ImageSizeBadges;
