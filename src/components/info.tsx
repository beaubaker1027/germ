import React from 'react';
import * as Recompose from 'recompose';
import styled from 'styled-components';
import { Plant } from '../lib/plant';
import { Pill, H1, Column, Row } from './';

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
            <div>
            <H1>{plant?.name}</H1>

            <Row>
            {
                plant?.tags?.map( tag => <Pill>{tag}</Pill>)
            }
            </Row>
            </div>
        </Column>
    )
}

export default Info;