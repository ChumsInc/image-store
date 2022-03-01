import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {setFilterInactive, } from "../actions/settings";
import FormGroup from "../common-components/FormGroup";
import FormCheck from "../common-components/FormCheck";

const InactiveImageFilter = ({filterInactive = false, setFilterInactive}) => {
    return (
        <FormGroup>
            <FormCheck checked={!filterInactive} inline
                       onClick={() => setFilterInactive(!filterInactive)} label="Show Inactive Items"/>
        </FormGroup>
    );
};

const mapStateToProps = ({settings}) => {
    const {filterInactive} = settings;
    return {filterInactive};
};

const mapDispatchToProps = {setFilterInactive};

export default connect(mapStateToProps, mapDispatchToProps)(InactiveImageFilter)
