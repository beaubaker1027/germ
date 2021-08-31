import React from 'react';
import styled from 'styled-components';
import { Link } from './';
import { Plant } from '../lib/plant';

// Interfaces
interface Props<I> extends React.PropsWithChildren<unknown> {
    item: I;
}

// Local Components
const ListItemBox = styled.div.attrs({
    className: 'pv1'
})``;

// Defaults

const PlantListItem = <I extends Plant>({
    item
}: Props<I>) => 
    <ListItemBox>
        <Link to={`/plants/${item.id}`}>{item.name}</Link>
    </ListItemBox>
;

export default PlantListItem;