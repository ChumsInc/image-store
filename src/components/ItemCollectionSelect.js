import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setItemCollection} from '../actions/settings';
import Select from "../common-components/Select";
import FormGroup from "../common-components/FormGroup";


function mapStateToProps({filters, settings}) {
    const {itemCollections} = filters.filtered;
    const {itemCollection} = settings;
    return {itemCollections, itemCollection};
}

const mapDispatchToProps = {
    setItemCollection,
};

const ItemCollectionSelect = ({itemCollection = '', itemCollections = [], setItemCollection}) => {
    const changeHandler = ({value}) => setItemCollection(value);
    return (
        <FormGroup label="Category">
            <Select onChange={changeHandler} value={itemCollection}>
                <option value="">All</option>
                {itemCollections.map(cat => (
                    <option key={cat.Category3} value={cat.Category3}>{cat.Category3 || 'Unassigned'}</option>
                ))}
            </Select>
        </FormGroup>
    )
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ItemCollectionSelect);
