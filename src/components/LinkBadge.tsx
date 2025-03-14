import React, {AnchorHTMLAttributes} from 'react';
import {Badge, BadgeProps} from "react-bootstrap";


export interface LinkBadgeProps extends BadgeProps {
    href?: string;
    linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
}

const LinkBadge = ({href, linkProps, ...badgeProps}: LinkBadgeProps) => {
    if (href) {
        return (
            <Badge as="a" href={href} {...linkProps} {...badgeProps} />
        )
    }
    return (
        <Badge as="span" {...badgeProps} />
    )
}

export default LinkBadge;
