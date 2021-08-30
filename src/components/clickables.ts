import styled from 'styled-components';
import { Link as L } from 'react-router-dom';

export const Link = styled(L)`
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;

    &:hover {
        opacity: 0.75;
    }
`;

interface Pill {
    active?: boolean;
}
export const Pill = styled.button.attrs({
    className: 'dib ph3 pv1 br-pill ba bw1 ma1'
})<Pill>`
    background-color: ${props => 
        props.active 
        ? props.theme.colors.primary 
        : props.theme.colors.secondary };
    outline: none;

    &:hover {
        opacity: 0.75;
    }
    &:active {
        opacity: 0.5;
    }
`;