import React from 'react';
import {Badge, BadgeProps} from "react-bootstrap";


export interface LinkBadgeProps extends BadgeProps {
    href?: string,
}

const LinkBadge = ({href, ...badgeProps}: LinkBadgeProps) => {
    if (href) {
        return (
            <Badge as="a" href={href} {...badgeProps} />
        )
    }
    return (
        <Badge as="span" {...badgeProps} />
    )
}

export default LinkBadge;
