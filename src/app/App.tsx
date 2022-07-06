import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectShowSelectedImageActions} from "../ducks/images/selectors";
import FilterBar from "../components/FilterBar";
import ImageFilterForm from "../components/ImageFilterForm";
import ImageFilter from "../components/ImageFilter";
import SelectedImages from "../components/SelectedImages";
import SelectedImage from "../components/SelectedImage";
import {AlertList} from "chums-connected-components";
import {useAppDispatch} from "./hooks";
import {fetchProfile} from "../actions/app";
import {fetchImages} from "../actions/images";
import ProductFilters from "../ducks/filters/ProductFilters";
import {fetchUserAction} from "../ducks/userProfile";


const App = () => {
    const dispatch = useAppDispatch();
    const showSelectedImageActions = useSelector(selectShowSelectedImageActions);

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchImages())
        dispatch(fetchUserAction());
    }, [])

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
                        {showSelectedImageActions && <SelectedImages/>}
                        {!showSelectedImageActions && <SelectedImage/>}
                    </div>
                </div>
            </div>
            <ProductFilters />
        </div>
    );
}

export default App;
