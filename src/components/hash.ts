import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Hash = styled(Link).attrs({
    className: 'dib pv1 bw1 ma1'
})`
    background-color: transparent;
    color: ${props => props.theme.colors.secondary };
    font-size: 12px;
    outline: none;
    opacity: 0.75;

    &:hover {
        opacity: 0.6;
    }
    &:active {
        opacity: 0.4;
    }
`;