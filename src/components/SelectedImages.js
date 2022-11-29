import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoSizeImage from "../ducks/images/AutoSizeImage";
import PropTypes from 'prop-types';
import {tagImages, clearSelectedForAction} from '../actions/images'
import classNames from 'classnames';
import SelectedImages_ApplyTag from "./SelectedImages_ApplyTag";
import SelectedImages_ApplySKU from "./SelectedImages_ApplySKU";

function mapStateToProps({images}) {
    const {list, selectedForAction} = images;
    const selectedImages = list.filter(img => selectedForAction.list.includes(img.filename));
    return {
        selectedImages,
    };
}

const mapDispatchToProps = {
    tagImages,
    clearSelectedForAction,
}

const actions = {
    tag: 'Tag Images',
    setSKU: 'Apply to Item Code',
};

class SelectedImages extends Component {
    static propTypes = {
        selectedImages: PropTypes.arrayOf(PropTypes.shape({
            filename: PropTypes.string,
            sizes: PropTypes.object,
            tags: PropTypes.arrayOf(PropTypes.string),
        })),
        tagImages: PropTypes.func.isRequired,
    }
    static defaultProps = {
        selectedImages: [],
    };

    state = {
        action: 'tag',
    }

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.props.tagImages(this.state.tag)
            .then(() => this.setState({tag: ''}));
    }

    onSetAction(ev, action) {
        ev.preventDefault()
        this.setState({action});
    }

    render() {
        const {selectedImages} = this.props;
        const {action} = this.state;
        if (selectedImages.length === 0) {
            return null;
        }
        return (
            <div className="selected-for-tag mb-3">
                <h3>Selected Images</h3>
                <div className="selected-image-list mb-1">
                    {selectedImages.map(image => (
                        <AutoSizeImage key={image.filename} sizes={image.sizes} preferredPath="80"
                                       filename={image.filename}
                                       altText={image.filename} className="img-thumbnail"/>
                    ))}
                </div>
                <button className="btn btn-sm btn-outline-secondary" onClick={this.props.clearSelectedForAction}>Clear Selection</button>
                <hr />
                <ul className="nav nav-tabs">
                    {Object.keys(actions).map(key => (
                        <li key={key} className="nav-item">
                            <a className={classNames('nav-link', {active: key === action})}
                               href="#" onClick={(ev) => this.onSetAction(ev, key)}>
                                {actions[key]}
                            </a>
                        </li>
                    ))}
                </ul>
                {action === 'tag' && (<SelectedImages_ApplyTag/>)}
                {action === 'setSKU' && (<SelectedImages_ApplySKU/>)}

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectedImages);
