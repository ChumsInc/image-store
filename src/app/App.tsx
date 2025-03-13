import React from 'react';
import {useSelector} from "react-redux";
import {selectShowSelectedImageActions} from "@/ducks/images/selectedImagesSlice";
import {useAppDispatch} from "./hooks";
import ImageList from "../ducks/images/components/list/ImageList";
import SelectedImage from "../ducks/images/components/current-image/SelectedImage";
import MultipleSelectedImages from "../ducks/images/components/mutiple-images/MultipleSelectedImages";
import AlertList from "../ducks/alerts/components/AlertList";
import {useSearchParams} from "react-router";
import styled from "@emotion/styled";
import classNames from "classnames";
import {selectHasCurrentImage} from "@/ducks/images/currentImageSlice";

//@TODO: Migrate public/styles into app styles

const AppColumns = styled.div`
    display: flex;
    flex-direction: row;

    .main-section {
        flex: 1 1 auto;
        display: flex;
        gap: 1rem;
        
        .app-left {
            flex: 1 1 auto;
        }

        .app-right {
            &:not(.has-children) {
                flex-basis: 0;
            }

            &.has-children {
                flex: 0 0 450px;
                max-width: 33vw
            }
        }
    }
`

const App = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const showSelectedImageActions = useSelector(selectShowSelectedImageActions);
    const hasCurrentImage = useSelector(selectHasCurrentImage);

    // useEffect(() => {
    //     console.log(searchParams.toString());
    //     dispatch(setFiltersFromSearchParams(searchParams));
    // }, [searchParams]);


    return (
        <div>
            <AlertList/>

            <AppColumns className="app-columns">
                <div className="main-section">
                    <div className="app-left">
                        <ImageList/>
                    </div>
                    <div
                        className={classNames("app-right", {'has-children': showSelectedImageActions || hasCurrentImage})}>
                        {showSelectedImageActions && <MultipleSelectedImages/>}
                        {!showSelectedImageActions && <SelectedImage/>}
                    </div>
                </div>
            </AppColumns>
        </div>
    );
}

export default App;
