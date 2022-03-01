import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fetchProfile} from '../actions/app';
import {fetchImages} from '../actions/images';
import {connect} from 'react-redux';
import ImageFilterForm from "./ImageFilterForm";
import ImageFilter from "./ImageFilter";
import SelectedImage from "./SelectedImage";
import FilterBar from "./FilterBar";
import SelectedImages from "./SelectedImages";
import {AlertList} from "chums-ducks";

const mapStateToProps = ({images}) => {
    const {selectedForAction, selected} = images;
    const showSelectedImageActions = selectedForAction.list.length > 1
        ? true
        : !(selectedForAction.list.length === 1 && selectedForAction.list.includes(selected.filename) || selectedForAction.list.length === 0);
    return {showSelectedImageActions};
};

const mapDispatchToProps = {fetchImages, fetchProfile};


class App extends Component {
    static propTypes = {
        showSelectedImageActions: PropTypes.bool,
        fetchImages: PropTypes.func.isRequired,
        fetchProfile: PropTypes.func.isRequired,
    };

    static defaultProps = {
        showSelectedImageActions: false,
    }

    componentDidMount() {
        this.props.fetchProfile();
        this.props.fetchImages();
    }

    render() {
        const {showSelectedImageActions} = this.props;
        return (
            <div>
                <AlertList/>

                <div className="app-columns">
                    <FilterBar />
                    <div className="main-section">
                        <div className="app-left">
                            <ImageFilterForm />
                            <ImageFilter />
                        </div>
                        <div className="app-right">
                            {!!showSelectedImageActions && <SelectedImages/>}
                            {!showSelectedImageActions && <SelectedImage/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
