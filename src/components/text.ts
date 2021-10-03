import styled from 'styled-components';

export const H1 = styled.h1`
    color: ${ props => props.theme.colors.secondary};
    font-size: 20px;
    padding: 0px;
    margin: 0px;
`;

export const Sub = styled(H1).attrs({
    as: 'h2'
})`
    font-size: 18px;
`;

export const Text = styled.span`
    color: ${ props => props.theme.colors.secondary};
    font-size: 16px;
    padding: 0px;
    margin: 0px;
`
