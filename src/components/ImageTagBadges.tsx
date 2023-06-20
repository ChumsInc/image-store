import React from 'react';
import LinkBadge from "./LinkBadge";

const tagTypes = {
    inactive: 'danger',
}

export interface ImageTagBadgesProps {
    tags: string[],
    inactive: boolean,
}
const ImageTagBadges:React.FC<ImageTagBadgesProps> = ({tags, inactive}) => {
    const hasInactive = inactive || tags.filter(tag => tag.toLowerCase() === 'inactive').length > 0;
    return (
        <div className="tag-badges">
            {hasInactive && <LinkBadge color="danger">Inactive</LinkBadge>}
            {tags
                .filter(tag => tag.toLowerCase() !== 'inactive')
                .sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1)
                .map(tag => {
                    return (<LinkBadge color="secondary" key={tag}>{tag}</LinkBadge>)
                })}
        </div>
    );
}

export default ImageTagBadges;
