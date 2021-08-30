import React from 'react';
import { compose, defaultProps } from 'recompose';
import styled from 'styled-components';
import { Input, Icon } from '.';
import FilterIcon from '../assets/filter.svg';

// Interfaces
interface Props extends React.PropsWithChildren<unknown> {
    C?: Components;
    placeholder?: string;
    callback: ( text: string ) => void; 
}

interface Components {
    SearchBox: typeof SearchBox;
    Input: typeof Input;
    Icon: typeof Icon;
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
const components = {
    SearchBox,
    Input,
    Icon
};

const defaultPlaceholder = 'Search';

// Component
const SearchBar = ({ 
    C = components,
    placeholder = defaultPlaceholder,
    ...props 
}: Props ) => (
    <C.SearchBox>
        <C.Input 
            placeholder={placeholder} 
            onChange={(e) => props.callback(e.target.value)}
        />
        <C.Icon icon={FilterIcon}/>
    </C.SearchBox>
);


export default SearchBar;