import {type FormEvent, useEffect, useId, useState} from 'react';
import {useAppDispatch} from "@/app/hooks";
import {useSelector} from "react-redux";
import {selectCurrentImage} from "@/ducks/images/currentImagesSlice";
import {saveImage} from "@/ducks/images/actions";
import {selectCanEdit} from "@/ducks/userProfile";
import PreferredImageButton from "./PreferredImageButton";
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";

const SelectedItemForm = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCurrentImage);
    const [itemCode, setItemCode] = useState(current?.ItemCode ?? '');
    const canEdit = useSelector(selectCanEdit);
    const id = useId();

    useEffect(() => {
        setItemCode(current?.ItemCode ?? '');
    }, [current]);

    const primaryItemSubmitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!current || !canEdit) {
            return;
        }
        dispatch(saveImage({filename: current.filename, item_code: itemCode}));
    }


    if (!current) {
        return null;
    }

    if (!canEdit) {
        return (
            <h4>Item: {current.ItemCode}</h4>
        )
    }

    return (
        <Row className="row g-3">
            <Col xs>
                <InputGroup as="form" size="sm" className="mb-3" onSubmit={primaryItemSubmitHandler}>
                    <InputGroup.Text as="label" htmlFor={id} aria-label="Primary Item Code">
                        <span className="bi-key-fill" aria-hidden/>
                    </InputGroup.Text>
                    <FormControl type="text" id={id} size="sm" readOnly={!canEdit}
                           value={itemCode} onChange={(ev) => setItemCode(ev.target.value)}/>
                    <Button type="submit" size="sm" variant="primary">Save</Button>
                </InputGroup>
            </Col>
            <Col xs="auto">
                <PreferredImageButton/>
            </Col>
        </Row>
    )
}

export default SelectedItemForm;
