import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ImageList from "./ImageList";
import {DEFAULT_IMAGE_PATH} from "../constants/image";

const mapStateToProps = ({images, settings}) => {
    const {filtered, loading, loaded} = images;
    const {filter, imagesPerPage, page, defaultImagePath} = settings;
    return {filtered, filter, imagesPerPage, page, defaultImagePath, loading, loaded};
};

const mapDispatchToProps = {};


class ImageFilter extends Component {
    static propTypes = {
        filter: PropTypes.string,
        filtered: PropTypes.array,
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        imagesPerPage: PropTypes.number,
        page: PropTypes.number,
        defaultImagePath: PropTypes.string,
    };

    static defaultProps = {
        filter: '',
        filtered: [],
        loading: false,
        loaded: false,
        imagesPerPage: 6,
        page: 1,
        defaultImagePath: DEFAULT_IMAGE_PATH,
    };

    render() {
        const {filtered, loading, loaded, imagesPerPage, page, defaultImagePath} = this.props;
        const images = filtered
            .filter((img, index) => Math.floor(index / imagesPerPage) === page - 1 );
        return (
            <div>
                <ImageList list={images} loading={!loaded || loading} defaultImagePath={defaultImagePath} />
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageFilter)
