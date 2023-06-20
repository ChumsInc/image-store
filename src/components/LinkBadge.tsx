import React from 'react';
import {Badge, BadgeProps} from "chums-components";


export interface LinkBadgeProps extends BadgeProps {
    href?: string,
}

const LinkBadge = ({href, ...badgeProps}: LinkBadgeProps) => {

    if (!href) {
        return (
            <Badge {...badgeProps} />
        )
    }
    return (
        <a href={href}>
            <Badge {...badgeProps} />
        </a>
    )
}

export default LinkBadge;
