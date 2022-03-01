import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {imagePath} from "../utils";
import {connect} from "react-redux";
import {selectImage, selectImageForTag} from '../actions/images';
import ImageSizeBadges from "./ImageSizeBadges";
import classNames from 'classnames';
import AutoSizeImage from "./AutoSizeImage";
import ImageTagBadges from "./ImageTagBadges";


const CheckBox = ({filename, checked, onChange}) => <input type="checkbox"  className="taglist-select"
                                                 checked={checked}
                                                 onChange={() => onChange(filename)}/>

class ImagePreview extends Component {
    static propTypes = {
        defaultImagePath: PropTypes.string,
        image: PropTypes.shape({
            filename: PropTypes.string,
            pathnames: PropTypes.arrayOf(PropTypes.string),
            sizes: PropTypes.object,
            color_space: PropTypes.object,
            img_format: PropTypes.object,
            tags: PropTypes.arrayOf(PropTypes.string),
            notes: PropTypes.string,
            item_code: PropTypes.string,
        }),
        hasSelectedForAction: PropTypes.bool,
        canEdit: PropTypes.bool,
        selectImage: PropTypes.func.isRequired,
        selectImageForTag: PropTypes.func.isRequired,
    };

    static defaultProps = {
        defaultImagePath: '250',
        image: {
            filename: '',
            pathnames: [],
            sizes: {},
            color_space: {},
            img_format: {},
            notes: '',
            item_code: '',
        },
        hasSelectedForAction: false,
        canEdit: false,
    };

    constructor(props) {
        super(props);
        this.onSelectForTag = this.onSelectForTag.bind(this);
    }


    onSelectForTag() {
        this.props.selectImageForTag(this.props.image.filename)
    }

    render() {
        const {image, defaultImagePath, hasSelectedForAction, canEdit} = this.props;
        const {filename, pathnames = [], sizes, tags, InactiveItem} = image;
        const path = pathnames.includes(defaultImagePath) ? defaultImagePath : pathnames.sort()[0];
        const now = new Date().valueOf().toString(36);
        const checked = hasSelectedForAction;

        const src = imagePath({path, filename});
        return (
            <figure className={classNames('default-' + defaultImagePath, 'preview-image', {'checked': hasSelectedForAction})}>
                {!!canEdit && (
                    <CheckBox filename={filename} checked={checked} onChange={this.onSelectForTag}/>
                )}
                <div className="preview-image-selector" onClick={() => this.props.selectImage(image)}>
                    <AutoSizeImage sizes={sizes} preferredPath={defaultImagePath} filename={filename}
                                   altText={image.item_code} className="img-thumbnail"/>
                </div>
                <figcaption className="figure-caption">
                    <ImageSizeBadges filename={filename} pathnames={pathnames} sizes={sizes} />
                    <ImageTagBadges inactive={InactiveItem === 'Y'} tags={tags}/>
                    <div>{filename}</div>
                </figcaption>
            </figure>
        )
    }
}


const mapStateToProps = ({settings, images, user}, ownProps) => {
    const {canEdit} = user;
    const hasSelectedForAction = !!images.selectedForAction.list.filter(filename => filename === ownProps.image.filename).length;
    const {defaultImagePath} = settings;
    return {defaultImagePath,hasSelectedForAction, canEdit};
};

const mapDispatchToProps = {
    selectImage,selectImageForTag,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview)
