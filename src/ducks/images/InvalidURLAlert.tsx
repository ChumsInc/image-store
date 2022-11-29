import React from 'react';
import {useSelector} from "react-redux";
import {selectFilter} from "../filters/selectors";
import {invalidHashValue} from "../filters";
import {Alert} from "chums-components";

const InvalidURLAlert = () => {
    const filter = useSelector(selectFilter);
    if (filter.baseSKU !== invalidHashValue) {
        return null;
    }
    return (
        <Alert color="warning">This appears to be an invalid link.</Alert>
    )
}

export default InvalidURLAlert;
