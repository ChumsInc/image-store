import React from 'react';
import TagMultipleImagesForm from "./TagMultipleImagesForm";
import AdditionalSKUMultipleImagesForm from "./AdditionalSKUMultipleImagesForm";
import MultipleImageActiveToggle from "./MultipleImageActiveToggle";
import MultipleImagesList from "./MultipleImagesList";
import PrimaryItemCodeForm from "./PrimaryItemCodeForm";
import {Card} from "react-bootstrap";

const MultipleSelectedImages = () => {
    return (
        <Card>
            <Card.Header>
                <h3>Multiple Images</h3>
                <MultipleImagesList/>
            </Card.Header>
            <Card.Body>
                <PrimaryItemCodeForm/>
            </Card.Body>
            <Card.Body>
                <AdditionalSKUMultipleImagesForm/>
            </Card.Body>
            <Card.Body>
                <MultipleImageActiveToggle/>
            </Card.Body>
            <Card.Body>
                <TagMultipleImagesForm/>
            </Card.Body>
        </Card>
    )
}
export default MultipleSelectedImages;
