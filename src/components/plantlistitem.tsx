import React from 'react';
import styled from 'styled-components';
import * as A from 'fp-ts/Array';
import { Link, Column, Row, Hash } from './';
import { DBPlant } from '../lib/plant';

// Interfaces
interface Props extends React.PropsWithChildren<unknown> {
    item: DBPlant;
}

// Local Components
const ListItemBox = styled.div.attrs({
    className: 'pv1'
})``;

// Defaults

const PlantListItem = ({
    item
}: Props) => 
    <ListItemBox>
        <Column>
        <Link to={`/plants/${item.id}`}>{item.name}</Link>
        <Row>
            {
                A.map<string, JSX.Element>(
                    (tag) => <Hash to={`/tags/${tag}`}>#{tag}</Hash>
                )(item.tags)
            }
        </Row>
        </Column>
    </ListItemBox>
;

export default PlantListItem;