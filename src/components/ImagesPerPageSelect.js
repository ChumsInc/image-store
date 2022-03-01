import React from 'react';
import {connect} from 'react-redux';
import {setImagesPerPage} from "../actions/settings";
import FormGroup from "../common-components/FormGroup";
import Select from "../common-components/Select";
import {IMAGES_PER_PAGE_OPTIONS} from "../constants/image";

const ImagesPerPageSelect = ({imagesPerPage, setImagesPerPage}) => {
    const changeHandler = ({value}) => setImagesPerPage(Number(value));
    return (
        <FormGroup label="Images per Page" inline>
            <Select field="imagesPerPage" value={imagesPerPage} onChange={changeHandler}>
                {IMAGES_PER_PAGE_OPTIONS.map(val => <option key={val} value={val}>{val}</option>)}
            </Select>
        </FormGroup>
    )
}

const mapStateToProps = ({settings}) => {
    const {imagesPerPage,} = settings;
    return {imagesPerPage};
};

const mapDispatchToProps = {setImagesPerPage};

export default connect(mapStateToProps, mapDispatchToProps)(ImagesPerPageSelect)
