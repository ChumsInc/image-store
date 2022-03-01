import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setProductLine} from '../actions/settings';
import Select from "../common-components/Select";
import FormGroup from "../common-components/FormGroup";


function mapStateToProps({filters, settings}) {
    const {productLines} = filters.filtered;
    const {productLine} = settings;
    return {productLines, productLine};
}

const mapDispatchToProps = {
    setProductLine,
};

const ProductLineSelect = ({productLine = '', productLines = [], setProductLine}) => {
    const changeHandler = ({value}) => setProductLine(value);
    return (
        <FormGroup label="Product Line" className="mt-1">
            <Select onChange={changeHandler} value={productLine} >
                <option value="">All</option>
                {productLines.map(pl => (
                    <option key={pl.ProductLine} value={pl.ProductLine}>{pl.ProductLineDesc || pl.ProductLine}</option>
                ))}
            </Select>
        </FormGroup>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductLineSelect);
