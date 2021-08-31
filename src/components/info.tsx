import React from 'react';
import styled from 'styled-components';
import { Plant } from '../lib/plant';
import { Header } from './text';
import { Pill } from './clickables';
import { Column, Row } from './layout';

// CONSTANTS
// INTERFACES
interface Props extends React.PropsWithChildren<unknown> {
    plant?: Plant;
}

// ALIASES

// LOCAL COMPONENTS

// DEFAULT PROPS

// COMPONENT
function Info({ plant }: Props) {
    return(
        <Column>
            <Header>{plant?.name}</Header>
            <Row>
            {
                plant?.tags?.map( tag => <Pill>{tag}</Pill>)
            }
            </Row>
        </Column>
    )
}

export default Info;