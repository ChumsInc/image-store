import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilter} from "@/ducks/filters/filtersSlice";
import {invalidHashValue} from "@/ducks/filters";
import {Alert} from "react-bootstrap";
import {useAppDispatch} from "@/app/hooks";

const InvalidURLAlert = () => {
    const dispatch = useAppDispatch();
    const filter = useSelector(selectFilter);

    if (filter.baseSKU !== invalidHashValue) {
        return null;
    }

    return (
        <Alert variant="warning">This appears to be an invalid link.</Alert>
    )
}

export default InvalidURLAlert;
