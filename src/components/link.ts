import styled from 'styled-components';
import { Link as L } from 'react-router-dom';

export const Link = styled(L)`
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;

    &:hover {
        opacity: 0.75;
    }
`;