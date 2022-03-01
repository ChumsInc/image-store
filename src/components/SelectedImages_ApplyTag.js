import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {tagImages} from '../actions/images'
import FormGroupTextInput from "../common-components/FormGroupTextInput";

const mapStateToProps = ({images}) => {
    return {
        loading: images.loading,
    };
};

const mapDispatchToProps = {
    tagImages,
};


class SelectedImages_ApplyTag extends Component {
    static propTypes = {
        loading: PropTypes.bool,
    };

    static defaultProps = {
        loading: false
    };

    state = {
        tag: '',
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange({value}) {
        this.setState({tag: value});
    }

    onSubmit(ev) {
        ev.preventDefault();
        this.props.tagImages(this.state.tag);
    }

    render() {
        const {tag} = this.state;
        const {loading} = this.props;
        return (
            <form onSubmit={this.onSubmit} className="mb-2">
                <FormGroupTextInput colWidth={8} label="Apply Tag" formGroupClassName="mt-3"
                                    required
                                    value={tag}
                                    onChange={this.onChange}/>
                <button type="submit" className="btn btn-sm btn-primary" disabled={loading}>Tag Images</button>
            </form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedImages_ApplyTag)
