import React from 'react';
import {selectCurrentImagesCount} from "@/ducks/images/currentImagesSlice";
import {useAppSelector} from "./hooks";
import ImageList from "@/components/images/list/ImageList";
import CurrentImageCard from "@/components/images/current-image/CurrentImageCard";
import MultipleImagesCard from "@/components/images/mutiple-images/MultipleImagesCard";
import AlertList from "../ducks/alerts/components/AlertList";
import styled from "@emotion/styled";
import classNames from "classnames";

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
            
            h2 {
                font-size: 1.25rem;
                font-weight: bold;
            }
            h3, h4 {
                font-size: 1.25rem;
                font-weight: 300;
            }
        }
    }
`

const App = () => {
    const currentImagesCount = useAppSelector(selectCurrentImagesCount);

    return (
        <div>
            <AlertList/>

            <AppColumns className="app-columns">
                <div className="main-section">
                    <div className="app-left">
                        <ImageList/>
                    </div>
                    <div
                        className={classNames("app-right", {'has-children': currentImagesCount > 0})}>
                        {currentImagesCount === 1 && <CurrentImageCard/>}
                        {currentImagesCount > 1 && <MultipleImagesCard/>}
                    </div>
                </div>
            </AppColumns>
        </div>
    );
}

export default App;
