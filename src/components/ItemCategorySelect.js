import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setItemCategory} from '../actions/settings';
import Select from "../common-components/Select";
import FormGroup from "../common-components/FormGroup";


function mapStateToProps({filters, settings}) {
    const {itemCategories} = filters.filtered;
    const {itemCategory} = settings;
    return {itemCategories, itemCategory};
}

const mapDispatchToProps = {
    setItemCategory,
};

const ItemCategorySelect = ({itemCategory = '', itemCategories = [], setItemCategory}) => {
    const changeHandler = ({value}) => setItemCategory(value);
    return (
        <FormGroup label="Category">
            <Select onChange={changeHandler} value={itemCategory}>
                <option value="">All</option>
                {itemCategories.map(cat => (
                    <option key={cat.Category2} value={cat.Category2}>{cat.description || cat.code || 'Unassigned'}</option>
                ))}
            </Select>
        </FormGroup>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemCategorySelect);
