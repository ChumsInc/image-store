import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setDefaultImagePath, setFilterInactive, setImagesPerPage, setPage} from "../actions/settings";
import {fetchImages, filterImages} from "../actions/images";
import Pagination from "../common-components/Pagination";
import FormGroup from "../common-components/FormGroup";
import LinkToView from "./LinkToView";

class ImageFilterForm extends Component {
    static propTypes = {
        filter: PropTypes.string,
        defaultSize: PropTypes.string,
        imagesPerPage: PropTypes.number,
        page: PropTypes.number,
        pages: PropTypes.number,
        defaultImagePath: PropTypes.string,
        filterInactive: PropTypes.bool,
        setFilter: PropTypes.func.isRequired,
        fetchImages: PropTypes.func.isRequired,
        setPage: PropTypes.func.isRequired,
        setImagesPerPage: PropTypes.func.isRequired,
        setDefaultImagePath: PropTypes.func.isRequired,
        setFilterInactive: PropTypes.func.isRequired,
    };

    static defaultProps = {
        filter: '',
        defaultSize: '250',
        imagesPerPage: 24,
        defaultImagePath: '250',
        page: 1,
        filterInactive: true,
    };

    constructor(props) {
        super(props);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeImagesPerPage = this.onChangeImagesPerPage.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.page > 1 && this.props.page > this.props.pages) {
            this.props.setPage(1);
        }
    }


    onChangeFilter({field, value}) {
        this.props.setFilter(value);
    }

    onChangeImagesPerPage({field, value}) {
        this.props.setImagesPerPage(Number(value));
    }

    onChangePage(page) {
        this.props.setPage(Number(page));
    }

    render() {
        const {filter, defaultImagePath, pages, page, imagesPerPage, filterInactive} = this.props;
        return (
            <div className="row g-3 mb-1">
                <div className="col-auto">Page</div>
                <div className="col-auto">
                    <Pagination onSelect={this.onChangePage} pages={pages} activePage={page} />
                </div>
                <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-primary" onClick={this.props.fetchImages}>Reload</button>
                </div>
                <div className="col-auto">
                    <LinkToView />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({settings, images}) => {
    const {filter, imagesPerPage, page, defaultImagePath, filterInactive} = settings;
    const pages = Math.ceil(images.filtered.length / (imagesPerPage || 1));
    const filtered = images.filtered.length < images.list.length;
    return {filter, imagesPerPage, page, defaultImagePath, pages, filtered, filterInactive};
};

const mapDispatchToProps = {setFilter: filterImages, fetchImages, setPage, setImagesPerPage, setDefaultImagePath, setFilterInactive};

export default connect(mapStateToProps, mapDispatchToProps)(ImageFilterForm) 
