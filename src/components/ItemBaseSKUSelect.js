import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setBaseSKU} from '../actions/settings';
import Select from "../common-components/Select";
import FormGroup from "../common-components/FormGroup";


function mapStateToProps({filters, settings}) {
    const {itemBaseSKUs} = filters.filtered;
    const {itemBaseSKU} = settings;
    return {itemBaseSKUs, itemBaseSKU};
}

const mapDispatchToProps = {
    setBaseSKU,
};

const ItemBaseSKUSelect = ({itemBaseSKU = '', itemBaseSKUs = [], setBaseSKU}) => {
    const changeHandler = ({value}) => setBaseSKU(value);
    return (
        <FormGroup label="Base SKU">
            <Select onChange={changeHandler} value={itemBaseSKU}>
                <option value="">All</option>
                {itemBaseSKUs.map(cat => (
                    <option key={cat.Category4} value={cat.Category4}>{cat.Category4} - {cat.description || 'Unassigned'}</option>
                ))}
            </Select>
        </FormGroup>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemBaseSKUSelect);
