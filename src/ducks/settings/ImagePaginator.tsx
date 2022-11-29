import React from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectImagesPerPage, selectPage, setPage} from "./index";
import classNames from "classnames";
import {selectFilteredImages} from "../images/selectors";

const ImagePaginator = () => {
    const dispatch = useAppDispatch();
    const page = useSelector(selectPage);
    const imagesPerPage = useSelector(selectImagesPerPage);
    const count = useSelector(selectFilteredImages).length;

    const first = (page * imagesPerPage) + 1;
    const last = Math.min(page * imagesPerPage + imagesPerPage, count);
    const lastPage = imagesPerPage === 0 ? 0 : Math.floor((count - 1) / imagesPerPage);

    const buttonClassName = classNames("btn btn-light btn-sm");

    const onChangePage = (page: number) => {
        dispatch(setPage(page));
    }

    return (
        <div className="row gx-3">
            <div className="col-auto">
                {first}-{last} of {count}
            </div>
            <div className="col-auto">
                <button className={buttonClassName} disabled={page === 0}
                        onClick={() => onChangePage(0)}>
                    <span className="bi-chevron-bar-left"/>
                </button>
            </div>
            <div className="col-auto">
                <button className={buttonClassName} disabled={page === 0}
                        onClick={() => onChangePage(page - 1)}>
                    <span className="bi-chevron-left"/>
                </button>
            </div>
            <div className="col-auto">
                <button className={buttonClassName} disabled={page >= lastPage}
                        onClick={() => onChangePage(page + 1)}>
                    <span className="bi-chevron-right"/>
                </button>
            </div>
            <div className="col-auto">
                <button className={buttonClassName} disabled={page >= lastPage}
                        onClick={() => onChangePage(lastPage)}>
                    <span className="bi-chevron-bar-right"/>
                </button>
            </div>
        </div>
    )
}

export default ImagePaginator;
