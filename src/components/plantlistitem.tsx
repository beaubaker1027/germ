import React from 'react';
import styled from 'styled-components';
import { Link } from './';

// Interfaces
interface Props<I> extends React.PropsWithChildren<unknown> {
    item: I;
}

export interface Item {
    readonly id: number;
    readonly name: string;
}

// Local Components
const ListItemBox = styled.div.attrs({
    className: 'pv1'
})``;

// Defaults

const PlantListItem = <I extends Item>({
    item
}: Props<I>) => 
    <ListItemBox>
        <Link to={`/plants/${item.id}`}>{item.name}</Link>
    </ListItemBox>
;

export default PlantListItem;