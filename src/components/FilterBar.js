import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {toggleShowFilters, setProductLine, setItemCategory, setItemCollection, setBaseSKU} from '../actions/settings';
import {loadFilters} from '../actions/app';
import {connect} from 'react-redux';
import {selectImage} from "../actions/images";
import FormGroupTextInput from "../common-components/FormGroupTextInput";
import FormGroup from "../common-components/FormGroup";
import Select from "../common-components/Select";
import ProductTypeSelect from "./ProductLineSelect";
import ItemCategorySelect from "./ItemCategorySelect";
import ItemBaseSKUSelect from "./ItemBaseSKUSelect";
import ItemCollectionSelect from "./ItemCollectionSelect";
import ImagesPerPageSelect from "./ImagesPerPageSelect";
import InactiveImageFilter from "./InactiveImageFilter";
import ImageSizeSelect from "./ImageSizeSelect";
import UnassignedImageFilter from "./UnassignedImageFilter";
import ImageSearch from "./ImageSearch";

const mapStateToProps = ({settings, filters, user}) => {
    const {showFilters, productLine, itemCategory, itemCollection, itemBaseSKU, filterUnassigned} = settings;
    const {canEdit, profile} = user;
    const {} = filters;
    const isUser = !!profile && !!profile.user && !!profile.user.id;
    return {showFilters, productLine, itemCategory, itemCollection, itemBaseSKU, filterUnassigned, canEdit, isUser};
};

const mapDispatchToProps = {
    toggleShowFilters,
    setProductLine, setItemCategory, setItemCollection, setBaseSKU,
    loadFilters,
};

class  FilterBar extends Component {
    transitionTimer = null;

    static propTypes = {
        showFilters: PropTypes.bool,
        productLine: PropTypes.string,
        itemCategory: PropTypes.string,
        itemCollection: PropTypes.string,
        itemBaseSKU: PropTypes.string,
        filterUnassigned: PropTypes.bool,
        canEdit: PropTypes.bool,
        isUser: PropTypes.bool,
        toggleShowFilters: PropTypes.func.isRequired,
        setProductLine: PropTypes.func.isRequired,
        setItemCategory: PropTypes.func.isRequired,
        setItemCollection: PropTypes.func.isRequired,
        setBaseSKU: PropTypes.func.isRequired,
        loadFilters: PropTypes.func.isRequired,
    };

    static defaultProps = {
        showFilters: true,
        productLine: '',
        itemCategory: '',
        itemCollection: '',
        itemBaseSKU: '',
        filterUnassigned: false,
        canEdit: false,
        isUser: false,
    };

    state = {
        inTransition: false,
    };

    componentDidMount() {
        this.props.loadFilters();
    }


    componentWillUnmount() {
        clearTimeout(this.transitionTimer)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.showFilters !== this.props.showFilters && this.state.inTransition === false) {
            this.setState({inTransition: true});
            clearTimeout(this.transitionTimer);
            this.transitionTimer = setTimeout(() => {
                this.setState({inTransition: false});
            }, 450);
        }
    }

    render() {
        const {showFilters, filterUnassigned, canEdit, isUser} = this.props;
        const {inTransition} = this.state;
        return (
            <aside className={classNames("drawer", {'drawer--open': showFilters, 'drawer--in-transition': inTransition})}>
                <div className="navbar-light">
                    <button className="navbar-toggler" onClick={this.props.toggleShowFilters}>
                        <span className="navbar-toggler-icon" />
                    </button>
                </div>
                {showFilters && (
                    <div className="form bg-light">
                        <ImagesPerPageSelect/>
                        <ImageSizeSelect/>
                        <ImageSearch />
                        {!!isUser && (
                            <Fragment>
                                <h4 className="mt-3">Filters</h4>
                                <ProductTypeSelect />
                                <ItemCategorySelect/>
                                <ItemBaseSKUSelect/>
                                <ItemCollectionSelect/>
                            </Fragment>
                        )}
                        {!!canEdit && (
                            <Fragment>
                                <div>Options</div>
                                <UnassignedImageFilter />
                                <InactiveImageFilter/>
                            </Fragment>
                        )}
                    </div>
                )}
            </aside>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
