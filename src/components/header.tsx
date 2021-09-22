import React from 'react';
import * as Recompose from 'recompose';
import styled from 'styled-components';
import { SmallLogo } from './';

interface Props extends React.PropsWithChildren<unknown>{
    C: Components;
}

interface Components {
    Container: typeof Container;
    SmallLogo: typeof SmallLogo;
    Title: typeof Title;
}
const Container = styled.header.attrs({
    className: 'flex ph1 pv2 items-center'
})``;

const Title = styled.span.attrs({
    className: 'pl1'
})`
    color: #f2f2f2;
`;

const components: Components = {
    Container,
    SmallLogo,
    Title
};

function header(props: Props) {
    return (
        <props.C.Container>
            <a href='/'>
                <props.C.SmallLogo/>
            </a>
            <props.C.Title>
                GERM
            </props.C.Title>
        </props.C.Container>
    );
};

const program = Recompose.compose<Props, unknown>(
    Recompose.withProps({
        C: components
    })
)

export default program(header);