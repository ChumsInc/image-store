import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProgressBar from "../common-components/ProgressBar";
import ImagePreview from "./ImagePreview";


export default class ImageList extends Component {
    static propTypes = {
        list: PropTypes.array,
        defaultImagePath: PropTypes.string,
        loading: PropTypes.bool,
    };

    static defaultProps = {
        list: [],
        defaultImagePath: '250',
        loading: false,
    };

    render() {
        const {list, defaultImagePath, loading} = this.props;
        return (
            <div>
                {loading && (<ProgressBar striped={true} />)}
                {!loading && !list.length && (
                    <h3>Sorry, no images found.</h3>
                )}
                <div id="preview-images">
                    {list
                        .map((img, index) => <ImagePreview key={index} image={img} />)}
                </div>
            </div>
        );
    }
}
