import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectShowSelectedImageActions} from "../ducks/images/selectors";
import SelectedImages from "../components/SelectedImages";

import {AlertList} from "chums-connected-components";
import {useAppDispatch} from "./hooks";
import FilterBar from "../ducks/filters/FilterBar";
import ImageList from "../ducks/images/ImageList";
import SelectedImage from "../ducks/images/SelectedImage";
import MultipleSelectedImages from "../ducks/images/MultipleSelectedImages";


const App = () => {
    const dispatch = useAppDispatch();
    const showSelectedImageActions = useSelector(selectShowSelectedImageActions);

    useEffect(() => {
        // dispatch(fetchImages())
    }, []);

    return (
        <div>
            <AlertList/>

            <div className="app-columns">
                <FilterBar/>
                <div className="main-section">
                    <div className="app-left">
                        <ImageList/>
                    </div>
                    <div className="app-right">
                        {showSelectedImageActions && <MultipleSelectedImages/>}
                        {!showSelectedImageActions && <SelectedImage/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
