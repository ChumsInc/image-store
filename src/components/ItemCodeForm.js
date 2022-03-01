import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormGroup from "../common-components/FormGroup";
import TextInput from "../common-components/TextInput";
import Badge from "./Badge";
import MaterialIcon from "../common-components/MaterialIcon";

export const ItemCodePreview = ({item_code, isPrimaryItem = false, readOnly, onClick}) => (
    <div className="is--image--item-form--preview">
        <div><small>
            {!!isPrimaryItem ? 'Primary ' : ''}
            {!item_code ? 'Add ' : ''}
            Item Code
        </small></div>
        <div>{item_code}</div>
        {!readOnly && (
            <div>
                <button type="button" className="btn btn-sm" onClick={onClick}>
                    <MaterialIcon size={12} icon={!!item_code ? 'edit' : 'add'}/>
                </button>
            </div>
        )}
    </div>
);

class ItemCodeForm extends Component {
    static propTypes = {
        id: PropTypes.number,
        filename: PropTypes.string,
        item_code: PropTypes.string,
        ItemCodeDesc: PropTypes.string,
        ProductType: PropTypes.string,
        InactiveItem: PropTypes.string,
        isPrimaryItem: PropTypes.bool,
        readOnly: PropTypes.bool,
        onSave: PropTypes.func.isRequired,
    };

    static defaultProps = {
        id: 0,
        filename: '',
        itemCode: '',
        ItemCodeDesc: '',
        ProductType: '',
        InactiveItem: '',
        readOnly: true,
    };

    state = {
        edit: false,
        itemCode: '',
    }

    constructor(props) {
        super(props);
        this.onEdit = this.onEdit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
    }


    componentDidMount() {
        this.setState({itemCode: this.props.itemCode});
    }

    componentDidUpdate(prevProps, prevState, ss) {
        if (prevProps.filename !== this.props.filename) {
            this.onCancel();
        }
    }

    onEdit() {
        if (this.props.readOnly) {
            return;
        }
        this.setState({edit: true, itemCode: this.props.item_code});
    }

    onCancel() {
        this.setState({edit: false, itemCode: this.props.item_code});
    }

    onSave(ev) {
        ev.preventDefault();
        const {id, filename, isPrimaryItem} = this.props;
        const {itemCode} = this.state;
        this.props.onSave({id, filename, isPrimaryItem, itemCode});
        this.setState({edit: false});
    }


    render() {
        const {item_code, ItemCodeDesc, InactiveItem, ProductType, filename, readOnly} = this.props;
        const {edit, itemCode} = this.state;
        if (!readOnly && !filename && !edit) {
            return (
                <ItemCodePreview {...this.props} onClick={this.onEdit}/>
            )
        }
        if (!edit || readOnly) {
            return (
                <ItemCodePreview {...this.props} onClick={this.onEdit}/>
            )
        }
        return (
            <form onSubmit={this.onSave}>
                <FormGroup label="Item Code" colWidth={8}>
                    <TextInput value={itemCode || ''}
                               onChange={({value}) => this.setState({itemCode: value.toUpperCase()})}/>
                </FormGroup>
                <FormGroup colWidth={8}>
                    <div className="btn-group btn-group-sm">
                        <button type="submit" className="btn btn-sm btn-primary">Save</button>
                        <button type="reset" className="btn btn-sm btn-secondary"
                                onClick={this.onCancel}>Cancel</button>
                        <button type="button" className="btn btn-sm btn-danger">Delete</button>
                    </div>
                </FormGroup>
                <h5 className="item-description">{ItemCodeDesc}</h5>
                {(ProductType === 'D' || InactiveItem === 'Y') && (
                    <Badge type="danger">Inactive</Badge>
                )}
            </form>
        );
    }
}

ItemCodeForm.propTypes = {};

export default ItemCodeForm;
