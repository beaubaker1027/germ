import { useState } from 'react';

export type Tag = string;
export type Tags = Tag[];

type ChangeState = (tag:Tag) => void;

function removeTag(tags: Tags, tag: Tag ): Tags{
    const index = tags.findIndex( t => t === tag );
    return ( index < 0 ? 
             tags :
             [ ...tags.slice(0, index), ...tags.slice(index + 1)] 
            );
};

function addTag(tags: Tags, tag: Tag): Tags{
    const index = tags.findIndex( t => t === tag );
    return ( index < 0 ? 
             [ ...tags, tag ] :
             tags
            );
}

export function useTags(currentTags: Tags = []):[Tags, ChangeState, ChangeState]{
    const [ tags, setTags ] = useState(currentTags);

    const addTerm:ChangeState = (tag) => {
        setTags(addTag(tags,tag));
    }

    const removeTerm:ChangeState = (tag) => {
        setTags(removeTag(tags,tag));
    }
    return [ 
        tags,
        addTerm,
        removeTerm
    ];
};