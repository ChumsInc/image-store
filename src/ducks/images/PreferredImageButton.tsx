import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsPreferredImage, selectSelectedImage} from "./selectors";
import {ImageRecord} from "../../types";
import classNames from "classnames";
import {setPreferredImageAction} from "./actions";
import {useAppDispatch} from "../../app/hooks";

const PreferredImageButton:React.FC = () => {
    const dispatch = useAppDispatch();
    const image:ImageRecord = useSelector(selectSelectedImage);
    const isPreferredImage:boolean = useSelector(selectIsPreferredImage);

    const clickHandler = () => {
        dispatch(setPreferredImageAction())
    }
    const className = {
        'btn-secondary': isPreferredImage,
        'btn-outline-secondary': !isPreferredImage,
    };
    return (
        <div>
            <button type="button" className={classNames('btn btn-sm', className)} onClick={clickHandler}>
                {isPreferredImage ? 'Preferred Image' : 'Set Preferred Image'}
            </button>
        </div>
    )
}

export default PreferredImageButton;
