import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {setFilterUnassigned} from "../actions/settings";
import FormGroup from "../common-components/FormGroup";
import FormCheck from "../common-components/FormCheck";

const UnassignedImageFilter = ({filterUnassigned = false, setFilterUnassigned}) => {
    return (
        <FormGroup>
            <FormCheck checked={filterUnassigned} inline
                       onClick={() => setFilterUnassigned(!filterUnassigned)} label="Show Only Unassigned Items"/>
        </FormGroup>
    );
};

const mapStateToProps = ({settings}) => {
    const {filterUnassigned} = settings;
    return {filterUnassigned};
};

const mapDispatchToProps = {setFilterUnassigned};

export default connect(mapStateToProps, mapDispatchToProps)(UnassignedImageFilter)
