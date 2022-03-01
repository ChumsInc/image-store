import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {imagePath} from "../utils";
import Badge from "./Badge";

const tagTypes = {
    inactive: 'danger',
}

/**
 *
 * @param {String[]} tags
 * @param {bool} inactive
 * @returns {*}
 * @constructor
 */
const ImageTagBadges = ({tags, inactive}) => {
    const hasInactive = inactive || tags.filter(tag => tag.toLowerCase() === 'inactive').length > 0;
    return (
        <div className="tag-badges">
            {!!hasInactive && <Badge type={tagTypes.inactive} >Inactive</Badge>}
            {tags
                .filter(tag => tag.toLowerCase() !== 'inactive')
                .sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)
                .map(tag => {
                    return (<Badge type="secondary" key={tag} >{tag}</Badge>)
                })}
        </div>
    );
}

export default ImageTagBadges;
