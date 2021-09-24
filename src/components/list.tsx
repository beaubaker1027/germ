import React from 'react';
import styled from 'styled-components';

// Interfaces
interface Props<I> extends React.PropsWithChildren<unknown> {
    listItem: ({ item }: { item: I }) => JSX.Element ;
    list: I[];
}

// Local Components
const ListBox = styled.div.attrs({
    className: 'flex flex-column ma1'
})``;

// Defaults

const List =  <I extends object>({ 
    listItem: Component, 
    list = [], 
    ...props 
}:Props<I>) =>
    <ListBox>
    {
        list.map((item, i: number) => <Component item={item} key={i}/>)
    }
    </ListBox>

export default List;