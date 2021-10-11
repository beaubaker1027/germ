import React from 'react';
import styled from 'styled-components';

const Container = styled.footer.attrs({
    className: 'flex ph1 pv2 items-center justify-end'
})``;

const Link = styled.a.attrs({
    href: 'https://github.com/beaubaker1027/germ',
    className: 'pl1 no-underline'
})`
    color: ${props => props.theme.colors.secondary};
`;

function footer() {
    return (
        <Container>
            <Link>Github</Link>
        </Container>
    );
};

export default footer;