import React from 'react';
import {connect} from 'react-redux';
import {setDefaultImagePath} from "../actions/settings";
import FormGroup from "../common-components/FormGroup";
import Select from "../common-components/Select";
import {IMAGE_PATHS} from "../constants/image";


const ImageSizeSelect = ({defaultImagePath, setDefaultImagePath}) => {
    return (
        <FormGroup label="Default Image Size">
            <Select field="defaultImagePath" value={defaultImagePath}
                    onChange={({value}) => setDefaultImagePath(value)} >
                {IMAGE_PATHS.map(size => (<option key={size} value={size}>{size} x {size}</option>))}
            </Select>
        </FormGroup>
    )
};

const mapStateToProps = ({settings, images}) => {
    const {defaultImagePath} = settings;
    return {defaultImagePath};
};

const mapDispatchToProps = {setDefaultImagePath};

export default connect(mapStateToProps, mapDispatchToProps)(ImageSizeSelect)
