import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {applyItemCode} from '../actions/images'
import FormGroupTextInput from "../common-components/FormGroupTextInput";
import FormGroup from "../common-components/FormGroup";
import FormCheck from "../common-components/FormCheck";
import ProgressBar from "../common-components/ProgressBar";

const mapStateToProps = ({images}) => {
    return {
        loading: images.loading,
        saving: images.selectedForAction.saving,
    };
};

const mapDispatchToProps = {
    applyItemCode,
};


class SelectedImages_ApplySKU extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        saving: PropTypes.bool,
        applyItemCode: PropTypes.func.isRequired,
    };

    static defaultProps = {
        loading: false,
        saving: false,
    };

    state = {
        itemCode: '',
        primary: false,
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange({value}) {
        this.setState({itemCode: value.toUpperCase()});
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.props.applyItemCode(this.state.itemCode, this.state.primary);
    }

    render() {
        const {loading, saving} = this.props;
        const {itemCode, primary} = this.state;
        return (
            <form onSubmit={this.onSubmit} className="mb-2">
                <FormGroupTextInput colWidth={8} label="Apply SKU" formGroupClassName="mt-3"
                                    required
                                    value={itemCode}
                                    disabled={loading || saving}
                                    onChange={this.onChange}/>
                <FormGroup colWidth={8} label="Primary?" helpText="Warning: Will overwrite existing sku if selected">
                    <FormCheck checked={primary} onClick={() => this.setState({primary: !primary})} inline={true}>
                        Set as Primary Item Code?
                    </FormCheck>
                </FormGroup>
                <FormGroup>
                    <button type="submit" className="btn btn-sm btn-primary" disabled={loading || saving}>Save</button>
                </FormGroup>
                {(loading || saving) && (
                    <ProgressBar striped={true}/>
                )}
            </form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedImages_ApplySKU)
