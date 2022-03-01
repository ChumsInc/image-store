import React from 'react';
import classNames from "classnames";

const MaterialIcon = ({size = 18, icon = null, className = '', children}) => {
    const iconClassName = `md-${size}`;
    return (
        <span className={classNames('material-icons', className, iconClassName)} >{icon || children}</span>
    )
};

export default MaterialIcon;
