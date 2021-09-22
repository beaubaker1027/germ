import React from 'react';
import * as Recompose from 'recompose';
import styled from 'styled-components';
import { Input, Icon } from '.';
import FilterIcon from '../assets/filter.svg';

// Interfaces
interface Props extends React.PropsWithChildren<unknown>, 
                        Omit<
                            React.InputHTMLAttributes<HTMLInputElement>, 
                            'className' | 'ref' | 'children' | 'as'
                        >{
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

const defaultPlaceholder = 'Search by Name or Tag';

// Component
function SearchBar(props:Props ) {
    return (
        <SearchBox>
            <Input {...props}/>
            <Icon icon={FilterIcon}/>
        </SearchBox>
    )
};


const program = Recompose.compose<Props, Props>(
    Recompose.defaultProps({
        placeholder: defaultPlaceholder
    })
);

export default program(SearchBar);