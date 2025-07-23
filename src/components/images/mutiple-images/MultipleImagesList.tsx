import {Col, Row} from "react-bootstrap";
import AutoSizeImage from "../AutoSizeImage";
import {useSelector} from "react-redux";
import {selectCurrentImages} from "@/ducks/images/currentImagesSlice";

export default function MultipleImagesList() {
    const images = useSelector(selectCurrentImages);

    return (
        <Row className="g-3 mb-1 flex-wrap">
            {images.map(img => (
                <Col xs="auto" key={img.filename}>
                    <AutoSizeImage image={img} path="80"/>
                </Col>
            ))}
        </Row>
    )
}
