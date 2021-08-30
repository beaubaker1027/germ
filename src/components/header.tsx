import React from 'react';
import styled from 'styled-components';
import { SmallLogo } from './';

const Container = styled.header.attrs({
    className: 'flex ph1 pv2 items-center'
})``;

const Title = styled.span.attrs({
    className: 'pl1'
})`
    color: #f2f2f2;
`;

function header() {
    return (
        <Container>
            <a href='/'>
                <SmallLogo/>
            </a>
            <Title>
                GERM
            </Title>
        </Container>
    );
};

export default header;