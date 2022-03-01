import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setFilter} from "../actions/images";
import FormGroupTextInput from "../common-components/FormGroupTextInput";


// const ImageSearch = ({filter, setFilter}) => {
//     let timer = null;
//     const onChange = ({value}) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => setFilter(value), 350);
//     }
//     return (
//         <FormGroupTextInput label="Search" value={filter} onChange={onChange} />
//     )
// };

class ImageSearch extends Component {
    timer = null;
    state = {
        filter: '',
        invalid: false,
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    componentDidMount() {
        this.setState({filter: this.props.filter, invalid: false});
    }

    componentDidUpdate(prevProps, prevState) {
    const {filter} = this.props;
        if (filter !== prevProps.filter && filter !== this.state.filter) {
            this.setState({filter, invalid: false})
        }
    }

    onChange({value}) {
        clearTimeout(this.timer);
        this.setState({filter: value, invalid: false}, () => {
            const {filter} = this.state;
            try {
                const r = new RegExp(filter);
            } catch(err) {
                this.setState({invalid: true});
                return;
            }
            this.timer = setTimeout(() => this.props.setFilter(filter), 350);
        });
    }
    render() {
        const {filter, invalid} = this.state;
        return (
            <FormGroupTextInput label="Search" value={filter} onChange={this.onChange} type="search"
                                helpText={invalid ? 'Your search is invalid' : ''} />
        )
    }

}

const mapStateToProps = ({settings}) => {
    const {filter} = settings;
    return {filter};
};

const mapDispatchToProps = {setFilter};

export default connect(mapStateToProps, mapDispatchToProps)(ImageSearch)
