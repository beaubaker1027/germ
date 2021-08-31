import React from 'react';
import { compose, defaultProps } from 'recompose';
import styled from 'styled-components';
import { Input, Icon } from '.';
import FilterIcon from '../assets/filter.svg';

// Interfaces
interface Props extends React.PropsWithChildren<unknown> {
    placeholder?: string;
    callback: ( text: string ) => void; 
}
// Local Components
const SearchBox = styled.div.attrs({
    className: 'dib'
})`
    border-style: solid;
    border-color: ${props => props.theme.colors.primary};
    border-width: 0px 0px 1px 0px;
`;

// Defaults

const defaultPlaceholder = 'Search';

// Component
function SearchBar({ 
    placeholder = defaultPlaceholder,
    ...props 
}: Props ) {
    return (
        <SearchBox>
            <Input 
                placeholder={placeholder} 
                onChange={(e) => props.callback(e.target.value)}
            />
            <Icon icon={FilterIcon}/>
        </SearchBox>
    )
};


export default SearchBar;