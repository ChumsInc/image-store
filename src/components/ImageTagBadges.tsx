import React from 'react';
import LinkBadge from "./LinkBadge";
import styled from "@emotion/styled";

const tagTypes = {
    inactive: 'danger',
}

const BadgeContainer = styled('div')`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export interface ImageTagBadgesProps {
    tags: string[],
    inactive: boolean,
}
const ImageTagBadges:React.FC<ImageTagBadgesProps> = ({tags, inactive}) => {
    const hasInactive = inactive || tags.filter(tag => tag.toLowerCase() === 'inactive').length > 0;
    return (
        <BadgeContainer>
            {hasInactive && <LinkBadge bg="danger" className="m-1">Inactive</LinkBadge>}
            {tags
                .filter(tag => tag.toLowerCase() !== 'inactive')
                .sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)
                .map(tag => {
                    return (<LinkBadge bg="secondary" className="m-1" key={tag}>{tag}</LinkBadge>)
                })}
        </BadgeContainer>
    );
}

export default ImageTagBadges;
