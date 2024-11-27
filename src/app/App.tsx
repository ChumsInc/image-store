import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectShowSelectedImageActions} from "../ducks/images/selectors";
import {useAppDispatch} from "./hooks";
import FilterBar from "../ducks/filters/components/FilterBar";
import ImageList from "../ducks/images/components/list/ImageList";
import SelectedImage from "../ducks/images/components/current-image/SelectedImage";
import MultipleSelectedImages from "../ducks/images/components/mutiple-images/MultipleSelectedImages";
import AlertList from "../ducks/alerts/components/AlertList";
import {useSearchParams} from "react-router";
import {setFiltersFromSearchParams} from "../ducks/filters/actions";

//@TODO: Migrate public/styles into app styles

const App = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const showSelectedImageActions = useSelector(selectShowSelectedImageActions);

    useEffect(() => {
        console.log(searchParams.toString());
        dispatch(setFiltersFromSearchParams(searchParams));
    }, [searchParams]);


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
