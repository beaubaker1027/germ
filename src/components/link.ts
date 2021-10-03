import styled from 'styled-components';
import { Link as L } from 'react-router-dom';

export const Link = styled(L)`
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;

    &:hover {
        opacity: 0.75;
    }

    &:active {
        opacity: .5;
    }
`;

export const ActionLink = styled(Link).attrs({
    className: 'flex justify-center items-center pa1 ph2 br4'
})`
    border: 2px solid ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.secondary};
    font-weight: bold;
`;