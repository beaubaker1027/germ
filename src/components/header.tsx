import React from 'react';
import * as Recompose from 'recompose';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SmallLogo } from './';

// CONSTANTS

// INTERFACES
interface Props extends React.PropsWithChildren<unknown>{
    title?: string;
}

// LOCAL COMPONENTS
const Container = styled.header.attrs({
    className: 'flex ph1 pv2 items-center'
})``;

const Title = styled.span.attrs({
    className: 'pl1'
})`
    font-family: Helvetica;
    color: #f2f2f2;
`;

// DEFAULT PROPS
const title = 'Germ';

// COMPONENT
function header(props: Props) {
    return (
        <Container>
            <Link to={'/plants'}>
                <SmallLogo/>
            </Link>
            <Title>
                {props.title}
            </Title>
        </Container>
    );
};

const program = Recompose.compose<Props, Props>(
    Recompose.defaultProps({
        title
    })
)

export default program(header);