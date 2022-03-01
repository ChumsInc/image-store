import React from 'react';
import {useSelector} from "react-redux";
import {
    selectCanEdit,
    selectFilterBaseSKU,
    selectFilterItemCategory,
    selectFilterProductLine, selectFilterSearch,
    selectIsUser
} from "../selectors";

const LinkToView:React.FC = () => {
    const isUser = useSelector(selectIsUser);
    const pl = useSelector(selectFilterProductLine);
    const cat = useSelector(selectFilterItemCategory);
    const sku = useSelector(selectFilterBaseSKU);
    const search = useSelector(selectFilterSearch);

    if (!isUser) {
        return null;
    }
    const location = window.location;
    const params = new URLSearchParams();
    const url = new URL(window.location.href || '', 'https://intranet.chums.com');
    if (!!pl) {
        params.set('pl', pl);
    }
    if (!!cat) {
        params.set('cat', cat);
    }
    if (!!sku) {
        params.set('sku', sku);
    }
    if (!!search) {
        params.set('q', search);
    }
    url.search = params.toString();
    return (
        <a href={url.toString()} target="_blank">
            <span className="bi-share-fill me-1" />
            Link to this view
        </a>
    )
}

export default LinkToView;
