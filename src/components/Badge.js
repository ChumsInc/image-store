import React, {PureComponent} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Badge extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
        pill: PropTypes.bool,
        href: PropTypes.string,
        className: PropTypes.string,
    };

    static defaultProps = {
        type: 'info',
        pill: false,
        href: null,
        className: ''
    };

    render() {
        const {type, pill, href, className, children} = this.props;
        const _className = {
            badge: true,
            'badge-pill': pill,
            [`bg-${type}`]: !!type,
        };
        return !!href
            ? (<a className={classNames(_className, className)} href={href} target="_blank">{children}</a>)
            : (<span className={classNames(_className, className)} >{children}</span>)
    }
}
