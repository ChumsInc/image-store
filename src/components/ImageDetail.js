import React, {Component} from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import {imagePath} from "../utils";

const ImageLink = ({path, filename, height, width, size}) => (
    <a href={imagePath({path, filename})} target="_blank">
        <div className="size-list">{width} x {height} <small>({numeral(size).format('0.0b')})</small></div>
    </a>
);



export default class ImageDetail extends Component {
    static propTypes = {
        filename: PropTypes.string,
        pathnames: PropTypes.array,
        sizes: PropTypes.object,
    };

    static defaultProps = {
        filename: '',
        pathnames: [],
        sizes: {},
    };

    render() {
        const {filename, pathnames, sizes} = this.props;
        return (
            <div className="mt-3">
                <h4>Sizes</h4>
                <div className="image-sizes">
                    {Object.keys(sizes)
                        .map(key => ({...sizes[key], key}))
                        .sort((a, b) => a.width - b.width)
                        .map(size => <ImageLink key={size.key} path={size.key} filename={filename} {...size} />)}
                </div>
            </div>
        );
    }
}
