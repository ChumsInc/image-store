import {useAppDispatch} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectImagesPerPage, selectPage, setPage} from "./index";
import {selectFilteredImages} from "../images/imageListSlice";
import {Button, Col, Row} from "react-bootstrap";

const ImagePaginator = () => {
    const dispatch = useAppDispatch();
    const page = useSelector(selectPage);
    const imagesPerPage = useSelector(selectImagesPerPage);
    const count = useSelector(selectFilteredImages).length;

    const first = (page * imagesPerPage) + 1;
    const last = Math.min(page * imagesPerPage + imagesPerPage, count);
    const lastPage = imagesPerPage === 0 ? 0 : Math.floor((count - 1) / imagesPerPage);

    const onChangePage = (page: number) => {
        dispatch(setPage(page));
    }

    return (
        <Row className="gx-3 align-items-baseline">
            <Col xs="auto">
                {first}-{last} of {count}
            </Col>
            <Col xs="auto">
                <Button variant="link" disabled={page === 0}
                        onClick={() => onChangePage(0)} aria-label="First">
                    <span className="bi-chevron-bar-left" aria-hidden="true"/>
                </Button>
            </Col>
            <Col xs="auto">
                <Button variant="link" disabled={page === 0} onClick={() => onChangePage(page - 1)}
                        aria-label="Previous">
                    <span className="bi-chevron-left" aria-hidden="true"/>
                </Button>
            </Col>
            <Col xs="auto">
                <Button variant="link" disabled={page >= lastPage} onClick={() => onChangePage(page + 1)}
                        aria-label="Next">
                    <span className="bi-chevron-right" aria-hidden="true"/>
                </Button>
            </Col>
            <Col xs="auto">
                <Button variant="link" disabled={page >= lastPage} onClick={() => onChangePage(lastPage)}
                        aria-label="Last">
                    <span className="bi-chevron-bar-right" aria-hidden="true"/>
                </Button>
            </Col>
        </Row>
    )
}

export default ImagePaginator;
