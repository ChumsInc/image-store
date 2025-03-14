import React from 'react';
import {selectFilter} from "@/ducks/filters/filtersSlice";
import {invalidHashValue} from "@/ducks/filters";
import {Alert} from "react-bootstrap";
import {useAppSelector} from "@/app/hooks";

const InvalidURLAlert = () => {
    const filter = useAppSelector(selectFilter);

    if (filter.baseSKU !== invalidHashValue) {
        return null;
    }

    return (
        <Alert variant="warning">This appears to be an invalid link.</Alert>
    )
}

export default InvalidURLAlert;
