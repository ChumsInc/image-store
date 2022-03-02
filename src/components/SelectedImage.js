import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ImageDetail from "./ImageDetail";
import {imagePath} from "../utils";
import {deleteImage, saveItemCode, updateSelectedImage} from '../actions/images';
import ProgressBar from "../common-components/ProgressBar";
import AutoSizeImage from "./AutoSizeImage";
import ItemCodeForm from "./ItemCodeForm";
import classNames from 'classnames';
import ImageTagList from "../ducks/images/ImageTagList";
import PreferredImageButton from "../ducks/images/PreferredImageButton";

class SelectedImage extends Component {
    static propTypes = {
        selected: PropTypes.shape({
            filename: PropTypes.string,
            pathnames: PropTypes.arrayOf(PropTypes.string),
            sizes: PropTypes.object,
            color_space: PropTypes.object,
            img_format: PropTypes.object,
            tags: PropTypes.arrayOf(PropTypes.string),
            notes: PropTypes.string,
            item_code: PropTypes.string,
            ItemCodeDesc: PropTypes.string,
            InactiveItem: PropTypes.string,
            ProductType: PropTypes.string,
            loading: PropTypes.bool,
            item_codes: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                filename: PropTypes.string,
                item_code: PropTypes.string,
                ItemCodeDesc: PropTypes.string,
                InactiveItem: PropTypes.string,
                ProductType: PropTypes.string,
            })),
        }),
        canEdit: PropTypes.bool,
        canDelete: PropTypes.bool,
        saveItemCode: PropTypes.func.isRequired,
        deleteImage: PropTypes.func.isRequired,
    };

    static defaultProps = {
        selected: {
            filename: '',
            pathnames: [],
            sizes: {},
            color_space: {},
            img_format: {},
            notes: '',
            item_code: '',
            ItemCodeDesc: '',
            InactiveItem: 'N',
            ProductType: '',
            loading: false,
            item_codes: [],
        },
        canEdit: false,
        canDelete: false,
    };

    state = {
        showCopied: false,
    }

    constructor(props) {
        super(props);
        this.onSaveItemCode = this.onSaveItemCode.bind(this);
        this.onDeleteImage = this.onDeleteImage.bind(this);
        this.copyOnClick = this.copyOnClick.bind(this);
    }

    onSaveItemCode({id, isPrimaryItem, filename, itemCode}) {
        this.props.saveItemCode({id, isPrimaryItem, filename, itemCode});
    }

    onDeleteImage() {
        if (window.confirm('Are you sure you want to delete this image group?')) {
            this.props.deleteImage(this.props.selected.filename);
        }
    }

    copyOnClick() {
        navigator.clipboard.writeText(this.props.selected.filename)
            .then(() => console.log(`copied filename ${this.props.selected.filename}`))
            .catch(err => console.log(err, err.message));
        this.showCopied();
    }

    showCopied() {
        this.setState({showCopied: true}, () => {
            setTimeout(() => {
                this.setState({showCopied: false})
            }, 1500);
        });
    }

    render() {
        const defaultImagePath = '400';
        const {canDelete, canEdit} = this.props;
        const {showCopied} = this.state;
        const {
            filename, pathnames = [], sizes, item_code, loading, ItemCodeDesc, ProductType, InactiveItem,
            item_codes = []
        } = this.props.selected;
        const path = pathnames.includes(defaultImagePath) ? defaultImagePath : pathnames.sort()[0];
        if (!filename) {
            return (
                <div className="selected-image">
                    <h3>Select an Image</h3>
                </div>
            );
        }
        const src = imagePath({path, filename});
        return (
            <div className="selected-image">

                <figure>
                    <AutoSizeImage sizes={sizes} preferredPath={defaultImagePath} filename={filename}
                                   altText={item_code} className="img-thumbnail"/>
                    {loading && <ProgressBar striped={true} style={{height: '3px'}}/>}
                    <figcaption className="figure-caption">
                        <div onClick={this.copyOnClick} className="click-copy">Filename: {filename}</div>
                    </figcaption>
                    <div className={classNames('badge badge-success fade', {show: showCopied})}>filename copied.</div>
                </figure>
                <h3 className="item-description">{ItemCodeDesc}</h3>
                <ItemCodeForm onSave={this.onSaveItemCode}
                              isPrimaryItem
                              filename={filename}
                              item_code={item_code} ItemCodeDesc={ItemCodeDesc} ProductType={ProductType}
                              InactiveItem={InactiveItem}
                              readOnly={!canEdit}/>
                <PreferredImageButton />
                {item_codes.map(item => (
                    <ItemCodeForm key={item.id} onSave={this.onSaveItemCode} readOnly={!canEdit} {...item}/>
                ))}
                {!!canEdit && (<ItemCodeForm onSave={this.onSaveItemCode} readOnly={false} filename={filename}/>)}
                <ImageTagList />
                <ImageDetail filename={filename} pathnames={pathnames} sizes={sizes}/>
                {!!canDelete && (
                    <button type="button" className="btn btn-sm btn-danger" onClick={this.onDeleteImage}>Delete All
                        Images</button>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({images, settings, user}) => {
    const {selected} = images;
    const {canEdit, canDelete} = user;
    const {} = settings;
    return {selected, canEdit, canDelete};
};

const mapDispatchToProps = {
    saveItemCode,
    updateSelectedImage,
    deleteImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedImage) 
