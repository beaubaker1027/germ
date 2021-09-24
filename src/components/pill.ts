import styled from 'styled-components';

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