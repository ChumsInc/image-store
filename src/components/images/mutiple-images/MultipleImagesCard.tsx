import React from 'react';
import TagMultipleImagesForm from "./TagMultipleImagesForm";
import AdditionalSKUMultipleImagesForm from "./AdditionalSKUMultipleImagesForm";
import MultipleImageActiveToggle from "./MultipleImageActiveToggle";
import MultipleImagesList from "./MultipleImagesList";
import PrimaryItemCodeForm from "./PrimaryItemCodeForm";
import {Card, CloseButton} from "react-bootstrap";
import {useAppDispatch} from "@/app/hooks";
import {clearAdditionalImages} from "@/ducks/images/currentImagesSlice";

const MultipleImagesCard = () => {
    const dispatch = useAppDispatch();

    const clearImagesHandler = () => {
        dispatch(clearAdditionalImages());
    }

    return (
        <Card>
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Multiple Images</h2>
                    <CloseButton type="button" onClick={clearImagesHandler}/>
                </div>
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
export default MultipleImagesCard;
