import React from 'react';
import * as Recompose from 'recompose';
import styled from 'styled-components';
import { Plant } from '../lib/plant';
import { Hash, H1, Text, Column, Row } from './';

// CONSTANTS
// INTERFACES
interface Props extends React.PropsWithChildren<unknown> {
    plant?: Plant;
}

// ALIASES

// LOCAL COMPONENTS
const UnderlinedText = styled(Text)`
    border-bottom: solid 1px ${props => props.theme.colors.secondary};
`;

// DEFAULT PROPS

// COMPONENT
function Info({ plant }: Props) {
    return(
        <Column>
            <div>
                <H1>{plant?.name}</H1>
                <Column>
                    <UnderlinedText>Tags</UnderlinedText>
                    <Row>
                    {
                        plant?.tags?.map( tag => <Hash to={`/tags/${tag}`}>#{tag}</Hash>)
                    }
                    </Row>
                </Column>
            </div>
        </Column>
    )
}

export default Info;